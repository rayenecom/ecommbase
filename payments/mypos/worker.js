/* ==========================================================
   BASE — service de paiement myPOS (Cloudflare Worker)
   Le site est statique : ce petit service signe les paiements
   avec la clé privée myPOS, qui ne doit jamais être dans le site.

   Routes :
     POST /checkout  le site envoie le panier -> renvoie le formulaire signé
     POST /notify    myPOS confirme un paiement (IPCPurchaseNotify)
     ANY  /ok        retour client après paiement   -> la-base.shop/#/merci?paye=1
     ANY  /cancel    retour client après annulation -> la-base.shop/#/commande

   Variables (Cloudflare > Worker > Settings > Variables) :
     SITE_ORIGIN         https://la-base.shop
     MYPOS_MODE          "test" ou "live"
     MYPOS_CONFIG_PACK   (secret) le « Configuration pack » de ta boutique en ligne myPOS
   Les prix sont relus sur le site (assets/js/products.js) : le client ne peut pas les modifier.
   ========================================================== */

const ENDPOINTS = { test: "https://www.mypos.com/vmp/checkout-test", live: "https://www.mypos.com/vmp/checkout" };

// Identifiants de test publics de la documentation myPOS (MYPOS_MODE=test sans configuration pack)
const TEST_PACK = {
  sid: "000000000000010",
  cn: "61938166610",
  idx: 1,
  pk: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCf0TdcTuphb7X+Zwekt1XKEWZDczSGecfo6vQfqvraf5VPzcnJ
2Mc5J72HBm0u98EJHan+nle2WOZMVGItTa/2k1FRWwbt7iQ5dzDh5PEeZASg2UWe
hoR8L8MpNBqH6h7ZITwVTfRS4LsBvlEfT7Pzhm5YJKfM+CdzDM+L9WVEGwIDAQAB
AoGAYfKxwUtEbq8ulVrD3nnWhF+hk1k6KejdUq0dLYN29w8WjbCMKb9IaokmqWiQ
5iZGErYxh7G4BDP8AW/+M9HXM4oqm5SEkaxhbTlgks+E1s9dTpdFQvL76TvodqSy
l2E2BghVgLLgkdhRn9buaFzYta95JKfgyKGonNxsQA39PwECQQDKbG0Kp6KEkNgB
srCq3Cx2od5OfiPDG8g3RYZKx/O9dMy5CM160DwusVJpuywbpRhcWr3gkz0QgRMd
IRVwyxNbAkEAyh3sipmcgN7SD8xBG/MtBYPqWP1vxhSVYPfJzuPU3gS5MRJzQHBz
sVCLhTBY7hHSoqiqlqWYasi81JzBEwEuQQJBAKw9qGcZjyMH8JU5TDSGllr3jybx
FFMPj8TgJs346AB8ozqLL/ThvWPpxHttJbH8QAdNuyWdg6dIfVAa95h7Y+MCQEZg
jRDl1Bz7eWGO2c0Fq9OTz3IVLWpnmGwfW+HyaxizxFhV+FOj1GUVir9hylV7V0DU
QjIajyv/oeDWhFQ9wQECQCydhJ6NaNQOCZh+6QTrH3TC5MeBA1Yeipoe7+BhsLNr
cFG8s9sTxRnltcZl1dXaBSemvpNvBizn0Kzi8G3ZAgc=
-----END RSA PRIVATE KEY-----`,
  pc: `-----BEGIN CERTIFICATE-----
MIIBkDCB+qADAgECAgAwDQYJKoZIhvcNAQEFBQAwDzENMAsGA1UEChMEaVBheTAe
Fw0xMzAzMTMxMTI1MTFaFw0yMzAzMTExMTI1MTFaMA8xDTALBgNVBAoTBGlQYXkw
gZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAML+VTmiY4yChoOTMZTXAIG/mk+x
f/9mjwHxWzxtBJbNncNK0OLI0VXYKW2GgVklGHHQjvew1hTFkEGjnCJ7f5CDnbgx
evtyASDGst92a6xcAedEadP0nFXhUz+cYYIgIcgfDcX3ZWeNEF5kscqy52kpD2O7
nFNCV+85vS4duJBNAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAFSfqJHH9Vp9Y4osJ
sLg1Um5LOoTgn6u4JepHMFoSiwYE0n/N3D3JIgqAzjdVJ+1rZV95VAf/+TKzWzvP
V8L01LJ8aRFkUaPGenVsGvBT2mtsbu34QUOlPgzCi3huidwk0ylMX7zo8uxu1cXv
/bg5jBGe5SjvJP8Tq257QcAGgkA=
-----END CERTIFICATE-----`
};

const COUNTRIES = { France: "FRA", Belgique: "BEL", Suisse: "CHE", Luxembourg: "LUX" };

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const site = (env.SITE_ORIGIN || "https://la-base.shop").replace(/\/$/, "");
    const cors = { "Access-Control-Allow-Origin": site, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" };
    try {
      if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
      if (url.pathname === "/checkout" && req.method === "POST") return json(await checkout(req, env, url, site), 200, cors);
      if (url.pathname === "/notify" && req.method === "POST") return notify(req, env);
      if (url.pathname === "/ok") return Response.redirect(`${site}/#/merci?paye=1&ref=${encodeURIComponent(cleanRef(url.searchParams.get("ref")))}`, 303);
      if (url.pathname === "/cancel") return Response.redirect(`${site}/#/commande?annule=1`, 303);
      return new Response("BASE · paiement", { status: 200 });
    } catch (e) {
      return json({ error: e.publicMessage || "Paiement momentanément indisponible." }, e.status || 500, cors);
    }
  }
};

