/* ==========================================================
   BASE — Application
   Site en une seule page : les adresses du type
   #/boutique, #/produit/<id>, #/commande changent la vue.
   Pour modifier le contenu, édite config.js et products.js.
   ========================================================== */
(function () {
  "use strict";

  const CFG = window.BASE_CONFIG;
  const BRANDS = window.BASE_BRANDS;
  const CATS = window.BASE_CATEGORIES;
  const PRODUCTS = window.BASE_PRODUCTS;
  const ART = window.BASE_ART;
  // Photos déclarées dans photos.js (prioritaires sur le champ images de products.js)
  const PHOTOS = window.BASE_PHOTOS || {};
  PRODUCTS.forEach((p) => { const ph = (PHOTOS[p.id] || []).filter(Boolean); if (ph.length) p.images = ph; });

  /* =================== Utilitaires =================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = new Intl.NumberFormat(CFG.locale, { style: "currency", currency: CFG.currency });
  const money = (n) => fmt.format(n).replace(/[.,]00(?=\s?\D*$)/, "");
  const moneyExact = (n) => fmt.format(n);
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const brandOf = (p) => BRANDS[p.brand] || { name: p.brand, tint: "#ececea" };
  const isNew = (p) => (p.tags || []).includes("new");
  const isBest = (p) => (p.tags || []).includes("best");
  const isSale = (p) => p.oldPrice > p.price;
  const pct = (p) => Math.round((1 - p.price / p.oldPrice) * 100);
  const variantsOf = (p) => PRODUCTS.filter((x) => x.group && x.group === p.group);
  const availableSizes = (p) => (p.soldOut ? [] : p.sizes.filter((s) => !(p.soldOutSizes || []).includes(s)));
  const isOut = (p) => !availableSizes(p).length;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }
  };

  // Liens internes
  const qs = (o) => { const u = new URLSearchParams(); Object.entries(o).forEach(([k, v]) => v && u.set(k, v)); const s = u.toString(); return s ? "?" + s : ""; };
  const L = {
    home: "#/",
    shop: (o = {}) => "#/boutique" + qs(o),
    product: (id) => "#/produit/" + encodeURIComponent(id),
    checkout: "#/commande",
    faq: (a) => "#/aide" + (a ? "?q=" + a : ""),
    legal: "#/mentions"
  };

  // Date de livraison estimée (jours ouvrés)
  function addBusinessDays(d, n) { const r = new Date(d); while (n > 0) { r.setDate(r.getDate() + 1); const w = r.getDay(); if (w !== 0 && w !== 6) n--; } return r; }
  function deliveryWindow() {
    const f = new Intl.DateTimeFormat(CFG.locale, { weekday: "short", day: "numeric", month: "short" });
    const now = new Date();
    return `${f.format(addBusinessDays(now, CFG.deliveryDays[0]))} et le ${f.format(addBusinessDays(now, CFG.deliveryDays[1]))}`;
  }

  // Famille de couleur calculée depuis la pastille (teinte réelle de la photo)
  function famFromHex(hex) {
    const n = parseInt(String(hex || "#888888").slice(1), 16);
    const r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    if (l < 0.16) return "Noir";
    if (s < 0.12 || (s < 0.2 && l > 0.7)) return l > 0.8 ? "Blanc" : "Gris";
    if (l > 0.88) return "Blanc";
    if (h < 15 || h >= 345) return l > 0.62 ? "Rose" : "Rouge";
    if (h < 45) return s < 0.45 && l > 0.55 ? "Beige" : l < 0.42 ? "Marron" : "Orange";
    if (h < 68) return s < 0.45 && l > 0.5 ? "Beige" : "Jaune";
    if (h < 170) return "Vert";
    if (h < 255) return "Bleu";
    if (h < 300) return "Violet";
    return "Rose";
  }
  function colorFamily(p) {
    if (p._fam) return p._fam;
    const c = norm(p.color.split("/")[0]);
    let f = /^(black|noir|jet black|deep black)/.test(c) ? "Noir" : /^(white|bright white|undyed)/.test(c) ? "Blanc" : famFromHex(p.swatch);
    p._fam = f; return f;
  }
  const FAMILY_SW = { Noir: "#171717", Blanc: "#f3f1ec", Gris: "#a9abaa", Beige: "#d6c6a8", Marron: "#7a5a3c", Rouge: "#a8262c", Rose: "#e8a0b4", Orange: "#e07b2e", Jaune: "#e6c84a", Vert: "#5b6b45", Bleu: "#2b4a8a", Violet: "#7b5aa6" };
  const TYPES = window.BASE_TYPES || {};
  const GENDERS = { femme: "Femme", homme: "Homme" };
  const genderOk = (p, g) => !g || p.gender === g || p.gender === "unisexe" || !p.gender;

  /* =================== Icônes =================== */
  const I = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5.5 8h13l-1 12.5h-11L5.5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 6 6 6-6 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4.5 6v5.5c0 4.8 3.2 8 7.5 9.5 4.3-1.5 7.5-4.7 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.3 2.3 4.3-4.6"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2.5 6.5h11.5v9.5H2.5zM14 9.5h4l3.5 3.5v3H14"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',
    ret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="m8 5-4 4 4 4"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4.5" y="10.5" width="15" height="10" rx="1.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10.5 13.5 3 10.5l1.5-1.5 7.5 1 4.5-4.5c1-1 2.5-1 3 0 .5.5.5 2-.5 3L14.5 13l1 7.5L14 22l-3.5-8.5Z"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 15.5 15.5 3l5.5 5.5L8.5 21 3 15.5Z"/><path d="m7 11.5 2 2M10 8.5l2 2M13 5.5l2 2"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4V5Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v3a7 7 0 0 1-3.8-1.2v6.1A5.8 5.8 0 1 1 10.7 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3Z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>'
  };

  /* =================== Visuels =================== */
  function art(p, view = 0, cls = "") {
    const imgs = p.images || [];
    if (imgs.length) {
      const src = imgs[view] || imgs[0];
      return `<img class="${cls}" src="${esc(src)}" alt="${esc(p.name + " — " + p.color)}" loading="lazy" data-pid="${esc(p.id)}" data-view="${view}">`;
    }
    const svg = ART.render(p, view, brandOf(p));
    return cls ? svg.replace("<svg ", `<svg class="${cls}" `) : svg;
  }
  // Photo introuvable -> illustration à la place
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || !img.dataset.pid) return;
    const p = byId(img.dataset.pid); if (!p) return;
    const t = document.createElement("div");
    t.innerHTML = ART.render(p, +img.dataset.view || 0, brandOf(p));
    if (img.className) t.firstElementChild.setAttribute("class", img.className);
    img.replaceWith(t.firstElementChild);
  }, true);

  /* =================== Panier =================== */
  const CART_KEY = "base_cart_v2";
  const Cart = {
    items: store.get(CART_KEY, []).filter((i) => byId(i.id)),
    save() { store.set(CART_KEY, this.items); renderCart(); },
    add(id, size, qty = 1) {
      const f = this.items.find((i) => i.id === id && i.size === size);
      if (f) f.qty += qty; else this.items.push({ id, size, qty });
      this.save();
    },
    setQty(i, q) { if (q <= 0) this.items.splice(i, 1); else this.items[i].qty = Math.min(q, 9); this.save(); },
    clear() { this.items = []; this.save(); },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    subtotal() { return this.items.reduce((n, i) => n + byId(i.id).price * i.qty, 0); },
    shipping() { if (!this.items.length) return 0; return CFG.freeShippingFrom && this.subtotal() >= CFG.freeShippingFrom ? 0 : CFG.shippingPrice; },
    total() { return this.subtotal() + this.shipping(); }
  };

  const RV_KEY = "base_recent_v1";
  function pushRecent(id) { const l = store.get(RV_KEY, []).filter((x) => x !== id); l.unshift(id); store.set(RV_KEY, l.slice(0, 12)); }

  /* =================== Composants =================== */
  function priceHTML(p) {
    return isSale(p) ? `<span class="now-sale">${money(p.price)}</span><del>${money(p.oldPrice)}</del>` : `<span>${money(p.price)}</span>`;
  }

  function badgesHTML(p) {
    const b = [];
    if (isOut(p)) b.push('<span class="badge badge--out">Rupture de stock</span>');
    else {
      if (isSale(p)) b.push(`<span class="badge badge--sale">-${pct(p)}%</span>`);
      if (isNew(p)) b.push('<span class="badge badge--ink">Nouveau</span>');
      else if (isBest(p)) b.push('<span class="badge">Best-seller</span>');
    }
    return b.join("");
  }

  function swatchesHTML(p, max = 5) {
    const v = variantsOf(p);
    if (v.length < 2) return '<div class="swatches"></div>';
    const shown = v.slice(0, max);
    return `<div class="swatches">${shown.map((x) => `<a class="sw${x.id === p.id ? " is-on" : ""}" href="${L.product(x.id)}" data-sw="${esc(x.id)}" style="background:${esc(x.swatch)}" title="${esc(x.color)}" aria-label="Coloris ${esc(x.color)}"></a>`).join("")}${v.length > max ? `<span class="more">+${v.length - max}</span>` : ""}</div>`;
  }

  function quickHTML(p) {
    if (isOut(p)) return "";
    const out = p.soldOutSizes || [];
    return `<div class="quick" aria-label="Ajout rapide">
      <div class="quick__label"><span>Ajout rapide</span><span class="muted">${(p.category === "chaussures" ? "EU" : p.category === "accessoires" ? "" : "US")}</span></div>
      <div class="quick__sizes">${p.sizes.map((s) => `<button type="button" data-quick-add="${esc(p.id)}" data-size="${esc(s)}" ${out.includes(s) ? "disabled" : ""}>${s === "TU" ? "Unique" : esc(s)}</button>`).join("")}</div>
    </div>
    <button class="plus" type="button" data-quick-sheet="${esc(p.id)}" aria-label="Ajout rapide : ${esc(p.name)}">${I.plus}</button>`;
  }

  function cardHTML(p) {
    const second = (p.images && p.images[1]) ? art(p, 1, "alt") : (!p.images || !p.images.length ? art(p, 1, "alt") : "");
    return `<article class="card${isOut(p) ? " is-out" : ""}" data-card="${esc(p.id)}">
      <div class="card__top" style="position:relative">
        <a class="card__media" href="${L.product(p.id)}" aria-label="${esc(p.name + " — " + p.color)}">
          <div class="badges">${badgesHTML(p)}</div>
          ${art(p, 0)}${second}
        </a>
        ${quickHTML(p)}
      </div>
      <div class="card__body">
        ${swatchesHTML(p)}
        <h3 class="card__name"><a href="${L.product(p.id)}">${esc(p.name)}</a></h3>
        <div class="card__meta">${esc(p.color)}</div>
        <div class="price">${priceHTML(p)}</div>
      </div>
    </article>`;
  }

  function miniHTML(p) {
    return `<a class="mini" href="${L.product(p.id)}"><div class="art">${art(p)}</div><b>${esc(p.name)}</b><span class="muted">${esc(p.color)}</span><span class="price">${priceHTML(p)}</span></a>`;
  }

  function railHTML(id, list) {
    return `<div class="rail" id="${id}">${list.map(cardHTML).join("")}</div>`;
  }
  function railCtrl(id) {
    return `<div class="rail-ctrl"><button class="round" data-rail="${id}" data-dir="-1" aria-label="Précédent">${I.left}</button><button class="round" data-rail="${id}" data-dir="1" aria-label="Suivant">${I.right}</button></div>`;
  }

  // Un seul coloris par modèle dans les listes (le meilleur en premier)
  function onePerGroup(list) {
    const seen = new Set();
    return list.filter((p) => { const g = p.group || p.id; if (seen.has(g)) return false; seen.add(g); return true; });
  }

  // Produits pour compléter un look
  function lookFor(p, n = 3, exclude = []) {
    const want = p.category === "chaussures" ? ["ensembles", "doudounes"] : p.category === "accessoires" ? ["ensembles"] : ["chaussures", "accessoires"];
    const ex = new Set([p.id, ...exclude]);
    const g = p.gender === "unisexe" ? "" : p.gender;
    const pool = onePerGroup(PRODUCTS.filter((x) => want.includes(x.category) && !ex.has(x.id) && !isOut(x) && genderOk(x, g)));
    pool.sort((a, b) => (b.brand === p.brand) - (a.brand === p.brand) || (b.category === want[0]) - (a.category === want[0]) || isBest(b) - isBest(a));
    return pool.slice(0, n);
  }

  function search(q) {
    const words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PRODUCTS.filter((p) => {
      const hay = norm([p.name, brandOf(p).name, CATS[p.category].name, CATS[p.category].one, p.color, colorFamily(p), GENDERS[p.gender] || "", TYPES[p.type] || ""].join(" ")).replace(/-/g, " ");
      return words.every((w) => hay.includes(w.replace(/-/g, " ")));
    });
  }

  /* =================== Coque du site =================== */
  function brandsIn(cat) { return Object.keys(BRANDS).filter((b) => PRODUCTS.some((p) => p.brand === b && p.category === cat)); }
  function countIn(f) { return PRODUCTS.filter(f).length; }

  function genderMega(g) {
    const cats = ["ensembles", "chaussures", "accessoires", "doudounes"].filter((c) => PRODUCTS.some((p) => p.category === c && p.gender === g));
    const brands = Object.keys(BRANDS).filter((b) => PRODUCTS.some((p) => p.brand === b && p.gender === g));
    const feat = onePerGroup(PRODUCTS.filter((p) => p.gender === g && isBest(p))).slice(0, 3);
    return `<div class="mega"><div class="wrap">
      <div><h4 class="eyebrow">${GENDERS[g]}</h4><ul><li><a href="${L.shop({ g })}"><b>Tout voir</b></a></li>${cats.map((c) => `<li><a href="${L.shop({ cat: c, g })}">${CATS[c].name}</a></li>`).join("")}<li><a href="${L.shop({ g, filter: "new" })}">Nouveautés</a></li></ul></div>
      <div><h4 class="eyebrow">Marques</h4><ul>${brands.map((b) => `<li><a href="${L.shop({ g, brand: b })}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul></div>
      <div class="mega__feature">${feat.map((p) => `<a href="${L.product(p.id)}"><div class="art">${art(p)}</div>${esc(p.name)}</a>`).join("")}</div>
    </div></div>`;
  }
  function accMega() {
    const types = Object.keys(TYPES).filter((t) => PRODUCTS.some((p) => p.type === t));
    const feat = onePerGroup(PRODUCTS.filter((p) => p.category === "accessoires" && isBest(p))).slice(0, 3);
    return `<div class="mega"><div class="wrap">
      <div><h4 class="eyebrow">Accessoires</h4><ul><li><a href="${L.shop({ cat: "accessoires" })}"><b>Tout voir</b></a></li>${types.map((t) => `<li><a href="${L.shop({ cat: "accessoires", type: t })}">${TYPES[t]}</a></li>`).join("")}</ul></div>
      <div><h4 class="eyebrow">Par marque</h4><ul>${brandsIn("accessoires").map((b) => `<li><a href="${L.shop({ cat: "accessoires", brand: b })}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul></div>
      <div class="mega__feature">${feat.map((p) => `<a href="${L.product(p.id)}"><div class="art">${art(p)}</div>${esc(p.name)}</a>`).join("")}</div>
    </div></div>`;
  }

  function megaHTML(cat) {
    const feat = onePerGroup(PRODUCTS.filter((p) => p.category === cat && isBest(p))).slice(0, 3);
    const extra = [["Femme", L.shop({ cat, g: "femme" })], ["Homme", L.shop({ cat, g: "homme" })], ["Nouveautés", L.shop({ cat, filter: "new" })], ["Promos", L.shop({ cat, filter: "sale" })]]
      .concat(cat === "ensembles" ? [["Doudounes", L.shop({ cat: "doudounes" })]] : []);
    return `<div class="mega"><div class="wrap">
      <div><h4 class="eyebrow">Par marque</h4><ul><li><a href="${L.shop({ cat })}"><b>Tous les ${CATS[cat].name.toLowerCase()}</b></a></li>${brandsIn(cat).map((b) => `<li><a href="${L.shop({ cat, brand: b })}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul></div>
      <div><h4 class="eyebrow">Explorer</h4><ul>${extra.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div class="mega__feature">${feat.map((p) => `<a href="${L.product(p.id)}"><div class="art">${art(p)}</div>${esc(p.name)}</a>`).join("")}</div>
    </div></div>`;
  }

  function shell() {
    const nav = [
      ["Nouveautés", L.shop({ filter: "new" }), ""],
      ["Femme", L.shop({ g: "femme" }), genderMega("femme")],
      ["Homme", L.shop({ g: "homme" }), genderMega("homme")],
      ["Ensembles", L.shop({ cat: "ensembles" }), megaHTML("ensembles")],
      ["Chaussures", L.shop({ cat: "chaussures" }), megaHTML("chaussures")],
      ["Accessoires", L.shop({ cat: "accessoires" }), accMega()],
      ["Marques", "#/marques", ""],
      ["Promos", L.shop({ filter: "sale" }), ""]
    ];
    document.body.insertAdjacentHTML("afterbegin", `
      <a class="sr-only" href="#main">Aller au contenu</a>
      <div class="announce" role="region" aria-label="Informations"><div class="wrap">${CFG.announcements.map((a, i) => `<div class="announce__msg${i ? "" : " is-on"}">${esc(a)}</div>`).join("")}</div></div>
      <header class="header">
        <div class="wrap">
          <div class="header__left">
            <button class="icon-btn menu-btn" data-open="menu" aria-label="Ouvrir le menu">${I.menu}</button>
            <nav class="header__nav" aria-label="Navigation principale">
              ${nav.map(([t, h, m]) => `<div class="nav-item"><a href="${h}" data-nav="${esc(t)}"${t === "Promos" ? ' class="is-sale"' : ""}>${t}</a>${m}</div>`).join("")}
            </nav>
          </div>
          <a class="logo" href="${L.home}" aria-label="${esc(CFG.storeName)}, accueil">${esc(CFG.storeName)}</a>
          <div class="header__actions">
            <button class="icon-btn" data-open="search" aria-label="Rechercher">${I.search}</button>
            <a class="icon-btn hide-sm" href="${L.faq()}" aria-label="Aide">${I.chat}</a>
            <button class="icon-btn" data-open="cart" aria-label="Panier">${I.bag}<span class="bag-count" data-n="0">0</span></button>
          </div>
        </div>
      </header>
      <main id="main" tabindex="-1"></main>
    `);
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="footer" id="footer"></footer>
      <div class="scrim" data-close></div>
      <aside class="drawer drawer--l" id="menu" aria-label="Menu" aria-hidden="true">
        <div class="drawer__head"><span class="logo" style="font-size:1.375rem">${esc(CFG.storeName)}</span><button class="icon-btn" data-close aria-label="Fermer">${I.close}</button></div>
        <div class="drawer__body mobile-nav">
          <a href="${L.shop({ filter: "new" })}">Nouveautés ${I.chev}</a>
          <a href="${L.shop({ g: "femme" })}">Femme ${I.chev}</a>
          <a href="${L.shop({ g: "homme" })}">Homme ${I.chev}</a>
          ${["ensembles", "chaussures"].map((c) => `<details><summary>${CATS[c].name} ${I.chev}</summary><ul><li><a href="${L.shop({ cat: c })}"><b>Tout voir</b></a></li>${brandsIn(c).map((b) => `<li><a href="${L.shop({ cat: c, brand: b })}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul></details>`).join("")}
          <details><summary>Accessoires ${I.chev}</summary><ul><li><a href="${L.shop({ cat: "accessoires" })}"><b>Tout voir</b></a></li>${Object.keys(TYPES).map((t) => `<li><a href="${L.shop({ cat: "accessoires", type: t })}">${TYPES[t]}</a></li>`).join("")}</ul></details>
          <a href="${L.shop({ cat: "doudounes" })}">Doudounes ${I.chev}</a>
          <a href="#/marques">Marques ${I.chev}</a>
          <a href="${L.shop({ filter: "sale" })}" style="color:var(--sale)">Promos ${I.chev}</a>
          <a href="${L.faq()}">Aide & contact ${I.chev}</a>
        </div>
      </aside>
      <aside class="drawer drawer--r" id="cart" aria-label="Panier" aria-hidden="true">
        <div class="drawer__head"><span class="drawer__title">Panier <span class="muted tnum" id="cart-n"></span></span><button class="icon-btn" data-close aria-label="Fermer">${I.close}</button></div>
        <div class="drawer__body" id="cart-body"></div>
        <div class="drawer__foot" id="cart-foot"></div>
      </aside>
      <aside class="drawer drawer--r" id="guide" aria-label="Guide des tailles" aria-hidden="true">
        <div class="drawer__head"><span class="drawer__title">Guide des tailles</span><button class="icon-btn" data-close aria-label="Fermer">${I.close}</button></div>
        <div class="drawer__body" id="guide-body"></div>
      </aside>
      <aside class="drawer drawer--r" id="filters" aria-label="Filtres" aria-hidden="true">
        <div class="drawer__head"><span class="drawer__title">Filtres</span><button class="icon-btn" data-close aria-label="Fermer">${I.close}</button></div>
        <div class="drawer__body" id="filters-body"></div>
        <div class="drawer__foot"><button class="btn btn--block" data-close id="filters-apply">Voir les produits</button></div>
      </aside>
      <div class="sheet" id="sheet" role="dialog" aria-label="Ajout rapide" aria-hidden="true"></div>
      <div class="search" id="search" role="dialog" aria-label="Recherche" aria-hidden="true">
        <div class="wrap">
          <form class="search__bar" id="search-form" role="search">
            ${I.search}
            <label class="sr-only" for="search-input">Rechercher un produit</label>
            <input id="search-input" type="search" placeholder="Rechercher un produit, une marque…" autocomplete="off">
            <button type="button" class="icon-btn" data-close aria-label="Fermer la recherche">${I.close}</button>
          </form>
          <div class="search__chips" id="search-chips"><span class="eyebrow">Populaire</span>${CFG.popularSearches.map((s) => `<button class="chip" type="button" data-search="${esc(s)}">${esc(s)}</button>`).join("")}</div>
          <div class="search__results" id="search-results"></div>
        </div>
      </div>
      <div class="sticky-buy" id="sticky-buy" aria-hidden="true"></div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      ${CFG.whatsapp ? `<a class="wa-fab" href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">${I.wa}</a>` : ""}
    `);
    renderFooter();

    // Bandeau rotatif
    const msgs = $$(".announce__msg");
    if (msgs.length > 1) { let i = 0; setInterval(() => { msgs[i].classList.remove("is-on"); i = (i + 1) % msgs.length; msgs[i].classList.add("is-on"); }, 4000); }
  }

  function renderFooter() {
    $("#footer").innerHTML = `<div class="wrap">
      <div class="footer__top">
        <div class="footer__about">
          <div class="logo">${esc(CFG.storeName)}</div>
          <p>Ensembles et sneakers 100% authentiques, achetés aux États-Unis et contrôlés un par un avant chaque envoi.</p>
          <div class="socials">
            ${CFG.instagram ? `<a href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>` : ""}
            ${CFG.tiktok ? `<a href="https://www.tiktok.com/@${esc(CFG.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${I.tt}</a>` : ""}
            ${CFG.whatsapp ? `<a href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>` : ""}
          </div>
        </div>
        <div><h4>Boutique</h4><ul>
          <li><a href="${L.shop({ filter: "new" })}">Nouveautés</a></li>
          <li><a href="${L.shop({ cat: "ensembles" })}">Ensembles</a></li>
          <li><a href="${L.shop({ cat: "chaussures" })}">Chaussures</a></li>
          <li><a href="${L.shop({ g: "femme" })}">Femme</a></li>
          <li><a href="${L.shop({ g: "homme" })}">Homme</a></li>
          <li><a href="${L.shop({ cat: "accessoires" })}">Accessoires</a></li>
          <li><a href="${L.shop({ cat: "doudounes" })}">Doudounes</a></li>
          <li><a href="${L.shop({ filter: "sale" })}">Promos</a></li>
        </ul></div>
        <div><h4>Marques</h4><ul>${Object.keys(BRANDS).map((b) => `<li><a href="${L.shop({ brand: b })}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul></div>
        <div><h4>Aide</h4><ul>
          <li><a href="${L.faq("authenticite")}">Authenticité</a></li>
          <li><a href="${L.faq("livraison")}">Livraison</a></li>
          <li><a href="${L.faq("retours")}">Retours & échanges</a></li>
          <li><a href="${L.faq("tailles")}">Guide des tailles</a></li>
          <li><a href="${L.faq("contact")}">Contact</a></li>
          <li><a href="${L.legal}">Mentions légales & CGV</a></li>
        </ul></div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(CFG.storeName)} · Revendeur indépendant, non affilié aux marques présentées.</span>
        <div class="pay" aria-label="Moyens de paiement"><span>VISA</span><span>MASTERCARD</span><span>CB</span><span>PAYPAL</span><span>APPLE PAY</span></div>
      </div>
    </div>`;
  }

  /* =================== Panneaux =================== */
  let lastFocus = null;
  function open(id) {
    closeAll(true);
    const el = document.getElementById(id); if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add("is-on"); el.setAttribute("aria-hidden", "false");
    $(".scrim").classList.add("is-on");
    document.body.classList.add("is-locked");
    if (id === "search") setTimeout(() => $("#search-input").focus(), 120);
    else setTimeout(() => { const f = el.querySelector("button, a, input"); f && f.focus({ preventScroll: true }); }, 60);
  }
  function closeAll(silent) {
    $$(".drawer.is-on, .search.is-on, .sheet.is-on").forEach((d) => { d.classList.remove("is-on"); d.setAttribute("aria-hidden", "true"); });
    $(".scrim").classList.remove("is-on");
    document.body.classList.remove("is-locked");
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  let toastT;
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-on"), 2600); }

  /* =================== Panier (rendu) =================== */
  let justAdded = null;
  function lineHTML(it, i, editable) {
    const p = byId(it.id);
    return `<div class="line">
      <a class="line__art" href="${L.product(p.id)}">${art(p)}${editable ? "" : `<span class="qbadge">${it.qty}</span>`}</a>
      <div class="line__info">
        <div class="line__top"><span>${esc(p.name)}</span><span>${money(p.price * it.qty)}</span></div>
        <div class="line__meta">${esc(p.color)} · Taille ${esc(it.size)}</div>
        ${editable ? `<div class="line__row">
          <div class="qty"><button type="button" data-qty="${i}" data-d="-1" aria-label="Retirer un article">${I.minus}</button><span>${it.qty}</span><button type="button" data-qty="${i}" data-d="1" aria-label="Ajouter un article">${I.plus}</button></div>
          <button type="button" class="rm" data-rm="${i}">Retirer</button>
        </div>` : ""}
      </div>
    </div>`;
  }
  function shipHTML() {
    if (!CFG.freeShippingFrom) return "";
    const left = CFG.freeShippingFrom - Cart.subtotal();
    const w = Math.min(100, (Cart.subtotal() / CFG.freeShippingFrom) * 100);
    return `<div class="ship">${left > 0 ? `<span>Plus que <b>${moneyExact(left)}</b> pour la livraison offerte</span>` : `<span class="added">${I.check} Livraison offerte</span>`}<div class="ship__bar"><i style="width:${w}%"></i></div></div>`;
  }
  function totalsHTML() {
    const s = Cart.shipping();
    return `<div class="totals">
      <div><span>Sous-total</span><span>${moneyExact(Cart.subtotal())}</span></div>
      <div><span>Livraison</span><span>${s ? moneyExact(s) : "Offerte"}</span></div>
      <div class="grand"><span>Total</span><span>${moneyExact(Cart.total())}</span></div>
    </div>`;
  }
  function renderCart() {
    const n = Cart.count();
    $$(".bag-count").forEach((e) => { e.textContent = n; e.dataset.n = n; });
    $("#cart-n").textContent = n ? `(${n})` : "";
    const body = $("#cart-body"), foot = $("#cart-foot");
    if (!n) {
      body.innerHTML = `<div class="cart-empty"><p class="h-md">Ton panier est vide</p><p class="muted">Les best-sellers partent vite.</p><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><a class="btn btn--sm" href="${L.shop({ cat: "ensembles" })}">Ensembles</a><a class="btn btn--sm btn--ghost" href="${L.shop({ cat: "chaussures" })}">Chaussures</a></div></div>`;
      foot.hidden = true;
    } else {
      const inCart = Cart.items.map((i) => i.id);
      const anchor = byId(justAdded ? justAdded.id : Cart.items[Cart.items.length - 1].id);
      const ups = lookFor(anchor, 2, inCart);
      body.innerHTML = (justAdded ? `<p class="added" style="margin-bottom:14px">${I.check} Ajouté au panier</p>` : "")
        + shipHTML() + Cart.items.map((it, i) => lineHTML(it, i, true)).join("")
        + (ups.length ? `<div class="upsell"><span class="eyebrow">Complète ton look</span><div class="upsell__row">${ups.map(miniHTML).join("")}</div></div>` : "");
      foot.hidden = false;
      foot.innerHTML = totalsHTML() + `<a class="btn btn--block" href="${L.checkout}">Passer commande · ${moneyExact(Cart.total())}</a>
        <div class="foot-trust"><span>${I.shield} 100% authentique</span><span>${I.ret} Retours ${CFG.returnDays} j</span><span>${I.lock} Paiement sécurisé</span></div>`;
    }
    justAdded = null;
    if (route.name === "checkout") renderSummary();
  }

  function addToCart(id, size) {
    justAdded = { id, size };
    Cart.add(id, size);
    open("cart");
  }

  /* =================== Ajout rapide (mobile) =================== */
  function openSheet(id) {
    const p = byId(id); if (!p) return;
    const out = p.soldOutSizes || [];
    $("#sheet").innerHTML = `<div class="sheet__grab"></div>
      <div style="display:grid;grid-template-columns:72px 1fr auto;gap:14px;align-items:center;margin-bottom:18px">
        <div class="line__art">${art(p)}</div>
        <div><b>${esc(p.name)}</b><div class="muted" style="font-size:var(--fs-sm)">${esc(p.color)}</div><div class="price">${priceHTML(p)}</div></div>
        <button class="icon-btn" data-close aria-label="Fermer">${I.close}</button>
      </div>
      <div class="opt-head"><b>Choisis ta taille ${p.category === "chaussures" ? "(EU)" : "(US)"}</b><button class="link" type="button" data-guide="${esc(p.category)}">Guide des tailles</button></div>
      <div class="sizes">${p.sizes.map((s) => `<button class="size${out.includes(s) ? " is-out" : ""}${(p.lowStock || []).includes(s) ? " is-low" : ""}" type="button" ${out.includes(s) ? "disabled" : `data-quick-add="${esc(p.id)}" data-size="${esc(s)}"`}>${esc(s)}</button>`).join("")}</div>
      <a class="link" style="display:inline-block;margin-top:16px;font-size:var(--fs-sm)" href="${L.product(p.id)}">Voir la fiche produit</a>`;
    open("sheet");
  }

  /* =================== Guide des tailles =================== */
  function guideHTML(cat) {
    if (cat === "accessoires") {
      return `<p style="margin-bottom:16px">Casquettes et bonnets : taille unique, réglable ou extensible.</p>
        <div class="size-table-wrap"><table class="size-table"><thead><tr><th>Chaussettes</th><th>Pointure EU</th></tr></thead><tbody><tr><td>S</td><td>35–38</td></tr><tr><td>M</td><td>39–42</td></tr><tr><td>L</td><td>43–46</td></tr></tbody></table></div>
        <div class="size-table-wrap" style="margin-top:16px"><table class="size-table"><thead><tr><th>Caleçons</th><th>Tour de taille</th></tr></thead><tbody><tr><td>S</td><td>71–76 cm</td></tr><tr><td>M</td><td>76–84 cm</td></tr><tr><td>L</td><td>84–91 cm</td></tr><tr><td>XL</td><td>91–99 cm</td></tr><tr><td>XXL</td><td>99–107 cm</td></tr></tbody></table></div>`;
    }
    if (cat === "chaussures") {
      const rows = [["36", "4", "5.5", "22.5"], ["37", "4.5", "6", "23"], ["38", "5.5", "7", "24"], ["39", "6.5", "8", "24.5"], ["40", "7", "8.5", "25"], ["41", "8", "9.5", "26"], ["42", "8.5", "10", "26.5"], ["43", "9.5", "11", "27.5"], ["44", "10", "11.5", "28"], ["45", "11", "12.5", "29"], ["46", "12", "13.5", "30"]];
      return `<p style="margin-bottom:16px">Pointures EU. Mesure ton pied du talon au plus long orteil et compare avec la colonne CM.</p>
        <div class="size-table-wrap"><table class="size-table"><thead><tr><th>EU</th><th>US homme</th><th>US femme</th><th>CM</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <p class="muted" style="margin-top:16px;font-size:var(--fs-sm)">Les modèles On Femme et Homme ont des formes différentes : choisis la version de ton genre. On, Salomon, Asics, Mizuno et Alo taillent normalement. Entre deux tailles, prends la plus grande. Un doute ? Écris-nous sur WhatsApp avec ta pointure habituelle.</p>`;
    }
    const rows = [["XS", "86–91", "71–76", "165–170"], ["S", "91–96", "76–81", "170–175"], ["M", "96–101", "81–86", "175–180"], ["L", "101–106", "86–91", "180–185"], ["XL", "106–111", "91–96", "185–190"], ["XXL", "111–116", "96–101", "190–195"]];
    return `<p style="margin-bottom:16px">Tailles US, mesures du corps en centimètres.</p>
      <div class="size-table-wrap"><table class="size-table"><thead><tr><th>Taille</th><th>Poitrine</th><th>Taille</th><th>Hauteur</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="muted" style="margin-top:16px;font-size:var(--fs-sm)">Essentials et Alo ont une coupe oversize : prends ta taille habituelle pour un rendu ample, une taille en dessous pour un rendu ajusté. Ralph Lauren, On et Salomon taillent normalement.</p>`;
  }

  /* =================== Routeur =================== */
  let route = { name: "" };
  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, query = ""] = h.split("?");
    const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
    return { parts, q: new URLSearchParams(query) };
  }
  function setMeta(title, desc) {
    document.title = title ? `${title} | ${CFG.storeName}` : `${CFG.storeName} · Ensembles & sneakers 100% authentiques`;
    const m = $('meta[name="description"]'); if (m && desc) m.setAttribute("content", desc);
  }
  function go() {
    const { parts, q } = parse();
    const main = $("#main");
    closeAll(true);
    stickyOff();
    const name = parts[0] || "home";
    route = { name: name === "produit" ? "product" : name === "boutique" ? "shop" : name === "commande" ? "checkout" : name === "merci" ? "done" : name === "aide" ? "faq" : name === "mentions" ? "legal" : name === "marques" ? "brands" : name === "home" ? "home" : "404", parts, q };
    $$(".header__nav a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === location.hash));
    document.body.dataset.route = route.name;
    const views = { home: viewHome, shop: viewShop, product: viewProduct, checkout: viewCheckout, done: viewDone, faq: viewFaq, legal: viewLegal, brands: viewBrands, 404: view404 };
    main.innerHTML = "";
    views[route.name](main, parts, q);
    if (!go.keepScroll) window.scrollTo(0, 0);
    go.keepScroll = false;
  }

  /* =================== Accueil =================== */
  function viewHome(main) {
    setMeta("", "Ensembles Essentials, Ralph Lauren, Alo, On, Lululemon, Salomon et sneakers On, Salomon XT-6, Asics, Mizuno, Alo Runner. 100% authentiques, importés des États-Unis.");
    const firstOf = (grp) => PRODUCTS.find((p) => p.group === grp);
    const bestWomen = onePerGroup(PRODUCTS.filter((p) => p.gender === "femme" && isBest(p)).concat(PRODUCTS.filter((p) => p.gender === "femme")));
    const bestAcc = onePerGroup(PRODUCTS.filter((p) => p.category === "accessoires" && isBest(p)).concat(PRODUCTS.filter((p) => p.category === "accessoires")));
    const bestSets = onePerGroup(PRODUCTS.filter((p) => p.category === "ensembles" && isBest(p)).concat(PRODUCTS.filter((p) => p.category === "ensembles")));
    const bestShoes = onePerGroup(PRODUCTS.filter((p) => p.category === "chaussures" && isBest(p)).concat(PRODUCTS.filter((p) => p.category === "chaussures")));
    const news = onePerGroup(PRODUCTS.filter(isNew)).slice(0, 8);
    const heroMobile = matchMedia("(max-width: 699px)").matches, heroSrcM = [].concat(CFG.heroVideoMobile || []);
    const heroSrc = heroMobile && heroSrcM.length ? heroSrcM : [].concat(CFG.heroVideo || []);
    const heroPoster = (heroMobile && CFG.heroPosterMobile) || CFG.heroPoster;
    const duoA = byId("essentials-ss22-set-light-oatmeal"), duoB = PRODUCTS.find((p) => p.group === "on-cloudtilt-m" && /white|ivory/i.test(p.color)) || firstOf("on-cloudtilt-m");
    // Visuels des tuiles : images/home/cat-*.jpg (collages fond crème, générés hors du site)
    const catTiles = [
      ["Ensembles", L.shop({ cat: "ensembles" }), "ensembles", countIn((p) => p.category === "ensembles")],
      ["Chaussures", L.shop({ cat: "chaussures" }), "chaussures", countIn((p) => p.category === "chaussures")],
      ["Accessoires", L.shop({ cat: "accessoires" }), "accessoires", countIn((p) => p.category === "accessoires")],
      ["Femme", L.shop({ g: "femme" }), "femme", countIn((p) => p.gender === "femme")]
    ];

    main.innerHTML = `
      <section class="hero">
        <div class="hero__media" aria-hidden="true">
          ${heroSrc.length
            ? `<video class="hero__video" muted loop playsinline preload="auto"${heroPoster ? ` poster="${heroPoster}"` : ""}>${heroSrc.map((src) => `<source src="${src}" type="video/${src.split(".").pop() === "webm" ? "webm" : "mp4"}">`).join("")}</video>`
            : heroPoster ? `<img class="hero__video" src="${heroPoster}" alt="">` : ""}
        </div>
        <div class="wrap">
          <div class="hero__copy">
            <h1 class="hero__title">Tout part<br>de la <em>base.</em></h1>
            <div class="hero__ctas">
              <a class="btn btn--light" href="${L.shop({ cat: "ensembles" })}">Shop les ensembles</a>
              <a class="btn btn--glass" href="${L.shop({ cat: "chaussures" })}">Shop les chaussures</a>
            </div>
          </div>
        </div>
        ${heroSrc.length ? `<button class="hero__toggle" type="button" aria-label="Mettre la vidéo en pause"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-pause" d="M8 5h3v14H8zM13 5h3v14h-3z"/><path class="i-play" d="M8 5l11 7-11 7z"/></svg></button>` : ""}
      </section>

      <section class="trust" aria-label="Nos engagements"><div class="wrap">
        <div class="trust__item">${I.shield}<div><b>100% authentique</b><span>Contrôlé avant envoi</span></div></div>
        <div class="trust__item">${I.plane}<div><b>Direct des USA</b><span>Pas d'intermédiaire</span></div></div>
        <div class="trust__item">${I.truck}<div><b>Livraison suivie</b><span>${CFG.freeShippingFrom ? `Offerte dès ${money(CFG.freeShippingFrom)}` : `${CFG.deliveryDays[0]} à ${CFG.deliveryDays[1]} jours`}</span></div></div>
        <div class="trust__item">${I.ret}<div><b>Retours ${CFG.returnDays} jours</b><span>Échange ou remboursement</span></div></div>
      </div></section>

      <section class="band"><div class="wrap">
        <div class="sec-head">
          <div><span class="eyebrow">Les plus vendus</span><h2 class="h-xl">Best-sellers</h2></div>
          <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
            <div class="tabs" role="tablist">
              <button class="chip is-on" role="tab" aria-selected="true" data-tab="sets">Ensembles</button>
              <button class="chip" role="tab" aria-selected="false" data-tab="shoes">Chaussures</button>
              <button class="chip" role="tab" aria-selected="false" data-tab="women">Femme</button>
              <button class="chip" role="tab" aria-selected="false" data-tab="acc">Accessoires</button>
            </div>
            ${railCtrl("rail-best")}
          </div>
        </div>
        <div id="best-sets">${railHTML("rail-best", bestSets.slice(0, 8))}</div>
        <div id="best-shoes" hidden>${railHTML("rail-best-shoes", bestShoes.slice(0, 8))}</div>
        <div id="best-women" hidden>${railHTML("rail-best-women", bestWomen.slice(0, 8))}</div>
        <div id="best-acc" hidden>${railHTML("rail-best-acc", bestAcc.slice(0, 8))}</div>
      </div></section>

      <section class="band band--tight" style="padding-top:0"><div class="wrap">
        <div class="cats">${catTiles.map(([t, h, p, n]) => `<a class="cat" href="${h}"><div class="cat__art"><img src="images/home/cat-${p}.jpg" alt="${t}" loading="lazy"></div><div class="cat__label"><span>${t}</span><span class="mono">${n} pièces</span></div></a>`).join("")}</div>
      </div></section>

      ${duoA && duoB ? `<section class="band band--mist"><div class="wrap duo">
        <div class="duo__copy">
          <span class="eyebrow">Le look du moment</span>
          <h2 class="h-xl">Ensemble + sneakers, le duo qui part le plus</h2>
          <p class="muted" style="max-width:44ch">L'ensemble Essentials ${esc(duoA.color)} avec la ${esc(duoB.name.replace(/ (Homme|Femme)$/, ""))} ${esc(duoB.color)}. Commande les deux et la livraison est offerte.</p>
          <div class="duo__total"><strong>${money(duoA.price + duoB.price)}</strong><span class="muted">les deux pièces</span></div>
          <div class="hero__ctas"><a class="btn" href="${L.product(duoA.id)}">Choisir l'ensemble</a><a class="btn btn--ghost" href="${L.product(duoB.id)}">Choisir les sneakers</a></div>
        </div>
        <div class="duo__items">${cardHTML(duoA)}<span class="duo__plus" aria-hidden="true">+</span>${cardHTML(duoB)}</div>
      </div></section>` : ""}

      <section class="band"><div class="wrap">
        <div class="sec-head"><div><span class="eyebrow">${news.length} nouvelles pièces</span><h2 class="h-xl">Nouveautés</h2></div><a class="link" href="${L.shop({ filter: "new" })}">Tout voir</a></div>
        <div class="grid">${news.map(cardHTML).join("")}</div>
      </div></section>

      <section class="band" style="padding-top:0"><div class="wrap">
        <div class="sec-head"><div><span class="eyebrow">${Object.keys(BRANDS).length} marques</span><h2 class="h-xl">Shop par marque</h2></div></div>
        <div class="brands">${brandTiles()}</div>
      </div></section>

      <section class="band band--ink"><div class="wrap proof">
        <div style="display:grid;gap:20px;align-content:start">
          <span class="eyebrow">Notre garantie</span>
          <h2 class="display">Vrai ou remboursé.</h2>
          <p style="color:#c4c8c5;max-width:44ch">Chaque pièce vendue sur ${esc(CFG.storeName)} est authentique. Si ce n'est pas le cas, on te rembourse intégralement, livraison comprise.</p>
          <div><a class="btn btn--light" href="${L.faq("authenticite")}">Comment on vérifie</a></div>
        </div>
        <ol class="steps" style="list-style:none;margin:0;padding:0">
          <li class="step"><span class="step__n">01</span><div><h3>Achat aux États-Unis</h3><p>Notre fournisseur achète chaque pièce sur place, auprès de sources sûres. Aucun article ne passe par un intermédiaire inconnu.</p></div></li>
          <li class="step"><span class="step__n">02</span><div><h3>Contrôle à la réception</h3><p>Étiquettes, coutures, matières, codes produit et boîte : chaque article est vérifié à la main avant d'être mis en vente.</p></div></li>
          <li class="step"><span class="step__n">03</span><div><h3>Envoi suivi</h3><p>Ta commande part sous 24 à 48 h avec un numéro de suivi. Tu la reçois en ${CFG.deliveryDays[0]} à ${CFG.deliveryDays[1]} jours ouvrés.</p></div></li>
        </ol>
      </div></section>

      <section class="band"><div class="wrap two-col">
        <div style="display:grid;gap:16px;align-content:start">
          <span class="eyebrow">Questions fréquentes</span>
          <h2 class="h-xl">Tu te poses une question ?</h2>
          <p class="muted">On répond en général dans l'heure sur WhatsApp.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${CFG.whatsapp ? `<a class="btn" href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener">${I.wa} Écrire sur WhatsApp</a>` : ""}<a class="btn btn--ghost" href="${L.faq()}">Toute l'aide</a></div>
        </div>
        <div class="faq">${FAQ.slice(0, 5).map(faqItem).join("")}</div>
      </div></section>

      <section class="band band--mist"><div class="wrap news">
        <div style="display:grid;gap:12px"><span class="eyebrow">Drops & restocks</span><h2 class="h-xl">Sois prévenu en premier</h2><p class="muted">Les tailles partent vite. Inscris-toi pour recevoir les nouveaux arrivages et les restocks avant tout le monde.</p></div>
        <div>
          <form id="news-form" novalidate><label class="sr-only" for="news-email">Adresse e-mail</label><input id="news-email" type="email" placeholder="Ton adresse e-mail" autocomplete="email" required><button class="btn" type="submit">S'inscrire</button></form>
          <p class="news__msg" id="news-msg" role="status"></p>
        </div>
      </div></section>
    `;

    // Vidéo de la bannière : lecture auto (sauf « réduire les animations »), pause hors écran, bouton pause/lecture
    const vid = $(".hero video", main), tog = $(".hero__toggle", main);
    if (vid && tog) {
      let wanted = !matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sync = () => { tog.classList.toggle("is-paused", !wanted); tog.setAttribute("aria-label", wanted ? "Mettre la vidéo en pause" : "Lire la vidéo"); };
      const play = () => vid.play().catch(() => { wanted = false; sync(); });
      tog.addEventListener("click", () => { wanted = !wanted; wanted ? play() : vid.pause(); sync(); });
      if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { e.isIntersecting && wanted ? play() : vid.pause(); }).observe(vid);
      else if (wanted) play();
      sync();
    }

    // Onglets best-sellers
    $$("[data-tab]", main).forEach((b) => b.addEventListener("click", () => {
      $$("[data-tab]", main).forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); });
      const tabs = { sets: ["best-sets", "rail-best"], shoes: ["best-shoes", "rail-best-shoes"], women: ["best-women", "rail-best-women"], acc: ["best-acc", "rail-best-acc"] };
      Object.entries(tabs).forEach(([k, [box]]) => { $("#" + box).hidden = k !== b.dataset.tab; });
      $$("[data-rail]", main).forEach((r) => (r.dataset.rail = tabs[b.dataset.tab][1]));
    }));
    $("#news-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("#news-email").value.trim();
      $("#news-msg").style.color = "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { $("#news-msg").style.color = "var(--sale)"; $("#news-msg").textContent = "Entre une adresse e-mail valide, par exemple prenom@mail.com."; return; }
      $("#news-msg").textContent = "C'est noté. Tu recevras les prochains drops en avant-première.";
      e.target.reset();
    });
  }

  function brandTiles() {
    return Object.keys(BRANDS).map((b) => {
      const n = PRODUCTS.filter((p) => p.brand === b).length;
      return `<a class="brand" href="${L.shop({ brand: b })}"><span class="eyebrow">${esc(BRANDS[b].line || "")}</span><span class="brand__name">${esc(BRANDS[b].name)}</span><span class="brand__row"><span class="muted" style="font-size:var(--fs-sm)">${n} produit${n > 1 ? "s" : ""}</span>${I.right}</span></a>`;
    }).join("");
  }

  function viewBrands(main) {
    setMeta("Marques", "Toutes les marques disponibles sur BASE.");
    main.innerHTML = `<div class="wrap"><div class="shop-head"><nav class="crumbs" aria-label="Fil d'Ariane"><a href="${L.home}">Accueil</a><span>/</span><span>Marques</span></nav><h1 class="display">Marques</h1><p>Uniquement des pièces authentiques, achetées aux États-Unis.</p></div><div class="brands" style="margin-bottom:96px">${brandTiles()}</div></div>`;
  }

  /* =================== Boutique =================== */
  const PRICE_RANGES = [["0-150", "Moins de 150 €", 0, 150], ["150-200", "150 à 200 €", 150, 200], ["200-300", "200 à 300 €", 200, 300], ["300-9999", "Plus de 300 €", 300, 99999]];
  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];
  const sortSizes = (a, b) => (isNaN(a) || isNaN(b) ? SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b) : a - b);

  function viewShop(main, parts, q) {
    const st = {
      cat: q.get("cat") || "", filter: q.get("filter") || "", q: q.get("q") || "", g: q.get("g") || "", type: q.get("type") || "",
      brands: new Set((q.get("brand") || "").split(",").filter(Boolean)),
      sizes: new Set(), colors: new Set(), price: "", sort: "featured"
    };

    function base() {
      let l = PRODUCTS.slice();
      if (st.cat) l = l.filter((p) => p.category === st.cat);
      if (st.type) l = l.filter((p) => p.type === st.type);
      if (st.g) l = l.filter((p) => genderOk(p, st.g));
      if (st.filter === "new") l = l.filter(isNew);
      if (st.filter === "sale") l = l.filter(isSale);
      if (st.q) { const ids = new Set(search(st.q).map((p) => p.id)); l = l.filter((p) => ids.has(p.id)); }
      return l;
    }
    function filtered() {
      let l = base();
      if (st.brands.size) l = l.filter((p) => st.brands.has(p.brand));
      if (st.colors.size) l = l.filter((p) => st.colors.has(colorFamily(p)));
      if (st.price) { const r = PRICE_RANGES.find((x) => x[0] === st.price); l = l.filter((p) => p.price >= r[2] && p.price < r[3]); }
      if (st.sizes.size) l = l.filter((p) => availableSizes(p).some((s) => st.sizes.has(s)));
      const S = {
        featured: (a, b) => isBest(b) - isBest(a) || isNew(b) - isNew(a),
        new: (a, b) => isNew(b) - isNew(a),
        asc: (a, b) => a.price - b.price,
        desc: (a, b) => b.price - a.price
      };
      l.sort(S[st.sort]);
      l.sort((a, b) => isOut(a) - isOut(b));
      return l;
    }
    function heading() {
      const [h, d] = heading0();
      if (!st.g || st.q) return [h, d];
      return [h === "Tout le shop" ? GENDERS[st.g] : `${h} ${GENDERS[st.g]}`, st.g === "femme" ? "Ensembles, sneakers et accessoires pour femme, 100% authentiques." : "Ensembles, sneakers et accessoires pour homme, 100% authentiques."];
    }
    function heading0() {
      const b = st.brands.size === 1 ? BRANDS[[...st.brands][0]] : null;
      if (st.type && !st.q) return [TYPES[st.type] || "Accessoires", "Casquettes, bonnets, chaussettes et caleçons 100% authentiques."];
      if (st.q) return ["Recherche", `Résultats pour « ${st.q} »`];
      if (st.filter === "new") return ["Nouveautés", "Les dernières pièces arrivées des États-Unis."];
      if (st.filter === "sale") return ["Promos", "Pièces authentiques à prix réduit, dans la limite des tailles disponibles."];
      if (st.cat && b) return [`${CATS[st.cat].name} ${b.name}`, `Tous nos ${CATS[st.cat].name.toLowerCase()} ${b.name}, 100% authentiques.`];
      if (st.cat) return [CATS[st.cat].name, { ensembles: "Essentials (basiques et 1977), Ralph Lauren, On, Alo, Lululemon, UGG et Nocta. Haut et bas assortis, vendus ensemble.", chaussures: "On Cloudtilt, Cloudtilt Arc, Cloudtilt Remix et Cloudsurfer Max en Femme et Homme, Salomon XT-6, Asics GEL-1130 et Kayano 14, Mizuno Wave Prophecy LS et Alo Runner.", doudounes: "Doudounes C.P. Company, garnissage duvet.", accessoires: "Casquettes Sweet Pants, Courrèges, Alo District Trucker, Columbia, bonnets C.P. Company, Ralph Lauren, Sweet Pants, chaussettes et caleçons Alo et Lululemon." }[st.cat]];
      if (b) return [b.name, `Toute la sélection ${b.name}, 100% authentique.`];
      return ["Tout le shop", "Ensembles, sneakers et doudounes 100% authentiques, importés des États-Unis."];
    }
    function syncHash() {
      const o = { cat: st.cat, type: st.type, g: st.g, filter: st.filter, brand: [...st.brands].join(","), q: st.q };
      const h = L.shop(o);
      if (location.hash !== h) { try { history.replaceState(null, "", h); } catch (e) { /* navigateur restreint */ } }
    }
    function filtersHTML(pool) {
      const brandKeys = Object.keys(BRANDS).filter((k) => pool.some((p) => p.brand === k) || st.brands.has(k));
      const sizes = [...new Set(pool.flatMap((p) => p.sizes))].sort(sortSizes);
      const fams = Object.keys(FAMILY_SW).filter((f) => pool.some((p) => colorFamily(p) === f));
      const types = Object.keys(TYPES).filter((t) => pool.some((p) => p.type === t));
      return `
        <details class="fgroup" open><summary>Genre</summary><div class="opts">${[["", "Tous"], ["femme", "Femme"], ["homme", "Homme"]].map(([k, t]) => `<label class="fopt"><input type="radio" name="g-${Math.random().toString(36).slice(2, 6)}" data-f="g" value="${k}" ${st.g === k ? "checked" : ""}> ${t}</label>`).join("")}</div></details>
        ${types.length > 1 || st.type ? `<details class="fgroup" open><summary>Type</summary><div class="opts">${[["", "Tous"]].concat(types.map((t) => [t, TYPES[t]])).map(([k, t]) => `<label class="fopt"><input type="radio" name="t-${Math.random().toString(36).slice(2, 6)}" data-f="type" value="${k}" ${st.type === k ? "checked" : ""}> ${t}</label>`).join("")}</div></details>` : ""}
        <details class="fgroup" open><summary>Marque</summary><div class="opts">${brandKeys.map((k) => `<label class="fopt"><input type="checkbox" data-f="brand" value="${k}" ${st.brands.has(k) ? "checked" : ""}> ${esc(BRANDS[k].name)} <span class="n">${pool.filter((p) => p.brand === k).length}</span></label>`).join("")}</div></details>
        <details class="fgroup" open><summary>Taille disponible</summary><div class="fsizes">${sizes.map((s) => `<button type="button" data-f="size" data-v="${esc(s)}" class="${st.sizes.has(s) ? "is-on" : ""}" aria-pressed="${st.sizes.has(s)}">${esc(s)}</button>`).join("")}</div></details>
        <details class="fgroup" open><summary>Couleur</summary><div class="fcolors">${fams.map((f) => `<button type="button" data-f="color" data-v="${f}" class="${st.colors.has(f) ? "is-on" : ""}" aria-pressed="${st.colors.has(f)}"><span class="sw" style="background:${FAMILY_SW[f]}"></span>${f}</button>`).join("")}</div></details>
        <details class="fgroup" open><summary>Prix</summary><div class="opts">${PRICE_RANGES.map(([k, t]) => `<label class="fopt"><input type="radio" name="price-${Math.random().toString(36).slice(2, 6)}" data-f="price" value="${k}" ${st.price === k ? "checked" : ""}> ${t}</label>`).join("")}</div></details>`;
    }
    function activeHTML() {
      const pills = [];
      st.brands.forEach((b) => pills.push(["brand", b, BRANDS[b].name]));
      st.sizes.forEach((s) => pills.push(["size", s, "Taille " + s]));
      st.colors.forEach((c) => pills.push(["color", c, c]));
      if (st.price) pills.push(["price", st.price, PRICE_RANGES.find((r) => r[0] === st.price)[1]]);
      if (st.g) pills.push(["g", st.g, GENDERS[st.g]]);
      if (st.type) pills.push(["type", st.type, TYPES[st.type]]);
      if (!pills.length) return "";
      return `<div class="active-filters">${pills.map(([f, v, t]) => `<button class="chip" type="button" data-rmf="${f}" data-v="${esc(v)}">${esc(t)} ${I.close}</button>`).join("")}<button class="link" type="button" data-clear style="font-size:var(--fs-sm)">Tout effacer</button></div>`;
    }

    function render() {
      const [h, d] = heading();
      setMeta(h, d);
      const pool = base();
      const list = filtered();
      $("#shop-title").textContent = h;
      $("#shop-desc").textContent = d;
      $("#crumb").textContent = h;
      const chips = [["", "", "Tout"], ["ensembles", "", "Ensembles"], ["chaussures", "", "Chaussures"], ["accessoires", "", "Accessoires"], ["doudounes", "", "Doudounes"], ["", "new", "Nouveautés"], ["", "sale", "Promos"]];
      $("#shop-chips").innerHTML = chips.map(([c, f, t]) => `<button class="chip${st.cat === c && st.filter === f && !st.q ? " is-on" : ""}" type="button" data-cat="${c}" data-filter="${f}">${t}</button>`).join("");
      const nActive = st.brands.size + st.sizes.size + st.colors.size + (st.price ? 1 : 0) + (st.g ? 1 : 0) + (st.type ? 1 : 0);
      $("#filters-btn").innerHTML = `${I.filter} Filtrer${nActive ? ` (${nActive})` : ""}`;
      $("#shop-count").textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
      const fh = filtersHTML(pool);
      $("#shop-filters").innerHTML = fh;
      $("#filters-body").innerHTML = fh;
      $("#filters-apply").textContent = `Voir ${list.length} produit${list.length > 1 ? "s" : ""}`;
      $("#shop-active").innerHTML = activeHTML();
      $("#shop-grid").innerHTML = list.length ? list.map(cardHTML).join("")
        : `<div class="empty"><p class="h-md">Aucun produit avec ces filtres</p><p class="muted">Essaie d'enlever un filtre ou de chercher un autre modèle.</p><button class="btn btn--ghost" type="button" data-clear>Effacer les filtres</button></div>`;
    }

    main.innerHTML = `
      <div class="wrap shop-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="${L.home}">Accueil</a><span>/</span><span id="crumb"></span></nav>
        <h1 class="display" id="shop-title"></h1>
        <p id="shop-desc"></p>
      </div>
      <div class="shop-bar"><div class="wrap">
        <div class="chips-row" id="shop-chips"></div>
        <div class="shop-bar__right">
          <span class="muted count tnum" id="shop-count" style="font-size:var(--fs-sm)"></span>
          <button class="chip filters-btn" type="button" id="filters-btn" data-open="filters"></button>
          <label class="sr-only" for="shop-sort">Trier par</label>
          <select class="select" id="shop-sort"><option value="featured">Recommandés</option><option value="new">Nouveautés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select>
        </div>
      </div></div>
      <div class="wrap shop">
        <aside class="filters" id="shop-filters" aria-label="Filtres"></aside>
        <div><div id="shop-active"></div><div class="grid grid--3" id="shop-grid"></div></div>
      </div>`;

    const onFilter = (e) => {
      const t = e.target.closest("[data-f]"); if (!t) return;
      const f = t.dataset.f;
      if (f === "brand") { t.checked ? st.brands.add(t.value) : st.brands.delete(t.value); syncHash(); }
      if (f === "price") st.price = t.value;
      if (f === "g" || f === "type") { st[f] = t.value; syncHash(); }
      if (f === "size" || f === "color") { const set = f === "size" ? st.sizes : st.colors; set.has(t.dataset.v) ? set.delete(t.dataset.v) : set.add(t.dataset.v); }
      render();
    };
    ["#shop-filters", "#filters-body"].forEach((s) => { $(s).onchange = onFilter; $(s).onclick = (e) => { if (e.target.closest("button[data-f]")) onFilter(e); }; });
    main.addEventListener("click", (e) => {
      const c = e.target.closest("#shop-chips .chip");
      if (c) { st.cat = c.dataset.cat; st.filter = c.dataset.filter; st.q = ""; if (st.cat !== "accessoires") st.type = ""; syncHash(); render(); return; }
      const r = e.target.closest("[data-rmf]");
      if (r) { const f = r.dataset.rmf, v = r.dataset.v; if (f === "brand") { st.brands.delete(v); syncHash(); } if (f === "size") st.sizes.delete(v); if (f === "color") st.colors.delete(v); if (f === "price") st.price = ""; if (f === "g" || f === "type") { st[f] = ""; syncHash(); } render(); return; }
      if (e.target.closest("[data-clear]")) { st.brands.clear(); st.sizes.clear(); st.colors.clear(); st.price = ""; st.g = ""; st.type = ""; syncHash(); render(); }
    });
    $("#shop-sort").addEventListener("change", (e) => { st.sort = e.target.value; render(); });
    render();
  }

  /* =================== Fiche produit =================== */
  function viewProduct(main, parts) {
    const p = byId(parts[1]);
    if (!p) return view404(main);
    pushRecent(p.id);
    setMeta(`${p.name} ${p.color}`, `${p.name} ${p.color} — 100% authentique, importé des États-Unis. ${p.description}`);
    const cat = CATS[p.category];
    const variants = variantsOf(p);
    const out = p.soldOutSizes || [];
    const low = p.lowStock || [];
    const views = p.images && p.images.length ? p.images.map((_, i) => i) : [0, 1, 2];
    const look = lookFor(p, 2);
    const related = onePerGroup(PRODUCTS.filter((x) => x.group !== p.group && (x.brand === p.brand || x.category === p.category))
      .sort((a, b) => (b.category === p.category) - (a.category === p.category) || (b.brand === p.brand) - (a.brand === p.brand) || isBest(b) - isBest(a))).slice(0, 8);
    const recent = store.get(RV_KEY, []).filter((id) => id !== p.id).map(byId).filter(Boolean).slice(0, 8);
    const unit = p.category === "chaussures" ? "EU" : p.category === "accessoires" ? "" : "US";
    const oneSize = p.sizes.length === 1;
    const soldOut = isOut(p);

    main.innerHTML = `
      <div class="wrap">
        <nav class="crumbs" aria-label="Fil d'Ariane" style="padding-block:16px"><a href="${L.home}">Accueil</a><span>/</span><a href="${L.shop({ cat: p.category })}">${cat.name}</a><span>/</span><a href="${L.shop({ cat: p.category, brand: p.brand })}">${esc(brandOf(p).name)}</a></nav>
        <div class="pdp">
          <div class="gallery-wrap">
            <div class="gallery" id="gallery">${views.map((v) => `<figure>${art(p, v)}</figure>`).join("")}</div>
            <span class="gallery__count" id="gallery-count">1 / ${views.length}</span>
          </div>
          <div class="buy">
            <div class="buy__head">
              <span class="buy__brand"><a href="${L.shop({ brand: p.brand })}">${esc(brandOf(p).name)}</a></span>
              <h1>${esc(p.name)}</h1>
              <div class="buy__price">${priceHTML(p)}${isSale(p) ? `<span class="badge badge--sale">-${pct(p)}%</span>` : ""}</div>
              ${CFG.installments > 1 ? `<span class="buy__small">ou ${CFG.installments} × ${moneyExact(p.price / CFG.installments)} sans frais</span>` : `<span class="buy__small">TVA incluse</span>`}
            </div>

            <div>
              <div class="opt-head"><span>Coloris : <b>${esc(p.color)}</b></span>${variants.length > 1 ? `<span class="muted">${variants.length} coloris</span>` : ""}</div>
              ${variants.length > 1 ? `<div class="variants">${variants.map((v) => `<a class="variant${v.id === p.id ? " is-on" : ""}" href="${L.product(v.id)}" title="${esc(v.color)}" aria-label="Coloris ${esc(v.color)}"${v.id === p.id ? ' aria-current="true"' : ""}>${art(v)}</a>`).join("")}</div>` : ""}
            </div>

            <div>
              <div class="opt-head"><b>${oneSize ? "Taille unique" : unit ? `Taille (${unit})` : "Taille"}</b>${oneSize ? "" : `<button class="link" type="button" data-guide="${esc(p.category)}" style="font-size:var(--fs-sm)">Guide des tailles</button>`}</div>
              <div class="sizes" id="sizes" role="radiogroup" aria-label="Taille">${p.sizes.map((s) => {
                const o = soldOut || out.includes(s);
                return `<button type="button" class="size${o ? " is-out" : ""}${!o && low.includes(s) ? " is-low" : ""}${oneSize && !o ? " is-on" : ""}" data-size="${esc(s)}" role="radio" aria-checked="${oneSize && !o}" ${o ? 'aria-disabled="true"' : ""} aria-label="Taille ${esc(s)}${o ? ", épuisée" : low.includes(s) ? ", dernières pièces" : ""}">${s === "TU" ? "Unique" : esc(s)}</button>`;
              }).join("")}</div>
              <p class="size-msg" id="size-msg" aria-live="polite">${low.length && !soldOut ? `<span class="muted">Point orange : dernières pièces dans cette taille.</span>` : ""}</p>
            </div>

            <div class="buy__ctas" id="buy-ctas">
              <button class="btn btn--block" type="button" id="atc" ${soldOut ? "disabled" : ""}>${soldOut ? "Rupture de stock" : `Ajouter au panier`}</button>
              ${CFG.whatsapp ? `<a class="btn btn--wa btn--block" id="wa-buy" href="#" target="_blank" rel="noopener">${I.wa} ${soldOut ? "Me prévenir du restock" : "Commander sur WhatsApp"}</a>` : ""}
            </div>

            <div class="perks">
              <div class="perk ok">${I.truck}<div><b>Livraison estimée entre le ${deliveryWindow()}</b><br><span class="muted">${CFG.freeShippingFrom ? (p.price >= CFG.freeShippingFrom ? "Livraison offerte sur cet article" : `Offerte dès ${money(CFG.freeShippingFrom)} d'achat`) : `Envoi suivi`}</span></div></div>
              <div class="perk">${I.shield}<div><b>100% authentique, garanti</b><br><span class="muted">Contrôlé avant envoi. Remboursé si non authentique.</span></div></div>
              <div class="perk">${I.ret}<div><b>Retours sous ${CFG.returnDays} jours</b><br><span class="muted">Article non porté, avec étiquettes.</span></div></div>
            </div>

            ${look.length ? `<div class="look"><span class="eyebrow">Complète le look</span>${look.map((x) => `<a class="look__item" href="${L.product(x.id)}"><div class="art">${art(x)}</div><div><div class="t">${esc(x.name)}</div><div class="s">${esc(x.color)}</div><div class="price" style="font-size:var(--fs-sm)">${priceHTML(x)}</div></div>${I.chev.replace("<svg", '<svg width="18" height="18"')}</a>`).join("")}</div>` : ""}

            <div class="acc">
              <details open><summary>Description</summary><div class="body"><p>${esc(p.description)}</p>${p.details ? `<ul class="dots">${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}</div></details>
              <details><summary>Authenticité</summary><div class="body"><p>Acheté aux États-Unis et contrôlé à la main avant l'envoi : étiquettes, coutures, matières, codes produit et boîte. Si un article n'était pas authentique, tu serais remboursé intégralement, livraison comprise.</p></div></details>
              <details><summary>Livraison & retours</summary><div class="body"><p>Expédition sous 24 à 48 h avec suivi, livraison en ${CFG.deliveryDays[0]} à ${CFG.deliveryDays[1]} jours ouvrés. ${CFG.freeShippingFrom ? `Livraison ${moneyExact(CFG.shippingPrice)}, offerte dès ${money(CFG.freeShippingFrom)}.` : ""}</p><p>Retour ou échange sous ${CFG.returnDays} jours, article non porté avec ses étiquettes.</p></div></details>
            </div>
          </div>
        </div>
      </div>

      ${related.length ? `<section class="band" style="padding-top:24px"><div class="wrap"><div class="sec-head"><div><h2 class="h-xl">Tu aimeras aussi</h2></div>${railCtrl("rail-rel")}</div>${railHTML("rail-rel", related)}</div></section>` : ""}
      ${recent.length ? `<section class="band" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><h2 class="h-md">Vus récemment</h2></div></div>${railHTML("rail-recent", recent)}</div></section>` : ""}
    `;

    let picked = oneSize && !soldOut ? p.sizes[0] : null;
    const msg = $("#size-msg");
    const atc = $("#atc");
    const wa = $("#wa-buy");
    function updateWA() {
      if (!wa) return;
      const txt = soldOut
        ? `Bonjour ${CFG.storeName} ! Pouvez-vous me prévenir quand ce produit revient en stock ?\n${p.name} — ${p.color}${picked ? `\nTaille : ${picked}` : ""}`
        : `Bonjour ${CFG.storeName} ! Je voudrais commander :\n${p.name} — ${p.color}\nTaille : ${picked || "à préciser"}\nPrix : ${moneyExact(p.price)}`;
      wa.href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`;
    }
    function setAtcLabel() { if (!soldOut) atc.textContent = picked ? `Ajouter au panier · ${money(p.price)}` : "Ajouter au panier"; }
    updateWA();

    $("#sizes").addEventListener("click", (e) => {
      const b = e.target.closest(".size"); if (!b) return;
      const s = b.dataset.size;
      if (b.classList.contains("is-out")) {
        msg.className = "size-msg";
        msg.innerHTML = CFG.whatsapp ? `Taille ${esc(s)} épuisée. <a class="link" target="_blank" rel="noopener" href="https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(`Bonjour ! Pouvez-vous me prévenir du restock de : ${p.name} — ${p.color}, taille ${s} ?`)}">Me prévenir du restock</a>` : `Taille ${esc(s)} épuisée.`;
        return;
      }
      picked = s;
      $$(".size", main).forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-checked", x === b); });
      if (low.includes(s)) { msg.className = "size-msg low"; msg.textContent = `Dernières pièces en ${s}`; }
      else { msg.className = "size-msg ok"; msg.textContent = `Taille ${s} en stock, prête à partir`; }
      setAtcLabel(); updateWA(); updateSticky();
    });
    atc.addEventListener("click", () => {
      if (!picked) {
        msg.className = "size-msg err"; msg.textContent = "Choisis ta taille pour ajouter au panier.";
        $("#sizes").animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], { duration: 260 });
        return;
      }
      addToCart(p.id, picked);
    });

    // Galerie mobile : compteur
    const gal = $("#gallery");
    gal.addEventListener("scroll", () => { const i = Math.round(gal.scrollLeft / gal.clientWidth); $("#gallery-count").textContent = `${i + 1} / ${views.length}`; }, { passive: true });

    // Barre d'achat collante (mobile)
    const sticky = $("#sticky-buy");
    function updateSticky() {
      sticky.innerHTML = `<div class="sticky-buy__info"><b>${esc(p.name)}</b><span class="price">${priceHTML(p)}</span></div><button class="btn btn--sm" type="button" id="sticky-atc" ${soldOut ? "disabled" : ""}>${soldOut ? "Rupture de stock" : picked ? `Ajouter · ${esc(picked)}` : "Choisir ma taille"}</button>`;
      $("#sticky-atc").onclick = () => { if (picked) addToCart(p.id, picked); else $("#sizes").scrollIntoView({ behavior: "smooth", block: "center" }); };
    }
    updateSticky();
    if ("IntersectionObserver" in window) {
      stickyObs = new IntersectionObserver(([en]) => {
        const on = !en.isIntersecting && en.boundingClientRect.top < 0;
        sticky.classList.toggle("is-on", on); sticky.setAttribute("aria-hidden", !on);
        document.body.classList.toggle("has-sticky-buy", on);
      });
      stickyObs.observe($("#buy-ctas"));
    }
  }
  let stickyObs = null;
  function stickyOff() {
    if (stickyObs) { stickyObs.disconnect(); stickyObs = null; }
    const s = $("#sticky-buy"); if (s) { s.classList.remove("is-on"); s.setAttribute("aria-hidden", "true"); }
    document.body.classList.remove("has-sticky-buy");
  }

  /* =================== Commande =================== */
  const DRAFT_KEY = "base_checkout_draft";
  function renderSummary() {
    const box = $("#summary"); if (!box) return;
    if (!Cart.items.length) { viewCheckout($("#main")); return; }
    box.innerHTML = `<h2 class="h-md">Ta commande</h2>${Cart.items.map((it, i) => lineHTML(it, i, false)).join("")}${totalsHTML()}
      <div class="foot-trust" style="justify-content:flex-start"><span>${I.shield} 100% authentique</span><span>${I.ret} Retours ${CFG.returnDays} j</span></div>`;
  }

  function viewCheckout(main) {
    setMeta("Commande", "Finalise ta commande BASE.");
    if (!Cart.items.length) {
      main.innerHTML = `<div class="wrap"><div class="empty" style="padding-block:96px"><h1 class="h-xl">Ton panier est vide</h1><p class="muted">Ajoute un article pour passer commande.</p><a class="btn" href="${L.shop()}">Découvrir le shop</a></div></div>`;
      return;
    }
    const d = store.get(DRAFT_KEY, {});
    const v = (k) => esc(d[k] || "");
    const channels = [
      CFG.whatsapp && ["whatsapp", "WhatsApp", "Réponse la plus rapide. On te confirme ta taille et t'envoie le lien de paiement.", I.wa],
      CFG.instagram && ["instagram", "Instagram", `Tu nous envoies ta commande en message privé à @${esc(CFG.instagram)}.`, I.ig],
      CFG.email && ["email", "E-mail", `Tu nous envoies ta commande à ${esc(CFG.email)}.`, I.mail]
    ].filter(Boolean);
    main.innerHTML = `<div class="wrap co">
      <form id="co-form" novalidate>
        <nav class="progress" aria-label="Étapes"><span>Panier</span>${I.chev}<b>Informations</b>${I.chev}<span>Confirmation</span></nav>
        <h1 class="h-xl" style="margin-bottom:8px">Commande</h1>
        <p class="muted" style="margin-bottom:8px">Pas de compte à créer. Ça prend une minute.</p>
        <div class="fieldset"><h2>Contact</h2><div class="fields">
          ${field("firstname", "Prénom", "given-name", v("firstname"))}${field("lastname", "Nom", "family-name", v("lastname"))}
          ${field("phone", "Téléphone", "tel", v("phone"), "tel")}${field("email", "E-mail", "email", v("email"), "email")}
        </div></div>
        <div class="fieldset"><h2>Livraison</h2><div class="fields">
          ${field("address", "Adresse", "street-address", v("address"), "text", "full")}
          ${field("zip", "Code postal", "postal-code", v("zip"))}${field("city", "Ville", "address-level2", v("city"))}
          <div class="field full"><label for="f-country">Pays</label><select id="f-country" name="country">${["France", "Belgique", "Suisse", "Luxembourg"].map((c) => `<option${d.country === c ? " selected" : ""}>${c}</option>`).join("")}</select></div>
          <div class="field full"><label for="f-notes">Note (optionnel)</label><textarea id="f-notes" name="notes" placeholder="Code d'entrée, précision sur une taille…">${v("notes")}</textarea></div>
        </div></div>
        <div class="fieldset"><h2>Envoyer ma commande par</h2>
          <div class="channels">${channels.map(([k, t, s, ic], i) => `<label class="channel"><input type="radio" name="channel" value="${k}" ${(d.channel ? d.channel === k : i === 0) ? "checked" : ""}><span><b>${t}</b><small>${s}</small></span>${ic}</label>`).join("")}</div>
          <p class="muted" style="font-size:var(--fs-sm)">Le paiement (carte, PayPal ou virement) se fait après la confirmation de ta taille. Tu ne paies rien maintenant.</p>
        </div>
        <button class="btn btn--block" type="submit">Valider ma commande · <span id="co-total">${moneyExact(Cart.total())}</span></button>
        <p class="muted" style="font-size:var(--fs-xs);margin-top:12px;text-align:center">En validant, tu acceptes nos <a class="link" href="${L.legal}">conditions de vente</a>.</p>
      </form>
      <aside class="summary" id="summary"></aside>
    </div>`;
    renderSummary();
    const form = $("#co-form");
    form.addEventListener("input", () => store.set(DRAFT_KEY, Object.fromEntries(new FormData(form))));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const rules = {
        firstname: [(x) => x.trim().length > 0, "Indique ton prénom."],
        lastname: [(x) => x.trim().length > 0, "Indique ton nom."],
        phone: [(x) => x.replace(/\D/g, "").length >= 9, "Indique un numéro de téléphone valide."],
        email: [(x) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim()), "Indique une adresse e-mail valide, par exemple prenom@mail.com."],
        address: [(x) => x.trim().length > 3, "Indique ton adresse (numéro et rue)."],
        zip: [(x) => /^\d{4,5}$/.test(x.trim()), "Le code postal doit contenir 4 ou 5 chiffres."],
        city: [(x) => x.trim().length > 1, "Indique ta ville."]
      };
      let first = null;
      Object.entries(rules).forEach(([k, [ok, m]]) => {
        const f = form.querySelector(`[name="${k}"]`).closest(".field");
        const good = ok(data[k] || "");
        f.classList.toggle("has-err", !good);
        f.querySelector(".err").textContent = good ? "" : m;
        if (!good && !first) first = f.querySelector("input");
      });
      if (first) { first.focus(); return; }
      const ref = "BASE-" + Date.now().toString(36).toUpperCase().slice(-6);
      const order = { ref, data, items: Cart.items.map((i) => ({ ...i })), subtotal: Cart.subtotal(), shipping: Cart.shipping(), total: Cart.total() };
      store.set("base_last_order", order);
      lastOrder = order;
      location.hash = "#/merci";
    });
  }
  function field(name, label, ac, val, type = "text", cls = "") {
    return `<div class="field ${cls}"><label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" autocomplete="${ac}" value="${val}" required><span class="err" aria-live="polite"></span></div>`;
  }

  let lastOrder = null;
  function orderText(o) {
    const lines = o.items.map((it) => { const p = byId(it.id); return `• ${it.qty} × ${p.name} — ${p.color} — Taille ${it.size} — ${moneyExact(p.price * it.qty)}`; });
    const d = o.data;
    return [`Commande ${o.ref}`, "", ...lines, "", `Sous-total : ${moneyExact(o.subtotal)}`, `Livraison : ${o.shipping ? moneyExact(o.shipping) : "Offerte"}`, `Total : ${moneyExact(o.total)}`, "",
      `${d.firstname} ${d.lastname}`, `Tél : ${d.phone}`, `E-mail : ${d.email}`, `${d.address}, ${d.zip} ${d.city}, ${d.country}`, d.notes ? `Note : ${d.notes}` : ""].filter((x, i, a) => !(x === "" && a[i - 1] === "")).join("\n").trim();
  }

  function viewDone(main) {
    const o = lastOrder || store.get("base_last_order", null);
    setMeta("Confirmation", "");
    if (!o) { main.innerHTML = `<div class="wrap"><div class="empty" style="padding-block:96px"><h1 class="h-xl">Aucune commande en cours</h1><a class="btn" href="${L.shop()}">Découvrir le shop</a></div></div>`; return; }
    const txt = orderText(o);
    const ch = o.data.channel || "whatsapp";
    const href = ch === "whatsapp" ? `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`
      : ch === "instagram" ? `https://ig.me/m/${CFG.instagram}`
      : `mailto:${CFG.email}?subject=${encodeURIComponent("Commande " + o.ref)}&body=${encodeURIComponent(txt)}`;
    const label = ch === "whatsapp" ? `${I.wa} Envoyer sur WhatsApp` : ch === "instagram" ? `${I.ig} Ouvrir Instagram` : `${I.mail} Envoyer par e-mail`;
    main.innerHTML = `<div class="wrap"><div class="done">
      <nav class="progress" aria-label="Étapes"><span>Panier</span>${I.chev}<span>Informations</span>${I.chev}<b>Confirmation</b></nav>
      <span class="eyebrow">Commande ${esc(o.ref)}</span>
      <h1 class="display">Plus qu'une étape.</h1>
      <p style="font-size:1.0625rem;color:var(--ink-2)">${ch === "instagram" ? `Copie le récapitulatif ci-dessous et envoie-le en message privé à <b>@${esc(CFG.instagram)}</b>.` : `Envoie le message pré-rempli ci-dessous${ch === "email" ? ` à <b>${esc(CFG.email)}</b>` : ""}. On te confirme ta taille et on t'envoie le lien de paiement.`}</p>
      <div class="done__card">
        <div class="send-row">
          <a class="btn btn--block" id="send-order" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>
          <button class="btn btn--ghost btn--block" type="button" id="copy-order">Copier le récapitulatif</button>
        </div>
        <pre class="recap" id="recap">${esc(txt)}</pre>
        ${ch !== "whatsapp" && CFG.whatsapp ? `<p class="muted" style="font-size:var(--fs-sm)">Tu peux aussi l'envoyer sur WhatsApp au <b class="tnum">+${esc(CFG.whatsapp)}</b>.</p>` : ""}
      </div>
      <div class="perks">
        <div class="perk ok">${I.truck}<div><b>Livraison estimée entre le ${deliveryWindow()}</b><br><span class="muted">Après confirmation du paiement.</span></div></div>
        <div class="perk">${I.shield}<div><b>100% authentique, garanti</b></div></div>
      </div>
      <a class="link" href="${L.shop()}">Continuer mes achats</a>
    </div></div>`;
    const clearAfterSend = () => { if (Cart.items.length) { Cart.clear(); try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ } } };
    $("#send-order").addEventListener("click", clearAfterSend);
    $("#copy-order").addEventListener("click", () => {
      const done = () => { toast("Récapitulatif copié"); clearAfterSend(); };
      const fallback = () => { const r = document.createRange(); r.selectNodeContents($("#recap")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Texte sélectionné : copie-le avec Ctrl+C ou un appui long"); };
      try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (e) { fallback(); }
    });
  }

  /* =================== Aide & mentions =================== */
  const FAQ = [
    ["authenticite", "Vos produits sont-ils vraiment authentiques ?", "Oui, 100%. Chaque pièce est achetée aux États-Unis par notre fournisseur, puis contrôlée à la main avant l'envoi : étiquettes, coutures, matières, codes produit et boîte. Si un article n'était pas authentique, tu serais remboursé intégralement, livraison comprise."],
    ["commande", "Comment se passe une commande ?", "Ajoute tes articles au panier, remplis tes coordonnées, puis envoie le récapitulatif par WhatsApp, Instagram ou e-mail. On te confirme la disponibilité de ta taille et on t'envoie un lien de paiement sécurisé. Ta commande part dès réception du paiement."],
    ["livraison", "Quels sont les délais et frais de livraison ?", `Expédition sous 24 à 48 h après paiement, avec suivi. Livraison en ${CFG.deliveryDays[0]} à ${CFG.deliveryDays[1]} jours ouvrés. ${CFG.freeShippingFrom ? `La livraison coûte ${moneyExact(CFG.shippingPrice)} et elle est offerte dès ${money(CFG.freeShippingFrom)} d'achat.` : ""}`],
    ["retours", "Puis-je retourner ou échanger un article ?", `Oui, sous ${CFG.returnDays} jours après réception, pour un article non porté, avec ses étiquettes et dans son emballage d'origine. Écris-nous pour lancer le retour ou l'échange de taille.`],
    ["tailles", "Comment choisir ma taille ?", "Les vêtements sont en tailles US, les chaussures en pointures EU. Essentials et Alo ont une coupe oversize : prends ta taille habituelle pour un rendu ample. Un guide des tailles est disponible sur chaque fiche produit, et on peut te conseiller sur WhatsApp."],
    ["paiement", "Quels moyens de paiement acceptez-vous ?", "Carte bancaire, PayPal, Apple Pay et virement. Tu ne paies qu'une fois ta taille confirmée."],
    ["officiel", "Êtes-vous un revendeur officiel des marques ?", `Non. ${CFG.storeName} est un revendeur indépendant, non affilié, non sponsorisé et non autorisé officiellement par les marques présentées. Les produits sont authentiques et achetés aux États-Unis.`]
  ];
  const faqItem = ([id, q, a], i, arr, openId) => `<details id="faq-${id}"${openId === id ? " open" : ""}><summary>${esc(q)}</summary><div class="ans"><p>${esc(a)}</p></div></details>`;

  function viewFaq(main, parts, q) {
    setMeta("Aide & contact", "Authenticité, livraison, retours, tailles : toutes les réponses.");
    const openId = q.get("q");
    main.innerHTML = `<div class="wrap">
      <div class="shop-head"><nav class="crumbs" aria-label="Fil d'Ariane"><a href="${L.home}">Accueil</a><span>/</span><span>Aide</span></nav><h1 class="display">Aide</h1></div>
      <div class="two-col" style="padding-bottom:96px">
        <div style="display:grid;gap:14px;align-content:start" id="faq-contact">
          <h2 class="h-md">Nous contacter</h2>
          <p class="muted">Une question sur une taille, un délai ou une commande ? On répond vite.</p>
          ${CFG.whatsapp ? `<a class="btn" href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener">${I.wa} WhatsApp</a><p class="muted tnum" style="font-size:var(--fs-sm)">+${esc(CFG.whatsapp)}</p>` : ""}
          ${CFG.instagram ? `<a class="btn btn--ghost" href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener">${I.ig} @${esc(CFG.instagram)}</a>` : ""}
          ${CFG.email ? `<p style="font-size:var(--fs-sm)">E-mail : <b style="user-select:all">${esc(CFG.email)}</b></p>` : ""}
        </div>
        <div class="faq">${FAQ.map((f, i, a) => faqItem(f, i, a, openId)).join("")}</div>
      </div>
    </div>`;
    if (openId) { const el = openId === "contact" ? $("#faq-contact") : $("#faq-" + openId); if (el) setTimeout(() => el.scrollIntoView({ block: "center" }), 50); }
  }

  function viewLegal(main) {
    setMeta("Mentions légales & CGV", "");
    main.innerHTML = `<div class="wrap">
      <div class="shop-head"><nav class="crumbs" aria-label="Fil d'Ariane"><a href="${L.home}">Accueil</a><span>/</span><span>Mentions légales</span></nav><h1 class="h-xl">Mentions légales & CGV</h1></div>
      <div class="prose">
        <p><b>À compléter avant la mise en ligne</b> (remplace les crochets par tes informations).</p>
        <h2>Éditeur du site</h2><p>[Nom ou raison sociale] · [Statut : micro-entreprise, SAS…] · SIRET [numéro] · [Adresse] · [E-mail]</p>
        <h2>Hébergement</h2><p>[Nom et adresse de l'hébergeur]</p>
        <h2>Marques</h2><p>${esc(CFG.storeName)} est un revendeur indépendant, non affilié, non sponsorisé et non autorisé officiellement par les marques présentées. Fear of God Essentials, Ralph Lauren, On, Alo, Lululemon, UGG, Nocta, Salomon, Mizuno, Asics, Sweet Pants, Courrèges, Columbia et C.P. Company sont des marques de leurs propriétaires respectifs, citées uniquement pour désigner les produits authentiques revendus.</p>
        <h2>Produits et prix</h2><p>Les produits sont neufs et authentiques. Les prix sont indiqués en euros TTC, hors frais de livraison.</p>
        <h2>Commande et paiement</h2><p>La commande est définitive après confirmation de la disponibilité et réception du paiement.</p>
        <h2>Livraison</h2><p>Expédition sous 24 à 48 h après paiement, livraison en ${CFG.deliveryDays[0]} à ${CFG.deliveryDays[1]} jours ouvrés.</p>
        <h2>Droit de rétractation</h2><p>Tu disposes de 14 jours à compter de la réception pour exercer ton droit de rétractation. L'article doit être retourné non porté, avec ses étiquettes et dans son emballage d'origine.</p>
        <h2>Données personnelles</h2><p>Les informations saisies servent uniquement à traiter et livrer ta commande. Elles ne sont jamais revendues. Pour y accéder ou les supprimer, contacte-nous.</p>
      </div>
    </div>`;
  }

  function view404(main) {
    setMeta("Page introuvable", "");
    main.innerHTML = `<div class="wrap"><div class="empty" style="padding-block:120px"><span class="eyebrow">Erreur 404</span><h1 class="h-xl">Cette page n'existe pas</h1><p class="muted">Le produit a peut-être été retiré. Les best-sellers, eux, sont toujours là.</p><a class="btn" href="${L.shop()}">Voir le shop</a></div></div>`;
  }

  /* =================== Événements globaux =================== */
  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const o = t.closest("[data-open]");
      if (o) { e.preventDefault(); open(o.dataset.open); return; }
      if (t.closest("[data-close]")) { closeAll(); return; }
      const qa = t.closest("[data-quick-add]");
      if (qa) { e.preventDefault(); addToCart(qa.dataset.quickAdd, qa.dataset.size); return; }
      const qs2 = t.closest("[data-quick-sheet]");
      if (qs2) { e.preventDefault(); openSheet(qs2.dataset.quickSheet); return; }
      const g = t.closest("[data-guide]");
      if (g) { $("#guide-body").innerHTML = guideHTML(g.dataset.guide); open("guide"); return; }
      const q = t.closest("[data-qty]");
      if (q) { const i = +q.dataset.qty; Cart.setQty(i, Cart.items[i].qty + +q.dataset.d); return; }
      const r = t.closest("[data-rm]");
      if (r) { Cart.setQty(+r.dataset.rm, 0); return; }
      const rl = t.closest("[data-rail]");
      if (rl) { const el = document.getElementById(rl.dataset.rail); if (el) el.scrollBy({ left: el.clientWidth * 0.9 * +rl.dataset.dir, behavior: "smooth" }); return; }
      const s = t.closest("[data-search]");
      if (s) { $("#search-input").value = s.dataset.search; runSearch(); return; }
      // Un clic sur un lien interne ferme les panneaux
      const a = t.closest('a[href^="#/"]');
      if (a && a.getAttribute("href") === location.hash) { closeAll(true); window.scrollTo(0, 0); }
    });
    // Survol des pastilles : aperçu du coloris
    document.addEventListener("mouseover", (e) => {
      const sw = e.target.closest("[data-sw]"); if (!sw) return;
      const card = sw.closest(".card"); if (!card) return;
      const v = byId(sw.dataset.sw); if (!v) return;
      const media = card.querySelector(".card__media");
      if (media.dataset.showing === v.id) return;
      media.dataset.showing = v.id;
      media.href = L.product(v.id);
      media.innerHTML = `<div class="badges">${badgesHTML(v)}</div>${art(v, 0)}`;
      card.querySelector(".card__name a").href = L.product(v.id);
      card.querySelector(".card__meta").textContent = v.color;
      card.querySelector(".price").innerHTML = priceHTML(v);
      $$(".sw", card).forEach((x) => x.classList.toggle("is-on", x === sw));
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
    $("#search-input").addEventListener("input", runSearch);
    $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#search-input").value.trim(); if (v) location.hash = L.shop({ q: v }); });
    window.addEventListener("hashchange", go);
  }
  function runSearch() {
    const v = $("#search-input").value.trim();
    const res = v.length < 2 ? [] : onePerGroup(search(v)).slice(0, 8);
    $("#search-results").innerHTML = v.length < 2 ? "" : res.length
      ? res.map(miniHTML).join("") + `<a class="link" style="grid-column:1/-1" href="${L.shop({ q: v })}">Voir les ${search(v).length} résultats pour « ${esc(v)} »</a>`
      : `<p class="muted" style="grid-column:1/-1">Aucun résultat pour « ${esc(v)} ». Essaie une marque, comme Essentials ou Salomon.</p>`;
  }

  /* =================== Démarrage =================== */
  function start() {
    shell();
    bind();
    renderCart();
    go();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  window.BASE = { Cart, go };
})();
