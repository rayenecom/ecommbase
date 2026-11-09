/* ==========================================================
   BASE — service de paiement Stripe (Cloudflare Worker)
   Le site est statique : ce petit service crée la session de paiement
   avec la clé secrète Stripe, qui ne doit jamais être dans le site.

   Routes :
     POST /checkout            le site envoie le panier -> renvoie le clientSecret du formulaire Stripe intégré
     GET  /retour              Stripe renvoie le client ici après le paiement -> la-base.shop/#/merci?paye=1
     GET  /feed/snapchat.csv   catalogue produits pour les pubs Snapchat (relu sur le site, toujours à jour)

   Variables (Cloudflare > Worker > Settings > Variables and Secrets) :
     SITE_ORIGIN         https://la-base.shop
     STRIPE_SECRET_KEY   (secret) clé secrète Stripe : sk_live_… (ou sk_test_… pour essayer)
     SNAP_CAPI_TOKEN     (secret, facultatif) jeton « Conversions API » de Snapchat : chaque achat payé est
                         envoyé à Snapchat côté serveur (seulement si le client a accepté les cookies publicitaires).
                         L'identifiant du Pixel est lu dans assets/js/config.js (snap.pixelId).
   Les prix sont relus sur le site (assets/js/products.js) : le client ne peut pas les modifier.
   ========================================================== */

const STRIPE = "https://api.stripe.com/v1";
// Version de l'API Stripe figée : les changements de Stripe ne cassent pas le paiement (formulaire intégré « embedded »).
const STRIPE_VERSION = "2025-03-31.basil";
const COUNTRIES = { France: "FR", Belgique: "BE", Suisse: "CH", Luxembourg: "LU" };

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const site = (env.SITE_ORIGIN || "https://la-base.shop").replace(/\/$/, "");
    const origin = req.headers.get("Origin") || "";
    const allowed = [site, ...String(env.EXTRA_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean)];
    const cors = { "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : site, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" };
    try {
      if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
      if (url.pathname === "/checkout" && req.method === "POST") return json(await checkout(req, env, url, site), 200, cors);
      if (url.pathname === "/retour") return Response.redirect(await back(req, env, url, site, ctx), 303);
      if (url.pathname === "/feed/snapchat.csv" && req.method === "GET") return await feed(site);
      return new Response("BASE · paiement", { status: 200 });
    } catch (e) {
      if (!e.publicMessage) console.log("Erreur paiement", e && e.message);
      return json({ error: e.publicMessage || "Paiement momentanément indisponible." }, e.status || 500, cors);
    }
  }
};