/* ---------- Création du paiement ---------- */
async function checkout(req, env, url, site) {
  const body = await req.json().catch(() => fail("Requête invalide.", 400));
  const ref = cleanRef(body.ref);
  if (!ref) fail("Référence de commande invalide.", 400);
  const c = body.customer || {};
  const need = ["firstname", "lastname", "email", "address", "zip", "city"];
  if (need.some((k) => !String(c[k] || "").trim())) fail("Informations client incomplètes.", 400);
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 20) fail("Panier vide.", 400);

  const { products, shipping } = await catalogue(site);
  const lines = body.items.map((it) => {
    const p = products.get(String(it.id));
    const qty = Math.trunc(Number(it.qty));
    if (!p || p.soldOut) fail("Un article de ton panier n'est plus disponible.", 409);
    if (!(qty >= 1 && qty <= 10)) fail("Quantité invalide.", 400);
    return { name: `${p.name} - ${p.color} - T. ${String(it.size || "").slice(0, 8)}`.slice(0, 120), qty, price: p.price };
  });
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const ship = shipping.freeFrom && subtotal >= shipping.freeFrom ? 0 : shipping.price;
  if (ship > 0) lines.push({ name: "Livraison", qty: 1, price: ship });
  const total = lines.reduce((n, l) => n + l.price * l.qty, 0);

  const mode = env.MYPOS_MODE === "live" ? "live" : "test";
  const pack = loadPack(env, mode);
  const self = (env.PUBLIC_URL || url.origin).replace(/\/$/, "");
  const f = [
    ["IPCmethod", "IPCPurchase"], ["IPCVersion", "1.4"], ["IPCLanguage", "FR"],
    ["SID", pack.sid], ["WalletNumber", pack.cn], ["KeyIndex", String(pack.idx)],
    ["Amount", money(total)], ["Currency", "EUR"], ["OrderID", ref],
    ["URL_OK", `${self}/ok?ref=${ref}`], ["URL_Cancel", `${self}/cancel?ref=${ref}`], ["URL_Notify", `${self}/notify`],
    ["CardTokenRequest", "0"], ["PaymentParametersRequired", "1"],
    ["CustomerEmail", clip(c.email, 100)], ["CustomerPhone", clip(c.phone, 30)],
    ["CustomerFirstNames", clip(c.firstname, 60)], ["CustomerFamilyName", clip(c.lastname, 60)],
    ["CustomerCountry", COUNTRIES[c.country] || "FRA"], ["CustomerCity", clip(c.city, 60)],
    ["CustomerZIPCode", clip(c.zip, 10)], ["CustomerAddress", clip(c.address, 100)],
    ["Note", `Commande ${ref}`], ["CartItems", String(lines.length)]
  ];
  lines.forEach((l, i) => {
    const n = i + 1;
    f.push([`Article_${n}`, l.name], [`Quantity_${n}`, String(l.qty)], [`Price_${n}`, money(l.price)], [`Currency_${n}`, "EUR"], [`Amount_${n}`, money(l.price * l.qty)]);
  });
  f.push(["Signature", await sign(f.map(([, v]) => v), pack.pk)]);
  return { action: ENDPOINTS[mode], fields: f, total: money(total), mode };
}

/* ---------- Confirmation myPOS ---------- */
async function notify(req, env) {
  const mode = env.MYPOS_MODE === "live" ? "live" : "test";
  const pack = loadPack(env, mode);
  const params = [...new URLSearchParams(await req.text())];
  const sig = (params.find(([k]) => k === "Signature") || [])[1];
  const values = params.filter(([k]) => k !== "Signature").map(([, v]) => v);
  if (!sig || !(await verify(values, sig, pack.pc))) return new Response("Signature invalide", { status: 400 });
  // Paiement confirmé : il apparaît dans ton espace myPOS (Transactions). myPOS attend « OK ».
  console.log("Paiement confirmé", Object.fromEntries(params.filter(([k]) => /OrderID|Amount|IPC_Trnref|IPCmethod/.test(k))));
  return new Response("OK", { status: 200 });
}

/* ---------- Catalogue (prix relus sur le site) ---------- */
let cache = null;
async function catalogue(site) {
  if (cache && Date.now() - cache.at < 5 * 60 * 1000) return cache.data;
  const [pjs, cjs] = await Promise.all([site + "/assets/js/products.js", site + "/assets/js/config.js"].map((u) => fetch(u, { cf: { cacheTtl: 300 } }).then((r) => {
    if (!r.ok) fail("Catalogue indisponible.", 503);
    return r.text();
  })));
  const products = new Map();
  for (const m of pjs.matchAll(/\{\s*id: "([^"]+)",[\s\S]*?\n\s{2}\}/g)) {
    const block = m[0];
    const price = block.match(/\bprice: ([\d.]+)/);
    if (!price) continue;
    products.set(m[1], {
      price: Number(price[1]),
      name: (block.match(/\bname: "([^"]*)"/) || [])[1] || m[1],
      color: (block.match(/\bcolor: "([^"]*)"/) || [])[1] || "",
      soldOut: /\bsoldOut: true\b/.test(block)
    });
  }
  const num = (k, d) => Number((cjs.match(new RegExp(`\\b${k}: ([\\d.]+)`)) || [])[1] ?? d);
  const data = { products, shipping: { price: num("shippingPrice", 7.9), freeFrom: num("freeShippingFrom", 0) } };
  if (!products.size) fail("Catalogue indisponible.", 503);
  cache = { at: Date.now(), data };
  return data;
}

/* ---------- Signature RSA-SHA256 (format myPOS) ---------- */
function loadPack(env, mode) {
  if (env.MYPOS_CONFIG_PACK) {
    try { return JSON.parse(atob(env.MYPOS_CONFIG_PACK.trim())); } catch (e) { fail("Configuration myPOS invalide.", 500); }
  }
  if (mode === "test") return TEST_PACK;
  fail("Paiement non configuré.", 503);
}
const enc = new TextEncoder();
const b64 = (bytes) => { let s = ""; bytes.forEach((b) => (s += String.fromCharCode(b))); return btoa(s); };
const unb64 = (s) => Uint8Array.from(atob(s.replace(/\s+/g, "")), (c) => c.charCodeAt(0));
const payload = (values) => enc.encode(b64(enc.encode(values.join("-"))));
const pemBody = (pem) => unb64(pem.replace(/-----[^-]+-----/g, ""));

async function sign(values, pem) {
  let der = pemBody(pem);
  if (/BEGIN RSA PRIVATE KEY/.test(pem)) der = pkcs1ToPkcs8(der);
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  return b64(new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, payload(values))));
}
async function verify(values, sig, certPem) {
  const key = await crypto.subtle.importKey("spki", certToSpki(pemBody(certPem)), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  return crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, unb64(sig), payload(values));
}

// DER minimal : enveloppe PKCS#1 -> PKCS#8, et extraction de la clé publique d'un certificat X.509
function derLen(n) { if (n < 128) return [n]; const b = []; while (n) { b.unshift(n & 255); n >>= 8; } return [0x80 | b.length, ...b]; }
function der(tag, content) { return Uint8Array.from([tag, ...derLen(content.length), ...content]); }
function pkcs1ToPkcs8(pkcs1) {
  const algo = Uint8Array.from([0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00]);
  return der(0x30, Uint8Array.from([0x02, 0x01, 0x00, ...algo, ...der(0x04, pkcs1)]));
}
function readTlv(buf, pos) {
  const tag = buf[pos]; let len = buf[pos + 1], off = pos + 2;
  if (len & 0x80) { const n = len & 0x7f; len = 0; for (let i = 0; i < n; i++) len = (len << 8) | buf[off + i]; off += n; }
  return { tag, start: pos, body: off, end: off + len };
}
function certToSpki(cert) {
  const tbs = readTlv(cert, readTlv(cert, 0).body);
  let p = tbs.body;
  if (cert[p] === 0xa0) p = readTlv(cert, p).end;         // version [0]
  for (let i = 0; i < 5; i++) p = readTlv(cert, p).end;    // serial, sigAlg, issuer, validity, subject
  const spki = readTlv(cert, p);
  return cert.slice(spki.start, spki.end);
}

/* ---------- Divers ---------- */
function cleanRef(r) { const s = String(r || "").toUpperCase(); return /^BASE-[A-Z0-9]{4,12}$/.test(s) ? s : ""; }
function clip(v, n) { return String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, n); }
function money(n) { return (Math.round(n * 100) / 100).toFixed(2); }
function json(o, status, headers) { return new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", ...headers } }); }
function fail(msg, status) { const e = new Error(msg); e.publicMessage = msg; e.status = status; throw e; }