/* ---------- Création de la session de paiement ---------- */
async function checkout(req, env, url, site) {
  if (!env.STRIPE_SECRET_KEY) fail("Paiement non configuré.", 503);
  const body = await req.json().catch(() => fail("Requête invalide.", 400));
  const ref = cleanRef(body.ref);
  if (!ref) fail("Référence de commande invalide.", 400);
  const c = body.customer || {};
  const need = ["firstname", "lastname", "email", "address", "zip", "city"];
  if (need.some((k) => !String(c[k] || "").trim())) fail("Informations client incomplètes.", 400);
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 20) fail("Panier vide.", 400);

  let { products, shipping } = await catalogue(site);
  // produit tout juste ajouté au site : on relit le catalogue à jour avant de refuser
  if (body.items.some((it) => !products.has(String(it.id)))) ({ products, shipping } = await catalogue(site, true));
  const lines = body.items.map((it) => {
    const p = products.get(String(it.id));
    const qty = Math.trunc(Number(it.qty));
    if (!p || p.soldOut) fail("Un article de ton panier n'est plus disponible.", 409);
    if (!(qty >= 1 && qty <= 10)) fail("Quantité invalide.", 400);
    const size = clip(it.size, 8);
    return { id: String(it.id), name: clip(p.name, 200), desc: clip(`${p.color}${size ? " · Taille " + size : ""}`, 200), qty, cents: cents(p.price), image: /^https?:/.test(p.image) ? p.image : p.image ? `${site}/${p.image}` : "", size };
  });
  const subtotal = lines.reduce((n, l) => n + l.cents * l.qty, 0);
  const ship = shipping.freeFrom && subtotal >= cents(shipping.freeFrom) ? 0 : cents(shipping.price);
  const self = (env.PUBLIC_URL || url.origin).replace(/\/$/, "");
  const name = clip(`${c.firstname} ${c.lastname}`, 100);
  const summary = clip(lines.map((l) => `${l.qty}x ${l.name} (${l.desc})`).join(" | "), 500);
  const meta = {
    commande: ref, client: name, telephone: clip(c.phone, 40), email: clip(c.email, 200),
    adresse: clip(`${c.address}, ${c.zip} ${c.city}, ${c.country || "France"}`, 500), articles: summary, note: clip(c.notes, 500)
  };

  const f = [
    ["ui_mode", "embedded"], ["mode", "payment"], ["locale", "fr"],
    ["adaptive_pricing[enabled]", "false"],   // prix toujours en euros, comme sur le site
    ["return_url", `${self}/retour?session_id={CHECKOUT_SESSION_ID}`],
    ["client_reference_id", ref], ["customer_email", clip(c.email, 200)],
    ["payment_intent_data[description]", `Commande ${ref}`],
    ["payment_intent_data[receipt_email]", clip(c.email, 200)],
    ["payment_intent_data[shipping][name]", name],
    ["payment_intent_data[shipping][phone]", clip(c.phone, 40)],
    ["payment_intent_data[shipping][address][line1]", clip(c.address, 200)],
    ["payment_intent_data[shipping][address][postal_code]", clip(c.zip, 10)],
    ["payment_intent_data[shipping][address][city]", clip(c.city, 100)],
    ["payment_intent_data[shipping][address][country]", COUNTRIES[c.country] || "FR"],
    ["shipping_options[0][shipping_rate_data][type]", "fixed_amount"],
    ["shipping_options[0][shipping_rate_data][display_name]", ship ? "Livraison standard" : "Livraison offerte"],
    ["shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(ship)],
    ["shipping_options[0][shipping_rate_data][fixed_amount][currency]", "eur"],
    ["shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]", "business_day"],
    ["shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]", String(shipping.days[0])],
    ["shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]", "business_day"],
    ["shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]", String(shipping.days[1])]
  ];
  // Provenance de la commande (liens utm_… des pubs) et données de mesure Snapchat si le client a accepté les cookies pub
  const t = body.track && typeof body.track === "object" ? body.track : {};
  const utm = t.utm && typeof t.utm === "object" ? t.utm : {};
  meta.source = clip(["source", "medium", "campaign", "content"].map((k) => clip(utm[k], 80)).filter(Boolean).join(" / "), 400);
  const snapOk = t.consent === true;
  const track = {
    produits: clip(lines.map((l) => l.id).join(","), 500), qte: String(lines.reduce((n, l) => n + l.qty, 0)),
    snap: snapOk ? "1" : "", sccid: snapOk ? clip(t.sccid, 200).replace(/[^\w.:-]/g, "") : "", scid: snapOk ? clip(t.scid, 200).replace(/[^\w.:-]/g, "") : ""
  };
  for (const [k, v] of Object.entries(meta)) if (v) f.push([`metadata[${k}]`, v], [`payment_intent_data[metadata][${k}]`, v]);
  for (const [k, v] of Object.entries(track)) if (v) f.push([`metadata[${k}]`, v]);
  lines.forEach((l, i) => {
    const p = `line_items[${i}]`;
    f.push([`${p}[quantity]`, String(l.qty)], [`${p}[price_data][currency]`, "eur"], [`${p}[price_data][unit_amount]`, String(l.cents)],
      [`${p}[price_data][product_data][name]`, l.name], [`${p}[price_data][product_data][description]`, l.desc]);
    if (l.image) f.push([`${p}[price_data][product_data][images][0]`, l.image]);
  });

  const session = await stripe(env, "POST", "/checkout/sessions", f, ref);
  return { clientSecret: session.client_secret };
}

/* ---------- Retour client après paiement ---------- */
async function back(req, env, url, site, ctx) {
  const id = String(url.searchParams.get("session_id") || "");
  if (!/^cs_[A-Za-z0-9_]+$/.test(id) || !env.STRIPE_SECRET_KEY) return `${site}/#/commande?annule=1`;
  const s = await stripe(env, "GET", `/checkout/sessions/${id}`).catch(() => null);
  if (s && s.status === "complete") {
    // achat envoyé à Snapchat en arrière-plan : la redirection du client n'attend pas
    if ((s.metadata || {}).snap === "1" && env.SNAP_CAPI_TOKEN) {
      const job = snapPurchase(req, env, site, s).catch((e) => console.log("Snap CAPI", e && e.message));
      if (ctx && ctx.waitUntil) ctx.waitUntil(job); else await job;
    }
    return `${site}/#/merci?paye=1&ref=${encodeURIComponent(cleanRef(s.client_reference_id))}`;
  }
  return `${site}/#/commande?annule=1`;
}

/* ---------- Snapchat : achat envoyé côté serveur (Conversions API) ----------
   Même référence (event_id) que l'événement PURCHASE du Pixel sur le site : Snapchat ne le compte qu'une fois.
   Données personnelles hachées (SHA-256), comme l'exige Snapchat. */
async function snapPurchase(req, env, site, s) {
  const pixel = String(env.SNAP_PIXEL_ID || (await catalogue(site)).pixel || "").trim();
  if (!pixel) return;
  const m = s.metadata || {}, cd = s.customer_details || {};
  const ref = cleanRef(s.client_reference_id);
  const low = (v) => String(v || "").trim().toLowerCase();
  const plain = (v) => low(v).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
  const H = async (v) => (v ? [await sha(v)] : undefined);
  const names = String(cd.name || m.client || "").trim().split(/\s+/);
  let ph = String(cd.phone || m.telephone || "").replace(/\D/g, "");
  if (ph.startsWith("00")) ph = ph.slice(2); else if (/^0\d{9}$/.test(ph)) ph = "33" + ph.slice(1);
  const addr = String(m.adresse || "").match(/,\s*(\d{4,5})\s+([^,]+),\s*([^,]+)$/) || [];
  const country = { france: "fr", belgique: "be", suisse: "ch", luxembourg: "lu" }[low(addr[3])] || "fr";
  const user = {
    em: await H(low(cd.email || m.email)), ph: await H(ph.length >= 8 ? ph : ""),
    fn: await H(plain(names[0])), ln: await H(plain(names.slice(1).join(""))),
    ct: await H(plain(addr[2])), zp: await H(low(addr[1]).replace(/[\s-]/g, "")), country: await H(country),
    client_ip_address: req.headers.get("CF-Connecting-IP") || undefined,
    client_user_agent: req.headers.get("User-Agent") || undefined,
    sc_click_id: m.sccid || undefined, sc_cookie1: m.scid || undefined
  };
  const ids = String(m.produits || "").split(",").filter(Boolean);
  const body = { data: [{
    event_name: "PURCHASE", action_source: "WEB", event_time: Date.now(), event_id: ref,
    event_source_url: `${site}/#/merci`,
    user_data: JSON.parse(JSON.stringify(user)),
    custom_data: { currency: "EUR", value: (s.amount_total || 0) / 100, order_id: ref, content_ids: ids, num_items: String(m.qte || ids.length || 1) }
  }] };
  const r = await fetch(`https://tr.snapchat.com/v3/${encodeURIComponent(pixel)}/events?access_token=${encodeURIComponent(env.SNAP_CAPI_TOKEN)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
  });
  if (!r.ok) console.log("Snap CAPI", r.status, (await r.text()).slice(0, 300));
}

/* ---------- Snapchat : catalogue produits (pubs dynamiques) ----------
   À coller dans Snapchat Ads Manager > Catalogues > Nouveau flux, avec mise à jour automatique.
   Prix actuel seulement (pas de prix barré : une réduction affichée en pub doit respecter les règles sur les prix de référence). */
let feedCache = null;
async function feed(site) {
  if (!feedCache || Date.now() - feedCache.at > 10 * 60 * 1000) {
    const v = Math.floor(Date.now() / 600000);
    const [pjs, phjs, cjs] = await Promise.all(["products", "photos", "config"].map((n) => fetch(`${site}/assets/js/${n}.js?v=${v}`, { cf: { cacheTtl: 300 } }).then((r) => {
      if (!r.ok && n === "products") fail("Catalogue indisponible.", 503);
      return r.ok ? r.text() : "";
    })));
    const noComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "");
    const brands = new Map([...pjs.matchAll(/^\s+(\w+):\s+\{\s*name: "([^"]+)"/gm)].map((m) => [m[1], m[2]]));
    const photos = new Map();
    for (const m of noComments(phjs).matchAll(/"([^"]+)":\s*\[([^\]]*)\]/g)) {
      const list = [...m[2].matchAll(/"([^"]+\.(?:jpe?g|png|webp))"/g)].map((x) => (/^https?:/.test(x[1]) ? x[1] : `${site}/${x[1]}`));
      if (list.length) photos.set(m[1], list);
    }
    const days = (cjs.match(/\bdeliveryDays: \[(\d+),\s*(\d+)\]/) || []).slice(1);
    const ret = (cjs.match(/\breturnDays: (\d+)/) || [])[1] || "14";
    const extra = ` Authentique, neuf. Livraison en ${days[0] || 3} à ${days[1] || 6} jours ouvrés, retours sous ${ret} jours, paiement sécurisé.`;
    const GPC = { chaussures: "187", ensembles: "1604", doudounes: "5598", casquettes: "173", bonnets: "173", chaussettes: "209", calecons: "213" };
    const SEX = { homme: "male", femme: "female", unisexe: "unisex" };
    const cols = ["id", "title", "description", "link", "image_link", "additional_image_link", "availability", "price", "brand", "condition", "item_group_id", "google_product_category", "product_type", "gender", "age_group", "color"];
    const rows = [cols];
    for (const m of noComments(pjs).matchAll(/\{\s*id: "([^"]+)",[\s\S]*?\n\s{2}\}/g)) {
      const b = m[0], get = (k) => (b.match(new RegExp(`\\b${k}: "([^"]*)"`)) || [])[1] || "";
      const price = Number((b.match(/\bprice: ([\d.]+)/) || [])[1]);
      const imgs = photos.get(m[1]) || [];
      if (!price || !imgs.length) continue;
      const cat = get("category"), type = get("type"), brand = brands.get(get("brand")) || get("brand");
      rows.push([
        m[1], clip(`${get("name")} – ${get("color")}`, 150), clip(get("description") + extra, 4900),
        `${site}/?utm_source=snapchat&utm_medium=catalogue#/produit/${encodeURIComponent(m[1])}`,
        imgs[0], imgs.slice(1, 6).join(","), /\bsoldOut: true\b/.test(b) ? "out of stock" : "in stock",
        `${price.toFixed(2)} EUR`, brand, "new", get("group") || m[1], GPC[type] || GPC[cat] || "166",
        [cat, type, brand].filter(Boolean).map((x) => x[0].toUpperCase() + x.slice(1)).join(" > "), SEX[get("gender")] || "unisex", "adult", get("color")
      ]);
    }
    const cell = (x) => (/[",\n]/.test(x) ? `"${String(x).replace(/"/g, '""')}"` : String(x));
    feedCache = { at: Date.now(), body: rows.map((r) => r.map(cell).join(",")).join("\n") + "\n", n: rows.length - 1 };
  }
  return new Response(feedCache.body, { headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "public, max-age=600", "X-Produits": String(feedCache.n) } });
}

async function stripe(env, method, path, fields, idem) {
  const r = await fetch(STRIPE + path, {
    method,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_VERSION,
      ...(idem ? { "Idempotency-Key": `${idem}-${await hash(fields)}` } : {})
    },
    body: fields ? new URLSearchParams(fields).toString() : undefined
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.log("Stripe", r.status, data.error && data.error.message);
    fail("Paiement momentanément indisponible. Réessaie dans quelques instants.", 502);
  }
  return data;
}

/* ---------- Catalogue (prix relus sur le site) ---------- */
let cache = null;
async function catalogue(site, fresh = false) {
  // catalogue gardé 1 minute au plus : un changement de prix sur le site est vite pris en compte
  if (!fresh && cache && Date.now() - cache.at < 60 * 1000) return cache.data;
  const v = fresh ? Date.now() : Math.floor(Date.now() / 60000);
  const [pjs, cjs, phjs] = await Promise.all(["products", "config", "photos"].map((n) => fetch(`${site}/assets/js/${n}.js?v=${v}`, { cf: { cacheTtl: 60 } }).then((r) => {
    if (!r.ok && n !== "photos") fail("Catalogue indisponible.", 503);
    return r.ok ? r.text() : "";
  })));
  const photos = new Map([...phjs.matchAll(/"([^"]+)": \[\s*"([^"]+\.(?:jpe?g|png|webp))"/g)].map((m) => [m[1], m[2]]));
  const products = new Map();
  for (const m of pjs.matchAll(/\{\s*id: "([^"]+)",[\s\S]*?\n\s{2}\}/g)) {
    const block = m[0];
    const price = block.match(/\bprice: ([\d.]+)/);
    if (!price) continue;
    products.set(m[1], {
      price: Number(price[1]),
      name: (block.match(/\bname: "([^"]*)"/) || [])[1] || m[1],
      color: (block.match(/\bcolor: "([^"]*)"/) || [])[1] || "",
      image: photos.get(m[1]) || "",
      soldOut: /\bsoldOut: true\b/.test(block)
    });
  }
  const num = (k, d) => Number((cjs.match(new RegExp(`\\b${k}: ([\\d.]+)`)) || [])[1] ?? d);
  const days = (cjs.match(/\bdeliveryDays: \[(\d+),\s*(\d+)\]/) || []).slice(1).map(Number);
  const pixel = (cjs.match(/\bpixelId: "([^"]*)"/) || [])[1] || "";
  const data = { products, pixel, shipping: { price: num("shippingPrice", 7.9), freeFrom: num("freeShippingFrom", 0), days: days.length === 2 ? days : [3, 6] } };
  if (!products.size) fail("Catalogue indisponible.", 503);
  cache = { at: Date.now(), data };
  return data;
}

async function hash(fields) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(fields)));
  return [...new Uint8Array(d)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function sha(v) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function cleanRef(r) { const s = String(r || "").toUpperCase(); return /^BASE-[A-Z0-9]{4,12}$/.test(s) ? s : ""; }
function clip(v, n) { return String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, n); }
function cents(n) { return Math.round(Number(n) * 100); }
function json(o, status, headers) { return new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", ...headers } }); }
function fail(msg, status) { const e = new Error(msg); e.publicMessage = msg; e.status = status; throw e; }
