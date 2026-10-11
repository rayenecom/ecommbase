/* ==========================================================
   BASE — Moteur du site (en-tête, panier, boutique, fiche
   produit, commande). Normalement tu n'as pas besoin de
   modifier ce fichier : édite config.js et products.js.
   ========================================================== */
(function () {
  "use strict";

  const CFG = window.BASE_CONFIG;
  const BRANDS = window.BASE_BRANDS;
  const CATS = window.BASE_CATEGORIES;
  const PRODUCTS = window.BASE_PRODUCTS;
  const CART_KEY = "base_cart_v1";

  /* ---------------- Utilitaires ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => new Intl.NumberFormat(CFG.locale, { style: "currency", currency: CFG.currency }).format(n);
  const params = () => new URLSearchParams(location.search);
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const brandName = (p) => (BRANDS[p.brand] ? BRANDS[p.brand].name : p.brand);
  const isNew = (p) => (p.tags || []).includes("new");
  const isBest = (p) => (p.tags || []).includes("best");
  const isSale = (p) => p.oldPrice && p.oldPrice > p.price;
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* stockage indisponible */ } }
  };

  /* ---------------- Icônes ---------------- */
  const ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 14 3 11l1.5-1.5L11 11l5-5c1-1 2.5-1 3 0s0 2-1 3l-5 5 1.5 6.5L13 22l-3-7Z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="11"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    return: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="m8 5-4 4 4 4"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H8l-4 4V5Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v3a7 7 0 0 1-3.8-1.2v6.1A5.8 5.8 0 1 1 10.7 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>'
  };

  /* ---------------- Visuels provisoires ----------------
     Tant que tu n'as pas ajouté de photo à un produit,
     un visuel sobre est généré automatiquement.          */
  function tone(color) {
    const c = norm(color || "");
    if (/black|noir|eclipse|magnet/.test(c)) return { fill: "#1b1b1b", line: "#3a3a3a" };
    if (/navy|marine/.test(c)) return { fill: "#1f2a44", line: "#33405e" };
    if (/olive|ivy|green|vert/.test(c)) return { fill: "#565c45", line: "#6e755a" };
    if (/oatmeal|sand|bone|cream|ivory|vanilla|almond|taupe|beige/.test(c)) return { fill: "#d8cbb5", line: "#bfb097" };
    if (/silver|lunar|oyster/.test(c)) return { fill: "#c3c5c8", line: "#a5a8ac" };
    if (/white|blanc/.test(c)) return { fill: "#f7f7f5", line: "#cfcfcb" };
    if (/grey|gris|heather/.test(c)) return { fill: "#9c9c9a", line: "#828280" };
    if (/brown|clay/.test(c)) return { fill: "#8a6a4f", line: "#735740" };
    return { fill: "#8d8d8b", line: "#727270" };
  }

  function shapes(category, t) {
    const s = `fill="${t.fill}" stroke="${t.line}" stroke-width="3" stroke-linejoin="round"`;
    if (category === "chaussures") {
      return `
        <g transform="translate(0 30)">
          <path d="M84 372c-8-34-8-62 4-80 14-20 38-24 58-16 20 8 38 12 58-2l52-50c12-11 30-11 42 0l44 42c46 40 102 58 158 70 30 7 48 30 46 58v8H86Z" ${s}/>
          <path d="M70 370h486c8 0 12 8 9 15l-4 10c-6 16-20 25-36 25H96c-18 0-32-13-34-30l-1-8c0-7 3-12 9-12Z" fill="#f6f6f4" stroke="${t.line}" stroke-width="3"/>
          <path d="M66 394h494" stroke="${t.line}" stroke-width="2" opacity=".6"/>
          <path d="M276 246l22 22M300 232l22 22M324 222l20 22M348 228l18 20" stroke="${t.line}" stroke-width="6" stroke-linecap="round" opacity=".9"/>
          <path d="M96 352c74-4 150-20 214-70 54 44 130 70 232 78" fill="none" stroke="${t.line}" stroke-width="3" opacity=".7"/>
          <path d="M88 300c-10 18-12 44-6 70" fill="none" stroke="${t.line}" stroke-width="10" stroke-linecap="round" opacity=".5"/>
        </g>`;
    }
    if (category === "doudounes") {
      return `
        <g>
          <path d="M250 130c0-26 100-26 100 0l70 30c30 12 50 40 54 72l20 210c2 16-10 28-26 28h-30l-6-150-12 180H180l-12-180-6 150h-30c-16 0-28-12-26-28l20-210c4-32 24-60 54-72l70-30Z" ${s}/>
          <path d="M300 150v370" stroke="${t.line}" stroke-width="4"/>
          <path d="M175 230h250M170 300h260M168 370h264M168 440h264" stroke="${t.line}" stroke-width="3" opacity=".8"/>
          <path d="M250 130c10 40 90 40 100 0" fill="none" stroke="${t.line}" stroke-width="3"/>
          <circle cx="300" cy="118" r="0"/>
        </g>`;
    }
    // Ensemble : sweat à capuche + jogging
    return `
      <g transform="translate(-6 0)">
        <path d="M185 120c0-30 70-30 70 0l48 22c22 10 36 30 40 54l18 130c2 12-8 22-20 22h-14l-8-70v196H139V278l-8 70h-14c-12 0-22-10-20-22l18-130c4-24 18-44 40-54l30-22Z" ${s}/>
        <path d="M185 120c0 44 70 44 70 0" fill="none" stroke="${t.line}" stroke-width="3"/>
        <path d="M168 380h104v34H168z" fill="none" stroke="${t.line}" stroke-width="3" opacity=".8"/>
        <path d="M206 160l-6 60M234 160l6 60" stroke="${t.line}" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g transform="translate(6 0)">
        <path d="M368 170h126l14 300c0 10-8 16-16 16h-38l-20-220-20 220h-38c-8 0-16-6-16-16Z" ${s}/>
        <path d="M368 196h126" stroke="${t.line}" stroke-width="3"/>
        <path d="M372 456h52M440 456h52" stroke="${t.line}" stroke-width="6" stroke-linecap="round" opacity=".7"/>
      </g>`;
  }

  function placeholder(p, variant = 0) {
    const brand = BRANDS[p.brand] || { name: p.brand, tint: "#ececea" };
    const t = tone(p.color);
    const bg = variant ? "#ecece9" : brand.tint;
    return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.name)}" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="600" fill="${bg}"/>
      <text x="300" y="${variant ? 560 : 96}" text-anchor="middle" font-family="Archivo, Inter, Arial, sans-serif" font-weight="900" font-size="${brand.name.length > 9 ? 58 : 76}" letter-spacing="-2" fill="#000" opacity=".07">${esc(brand.name.toUpperCase())}</text>
      <g ${variant ? 'transform="translate(600 0) scale(-1 1)"' : ""}>${shapes(p.category, t)}</g>
    </svg>`;
  }

  function productImage(p, i = 0, cls = "") {
    const imgs = p.images || [];
    if (imgs[i]) return `<img class="product-img ${cls}" src="${esc(imgs[i])}" alt="${esc(p.name)}" loading="lazy" data-pid="${esc(p.id)}" data-variant="${i ? 1 : 0}">`;
    return placeholder(p, i ? 1 : 0);
  }

  // Si une photo est introuvable, on affiche le visuel provisoire à la place.
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || !img.classList.contains("product-img")) return;
    const p = byId(img.dataset.pid);
    if (!p) return;
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:absolute;inset:0";
    if (img.classList.contains("img-alt")) { img.remove(); return; }
    wrap.innerHTML = placeholder(p, +img.dataset.variant);
    img.replaceWith(wrap.firstElementChild);
  }, true);

  /* ---------------- Carte produit ---------------- */
  function priceHTML(p) {
    if (isSale(p)) return `<span class="price-sale">${money(p.price)}</span><span class="price-old">${money(p.oldPrice)}</span>`;
    return `<span>${money(p.price)}</span>`;
  }

  function cardHTML(p) {
    const badges = [];
    if (p.soldOut) badges.push('<span class="badge badge--muted">Épuisé</span>');
    else if (isSale(p)) badges.push(`<span class="badge badge--sale">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>`);
    if (!p.soldOut && isNew(p)) badges.push('<span class="badge badge--dark">Nouveau</span>');
    else if (!p.soldOut && isBest(p)) badges.push('<span class="badge">Best-seller</span>');
    const alt = p.images && p.images[1] ? productImage(p, 1, "img-alt") : "";
    return `<a class="card${p.soldOut ? " is-soldout" : ""}" href="product.html?id=${encodeURIComponent(p.id)}">
      <div class="card__media">
        <div class="card__badges">${badges.join("")}</div>
        ${productImage(p, 0)}${alt}
        <span class="card__quick">${p.soldOut ? "Épuisé" : "Voir le produit"}</span>
      </div>
      <div>
        <div class="card__brand">${esc(brandName(p))}</div>
        <div class="card__name">${esc(p.name)}</div>
        <div class="card__price">${priceHTML(p)}</div>
      </div>
    </a>`;
  }

  /* ---------------- Panier ---------------- */
  const Cart = {
    items: store.get(CART_KEY, []).filter((i) => byId(i.id)),
    save() { store.set(CART_KEY, this.items); renderCart(); },
    add(id, size, qty = 1) {
      const found = this.items.find((i) => i.id === id && i.size === size);
      if (found) found.qty += qty; else this.items.push({ id, size, qty });
      this.save();
    },
    setQty(idx, qty) { if (qty <= 0) this.items.splice(idx, 1); else this.items[idx].qty = qty; this.save(); },
    clear() { this.items = []; this.save(); },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    subtotal() { return this.items.reduce((n, i) => n + byId(i.id).price * i.qty, 0); },
    shipping() {
      if (!this.items.length) return 0;
      if (CFG.freeShippingFrom && this.subtotal() >= CFG.freeShippingFrom) return 0;
      return CFG.shippingPrice;
    }
  };

  function cartLineHTML(item, idx, editable = true) {
    const p = byId(item.id);
    return `<div class="cart-item">
      <a class="cart-item__img" href="product.html?id=${encodeURIComponent(p.id)}">${productImage(p, 0)}</a>
      <div>
        <div class="cart-item__brand">${esc(brandName(p))}</div>
        <div class="cart-item__name">${esc(p.name)}</div>
        <div class="cart-item__meta">Taille : ${esc(item.size)}${editable ? "" : ` · Qté : ${item.qty}`}</div>
        <div class="cart-item__row">
          ${editable ? `<div class="qty"><button data-qty="${idx}" data-d="-1" aria-label="Retirer un">−</button><span>${item.qty}</span><button data-qty="${idx}" data-d="1" aria-label="Ajouter un">+</button></div>` : ""}
          <strong>${money(p.price * item.qty)}</strong>
        </div>
        ${editable ? `<button class="cart-remove" data-remove="${idx}">Supprimer</button>` : ""}
      </div>
    </div>`;
  }

  function shipProgressHTML() {
    if (!CFG.freeShippingFrom) return "";
    const left = CFG.freeShippingFrom - Cart.subtotal();
    const pct = Math.min(100, (Cart.subtotal() / CFG.freeShippingFrom) * 100);
    const txt = left > 0 ? `Plus que <strong>${money(left)}</strong> pour profiter de la livraison offerte` : "<strong>Bravo !</strong> La livraison est offerte 🎉";
    return `<div class="ship-progress">${txt}<div class="ship-progress__bar"><i style="width:${pct}%"></i></div></div>`;
  }

  function renderCart() {
    $$(".cart-count").forEach((el) => { el.textContent = Cart.count(); el.dataset.count = Cart.count(); });
    $$(".cart-count-inline").forEach((el) => { el.textContent = Cart.count(); });
    const body = $("#cart-body"), foot = $("#cart-foot");
    if (!body) return;
    if (!Cart.items.length) {
      body.innerHTML = `<div class="cart-empty"><p>Ton panier est vide.</p><a class="btn" href="shop.html">Découvrir la boutique</a></div>`;
      foot.hidden = true;
    } else {
      body.innerHTML = shipProgressHTML() + Cart.items.map((it, i) => cartLineHTML(it, i)).join("");
      foot.hidden = false;
      $("#cart-subtotal").textContent = money(Cart.subtotal());
    }
    if (document.body.dataset.page === "checkout") renderCheckoutSummary();
  }

  /* ---------------- Tiroirs ---------------- */
  function openDrawer(id) {
    $$(".drawer.is-open, .search-panel.is-open").forEach((d) => d.classList.remove("is-open"));
    $(id).classList.add("is-open");
    $("#overlay").classList.add("is-open");
    document.body.classList.add("no-scroll");
  }
  function closeDrawers() {
    $$(".drawer.is-open, .search-panel.is-open").forEach((d) => d.classList.remove("is-open"));
    $("#overlay").classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  /* ---------------- En-tête & pied de page ---------------- */
  function brandsIn(cat) {
    return Object.keys(BRANDS).filter((b) => PRODUCTS.some((p) => p.brand === b && p.category === cat));
  }

  function renderChrome() {
    const ann = CFG.announcements.map((a) => `<span>${esc(a)}</span>`).join("");
    const megaFor = (cat) => `<div class="mega"><a href="shop.html?cat=${cat}"><strong>Tout voir</strong></a>${brandsIn(cat).map((b) => `<a href="shop.html?cat=${cat}&brand=${b}">${esc(CATS[cat].replace(/s$/, ""))} ${esc(BRANDS[b].name)}</a>`).join("")}</div>`;
    const brandLinks = Object.keys(BRANDS).map((b) => `<a href="shop.html?brand=${b}">${esc(BRANDS[b].name)}</a>`).join("");
    const page = document.body.dataset.page;

    $("#site-header").outerHTML = `
      <div class="announcement" role="region" aria-label="Annonces"><div class="announcement__track">${ann}${ann}${ann}${ann}</div></div>
      <header class="header">
        <div class="container header__inner">
          <button class="icon-btn menu-toggle" data-open="#menu-drawer" aria-label="Menu">${ICON.menu}</button>
          <a class="logo" href="index.html" aria-label="${esc(CFG.storeName)} — Accueil"><span>${esc(CFG.storeName)}</span></a>
            <nav class="nav" aria-label="Navigation principale">
              <div class="nav__item"><a href="shop.html?filter=new">Nouveautés</a></div>
              <div class="nav__item"><a href="shop.html?cat=ensembles">Ensembles</a>${megaFor("ensembles")}</div>
              <div class="nav__item"><a href="shop.html?cat=chaussures">Chaussures</a>${megaFor("chaussures")}</div>
              <div class="nav__item"><a href="shop.html?cat=doudounes">Doudounes</a></div>
              <div class="nav__item"><a href="shop.html">Marques</a><div class="mega">${brandLinks}</div></div>
              <div class="nav__item"><a class="is-sale" href="shop.html?filter=sale">Promos</a></div>
            </nav>
          <div class="header__right">
            <button class="icon-btn" data-open="#search-panel" aria-label="Rechercher">${ICON.search}</button>
            <a class="icon-btn hide-mobile" href="faq.html" aria-label="Aide">${ICON.user}</a>
            <button class="icon-btn" data-open="#cart-drawer" aria-label="Panier">${ICON.bag}<span class="cart-count" data-count="0">0</span></button>
          </div>
        </div>
      </header>

      <div class="search-panel" id="search-panel" role="dialog" aria-label="Recherche">
        <div class="container">
          <form action="shop.html" method="get" role="search">
            ${ICON.search.replace("<svg", '<svg width="26" height="26"')}
            <input type="search" name="q" id="search-input" placeholder="Rechercher : Essentials, XT-6, Cloud…" autocomplete="off">
            <button type="button" class="icon-btn" data-close aria-label="Fermer">${ICON.close}</button>
          </form>
          <div class="search-results" id="search-results"></div>
        </div>
      </div>

      <div class="overlay" id="overlay" data-close></div>

      <aside class="drawer drawer--left" id="menu-drawer" aria-label="Menu">
        <div class="drawer__head"><span class="drawer__title">Menu</span><button class="icon-btn" data-close aria-label="Fermer">${ICON.close}</button></div>
        <div class="drawer__body mobile-nav">
          <a href="shop.html?filter=new">Nouveautés ${ICON.arrow}</a>
          <a href="shop.html?cat=ensembles">Ensembles ${ICON.arrow}</a>
          ${brandsIn("ensembles").map((b) => `<a class="sub" href="shop.html?cat=ensembles&brand=${b}">Ensembles ${esc(BRANDS[b].name)}</a>`).join("")}
          <a href="shop.html?cat=chaussures">Chaussures ${ICON.arrow}</a>
          ${brandsIn("chaussures").map((b) => `<a class="sub" href="shop.html?cat=chaussures&brand=${b}">Chaussures ${esc(BRANDS[b].name)}</a>`).join("")}
          <a href="shop.html?cat=doudounes">Doudounes ${ICON.arrow}</a>
          <a href="shop.html?filter=sale" style="color:var(--sale)">Promos ${ICON.arrow}</a>
          <a href="faq.html">Aide & FAQ ${ICON.arrow}</a>
        </div>
      </aside>

      <aside class="drawer drawer--right" id="cart-drawer" aria-label="Panier">
        <div class="drawer__head"><span class="drawer__title">Panier (<span class="cart-count-inline">0</span>)</span><button class="icon-btn" data-close aria-label="Fermer">${ICON.close}</button></div>
        <div class="drawer__body" id="cart-body"></div>
        <div class="drawer__foot" id="cart-foot" hidden>
          <div class="cart-total"><span>Sous-total</span><span id="cart-subtotal"></span></div>
          <p class="cart-note">Frais de livraison calculés à l'étape suivante.</p>
          <a class="btn btn--block" href="checkout.html">Commander</a>
          <button class="btn btn--outline btn--block" data-close>Continuer mes achats</button>
        </div>
      </aside>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      ${CFG.whatsapp && page !== "checkout" ? `<a class="wa-float" href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">${ICON.whatsapp}</a>` : ""}
    `;

    $("#site-footer").outerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <div class="logo">${esc(CFG.storeName)}</div>
              <p>${esc(CFG.tagline)} Ensembles et sneakers des plus grandes marques, vérifiés un par un avant chaque envoi.</p>
              <div class="socials">
                ${CFG.instagram ? `<a href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>` : ""}
                ${CFG.tiktok ? `<a href="https://www.tiktok.com/@${esc(CFG.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>` : ""}
                ${CFG.whatsapp ? `<a href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>` : ""}
              </div>
            </div>
            <div>
              <h4>Boutique</h4>
              <ul>
                <li><a href="shop.html?filter=new">Nouveautés</a></li>
                <li><a href="shop.html?cat=ensembles">Ensembles</a></li>
                <li><a href="shop.html?cat=chaussures">Chaussures</a></li>
                <li><a href="shop.html?cat=doudounes">Doudounes</a></li>
                <li><a href="shop.html?filter=sale">Promos</a></li>
              </ul>
            </div>
            <div>
              <h4>Marques</h4>
              <ul>${Object.keys(BRANDS).map((b) => `<li><a href="shop.html?brand=${b}">${esc(BRANDS[b].name)}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>Aide</h4>
              <ul>
                <li><a href="faq.html#authenticite">Authenticité</a></li>
                <li><a href="faq.html#livraison">Livraison</a></li>
                <li><a href="faq.html#retours">Retours & échanges</a></li>
                <li><a href="faq.html#tailles">Guide des tailles</a></li>
                <li><a href="faq.html#contact">Contact</a></li>
                <li><a href="legal.html">Mentions légales & CGV</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} ${esc(CFG.storeName)}. Revendeur indépendant, non affilié aux marques présentées.</span>
            <div class="payments"><span>VISA</span><span>MASTERCARD</span><span>PAYPAL</span><span>APPLE PAY</span><span>VIREMENT</span></div>
          </div>
        </div>
      </footer>`;

    // Lien actif dans la navigation
    const cat = params().get("cat");
    if (cat) $$(`.nav a[href="shop.html?cat=${cat}"]`).forEach((a) => a.classList.add("is-active"));

    // Ouvrir / fermer
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) {
        e.preventDefault();
        openDrawer(opener.dataset.open);
        if (opener.dataset.open === "#search-panel") setTimeout(() => $("#search-input").focus(), 200);
        return;
      }
      if (e.target.closest("[data-close]")) { closeDrawers(); return; }
      const q = e.target.closest("[data-qty]");
      if (q) { const i = +q.dataset.qty; Cart.setQty(i, Cart.items[i].qty + +q.dataset.d); return; }
      const r = e.target.closest("[data-remove]");
      if (r) Cart.setQty(+r.dataset.remove, 0);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawers(); });

    // Recherche instantanée
    $("#search-input").addEventListener("input", (e) => {
      const q = e.target.value.trim();
      const res = q.length < 2 ? [] : search(q).slice(0, 8);
      $("#search-results").innerHTML = res.map((p) => `<a href="product.html?id=${encodeURIComponent(p.id)}"><span class="thumb">${productImage(p)}</span><span><small>${esc(brandName(p))}</small>${esc(p.name)}</span><strong>${money(p.price)}</strong></a>`).join("")
        + (q.length >= 2 ? `<a class="link-underline" style="display:block" href="shop.html?q=${encodeURIComponent(q)}">Voir tous les résultats pour « ${esc(q)} »</a>` : "");
    });
  }

  function search(q) {
    const words = norm(q).split(/\s+/).filter(Boolean);
    return PRODUCTS.filter((p) => {
      const hay = norm([p.name, brandName(p), CATS[p.category], p.color].join(" "));
      return words.every((w) => hay.includes(w));
    });
  }

  /* ---------------- Page d'accueil ---------------- */
  function initHome() {
    const set = (id, list) => { const el = $(id); if (el) el.innerHTML = list.map(cardHTML).join(""); };
    set("#home-new", PRODUCTS.filter(isNew).slice(0, 8));
    set("#home-best", PRODUCTS.filter(isBest).slice(0, 8));
    set("#home-sets", PRODUCTS.filter((p) => p.category === "ensembles").slice(0, 8));
    set("#home-shoes", PRODUCTS.filter((p) => p.category === "chaussures").slice(0, 8));

    const brandStrip = $("#brand-strip");
    if (brandStrip) {
      const links = Object.keys(BRANDS).map((b) => `<a href="shop.html?brand=${b}">${esc(BRANDS[b].name)}</a>`).join("");
      brandStrip.innerHTML = links + links;
    }

    // Visuels des tuiles catégories
    $$("[data-cat-visual]").forEach((el) => {
      const p = PRODUCTS.find((x) => x.id === el.dataset.catVisual) || PRODUCTS.find((x) => x.category === el.dataset.cat);
      if (p) el.innerHTML = productImage(p, 0);
    });

    const nl = $("#newsletter-form");
    if (nl) nl.addEventListener("submit", (e) => {
      e.preventDefault();
      $("#newsletter-msg").textContent = "Merci ! Tu recevras nos prochains drops en avant-première.";
      nl.reset();
    });
  }

  /* ---------------- Boutique ---------------- */
  function initShop() {
    const sp = params();
    const state = {
      cat: sp.get("cat") || "",
      filter: sp.get("filter") || "",
      brands: new Set((sp.get("brand") || "").split(",").filter(Boolean)),
      sizes: new Set(),
      q: sp.get("q") || "",
      sort: "featured"
    };

    function base() {
      let list = PRODUCTS.slice();
      if (state.cat) list = list.filter((p) => p.category === state.cat);
      if (state.filter === "new") list = list.filter(isNew);
      if (state.filter === "sale") list = list.filter(isSale);
      if (state.q) { const ids = new Set(search(state.q).map((p) => p.id)); list = list.filter((p) => ids.has(p.id)); }
      return list;
    }

    function title() {
      if (state.q) return { h: `Recherche`, d: `Résultats pour « ${state.q} »` };
      if (state.filter === "new") return { h: "Nouveautés", d: "Les dernières pièces arrivées des États-Unis." };
      if (state.filter === "sale") return { h: "Promos", d: "Pièces authentiques à prix réduit, dans la limite des stocks." };
      const b = state.brands.size === 1 ? BRANDS[[...state.brands][0]] : null;
      if (state.cat && b) return { h: `${CATS[state.cat]} ${b.name}`, d: `Tous nos ${CATS[state.cat].toLowerCase()} ${b.name}, 100% authentiques.` };
      if (state.cat) return { h: CATS[state.cat], d: { ensembles: "Ensembles Essentials, Ralph Lauren, Alo, On, Salomon… 100% authentiques.", chaussures: "On, Salomon, Asics, Mizuno, Saucony, Alo — 100% authentiques.", doudounes: "Doudounes C.P. Company authentiques." }[state.cat] };
      if (b) return { h: b.name, d: `Toute la sélection ${b.name}, 100% authentique.` };
      return { h: "Tous les produits", d: "Ensembles et sneakers 100% authentiques, importés des États-Unis." };
    }

    function render() {
      const t = title();
      document.title = `${t.h} — ${CFG.storeName}`;
      $("#shop-title").textContent = t.h;
      $("#shop-desc").textContent = t.d;
      $("#crumb-current").textContent = t.h;

      // Chips catégories
      const chips = [["", "", "Tout"], ["ensembles", "", "Ensembles"], ["chaussures", "", "Chaussures"], ["doudounes", "", "Doudounes"], ["", "new", "Nouveautés"], ["", "sale", "Promos"]];
      $("#cat-chips").innerHTML = chips.map(([c, f, label]) => `<button class="chip${state.cat === c && state.filter === f && !state.q ? " is-active" : ""}" data-cat="${c}" data-filter="${f}">${label}</button>`).join("");

      const pool = base();
      // Filtres marques
      const brandKeys = Object.keys(BRANDS).filter((b) => pool.some((p) => p.brand === b) || state.brands.has(b));
      $("#filter-brands").innerHTML = brandKeys.map((b) => `<label><input type="checkbox" value="${b}" ${state.brands.has(b) ? "checked" : ""}> ${esc(BRANDS[b].name)} <span class="count">${pool.filter((p) => p.brand === b).length}</span></label>`).join("");
      // Filtres tailles
      const allSizes = [...new Set(pool.flatMap((p) => p.sizes))];
      const order = ["XS", "S", "M", "L", "XL", "XXL"];
      allSizes.sort((a, b) => (isNaN(a) || isNaN(b) ? order.indexOf(a) - order.indexOf(b) : a - b));
      $("#filter-sizes").innerHTML = allSizes.map((s) => `<label><input type="checkbox" value="${esc(s)}" ${state.sizes.has(s) ? "checked" : ""}> ${esc(s)}</label>`).join("");

      let list = pool;
      if (state.brands.size) list = list.filter((p) => state.brands.has(p.brand));
      if (state.sizes.size) list = list.filter((p) => !p.soldOut && p.sizes.some((s) => state.sizes.has(s) && !(p.soldOutSizes || []).includes(s)));
      const sorters = {
        featured: (a, b) => (isBest(b) - isBest(a)) || (isNew(b) - isNew(a)),
        new: (a, b) => isNew(b) - isNew(a),
        "price-asc": (a, b) => a.price - b.price,
        "price-desc": (a, b) => b.price - a.price,
        name: (a, b) => a.name.localeCompare(b.name)
      };
      list = list.slice().sort(sorters[state.sort]);
      list.sort((a, b) => !!a.soldOut - !!b.soldOut);

      $("#result-count").textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
      $("#shop-grid").innerHTML = list.length
        ? list.map(cardHTML).join("")
        : `<div class="empty-state" style="grid-column:1/-1"><p>Aucun produit ne correspond à ta recherche.</p><a class="btn btn--outline" href="shop.html">Voir tous les produits</a></div>`;
    }

    function syncURL() {
      const u = new URLSearchParams();
      if (state.cat) u.set("cat", state.cat);
      if (state.filter) u.set("filter", state.filter);
      if (state.brands.size) u.set("brand", [...state.brands].join(","));
      if (state.q) u.set("q", state.q);
      history.replaceState(null, "", "shop.html" + (u.toString() ? "?" + u : ""));
    }

    $("#cat-chips").addEventListener("click", (e) => {
      const c = e.target.closest(".chip"); if (!c) return;
      state.cat = c.dataset.cat; state.filter = c.dataset.filter; state.q = "";
      syncURL(); render();
    });
    $("#filter-brands").addEventListener("change", (e) => { e.target.checked ? state.brands.add(e.target.value) : state.brands.delete(e.target.value); syncURL(); render(); });
    $("#filter-sizes").addEventListener("change", (e) => { e.target.checked ? state.sizes.add(e.target.value) : state.sizes.delete(e.target.value); render(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
    $("#filter-toggle").addEventListener("click", () => $("#filters").classList.toggle("is-open"));
    $("#filter-reset").addEventListener("click", () => { state.brands.clear(); state.sizes.clear(); syncURL(); render(); });
    render();
  }

  /* ---------------- Fiche produit ---------------- */
  function initProduct() {
    const p = byId(params().get("id"));
    const root = $("#pdp");
    if (!p) {
      root.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><h1>Produit introuvable</h1><a class="btn" href="shop.html">Retour à la boutique</a></div>`;
      return;
    }
    document.title = `${p.name} — ${CFG.storeName}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", `${p.name} — 100% authentique. ${p.description}`);
    $("#crumb-cat").textContent = CATS[p.category];
    $("#crumb-cat").href = `shop.html?cat=${p.category}`;
    $("#crumb-current").textContent = p.name;

    const imgs = p.images && p.images.length ? p.images.map((_, i) => productImage(p, i)) : [placeholder(p, 0), placeholder(p, 1), placeholder(p, 0)];
    const soldOutSizes = p.soldOutSizes || [];
    const isShoe = p.category === "chaussures";
    const sizeGuide = isShoe
      ? `<table class="size-table"><tr><th>EU</th><th>US H</th><th>US F</th><th>CM</th></tr>${[["38", "5.5", "7", "24"], ["39", "6.5", "8", "24.5"], ["40", "7", "8.5", "25"], ["41", "8", "9.5", "26"], ["42", "8.5", "10", "26.5"], ["43", "9.5", "11", "27.5"], ["44", "10", "11.5", "28"], ["45", "11", "12.5", "29"]].map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table><p>Les correspondances varient selon les marques. En cas de doute, écris-nous.</p>`
      : `<table class="size-table"><tr><th>Taille</th><th>Tour de poitrine</th><th>Tour de taille</th></tr>${[["XS", "86-91", "71-76"], ["S", "91-96", "76-81"], ["M", "96-101", "81-86"], ["L", "101-106", "86-91"], ["XL", "106-111", "91-96"], ["XXL", "111-116", "96-101"]].map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table><p>Tailles US. Les ensembles Essentials taillent grand (coupe oversize).</p>`;

    root.innerHTML = `
      <div class="pdp__gallery">${imgs.map((h) => `<div class="g">${h}</div>`).join("")}</div>
      <div class="pdp__info">
        <div>
          <div class="pdp__brand"><a href="shop.html?brand=${p.brand}">${esc(brandName(p))}</a></div>
          <h1>${esc(p.name)}</h1>
        </div>
        <div>
          <div class="pdp__price">${priceHTML(p)}${isSale(p) ? `<span class="badge badge--sale">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ""}</div>
          <div class="pdp__tax">TVA incluse. Frais de livraison calculés à la commande.</div>
        </div>
        <div>
          <div class="pdp__label">Coloris <span>${esc(p.color)}</span></div>
        </div>
        <div>
          <div class="pdp__label">Taille ${isShoe ? "(EU)" : "(US)"} <span id="size-picked">Choisis ta taille</span></div>
          <div class="sizes" id="sizes">${p.sizes.map((s) => {
            const out = p.soldOut || soldOutSizes.includes(s);
            return `<button class="size${out ? " is-soldout" : ""}" data-size="${esc(s)}" ${out ? 'aria-disabled="true" title="Épuisé"' : ""}>${esc(s)}</button>`;
          }).join("")}</div>
          <div class="size-error" id="size-error"></div>
        </div>
        <div class="pdp__actions">
          <button class="btn btn--block" id="add-to-cart" ${p.soldOut ? "disabled" : ""}>${p.soldOut ? "Épuisé" : "Ajouter au panier"}</button>
          ${CFG.whatsapp ? `<a class="btn btn--outline btn--block" id="wa-order" href="#" target="_blank" rel="noopener">${ICON.whatsapp.replace("<svg", '<svg width="18" height="18"')} Commander sur WhatsApp</a>` : ""}
        </div>
        <div class="pdp__trust">
          <div>${ICON.shield}<span><strong>100% authentique</strong> — chaque pièce est vérifiée avant envoi.</span></div>
          <div>${ICON.plane}<span>Importé directement des États-Unis.</span></div>
          <div>${ICON.truck}<span>Livraison suivie en ${esc(CFG.deliveryTime)}${CFG.freeShippingFrom ? ` · offerte dès ${money(CFG.freeShippingFrom)}` : ""}.</span></div>
        </div>
        <div class="accordion">
          <details open><summary>Description</summary><div class="acc-body"><p>${esc(p.description)}</p><p>Coloris : ${esc(p.color)}</p></div></details>
          <details><summary>Guide des tailles</summary><div class="acc-body">${sizeGuide}</div></details>
          <details><summary>Authenticité</summary><div class="acc-body"><p>Tous nos produits proviennent directement des États-Unis et sont 100% authentiques. Chaque article est contrôlé (étiquettes, coutures, matières, boîte) avant d'être expédié. Si un produit n'était pas authentique, tu serais intégralement remboursé.</p></div></details>
          <details><summary>Livraison & retours</summary><div class="acc-body"><p>Expédition suivie sous 24-48h, livraison en ${esc(CFG.deliveryTime)}.</p><p>Échange ou retour possible sous 14 jours, article non porté avec étiquettes.</p></div></details>
        </div>
      </div>`;

    let picked = null;
    const updateWA = () => {
      const a = $("#wa-order"); if (!a) return;
      const txt = `Bonjour ${CFG.storeName} ! Je souhaite commander :\n• ${p.name}\n• Taille : ${picked || "à préciser"}\n• Prix : ${money(p.price)}\n${location.href}`;
      a.href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`;
    };
    updateWA();

    $("#sizes").addEventListener("click", (e) => {
      const b = e.target.closest(".size"); if (!b || b.classList.contains("is-soldout")) return;
      $$(".size", root).forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      picked = b.dataset.size;
      $("#size-picked").textContent = picked;
      $("#size-error").textContent = "";
      updateWA();
    });
    $("#add-to-cart").addEventListener("click", () => {
      if (!picked) { $("#size-error").textContent = "Merci de choisir une taille."; return; }
      Cart.add(p.id, picked);
      openDrawer("#cart-drawer");
    });

    const related = PRODUCTS.filter((x) => x.id !== p.id && (x.brand === p.brand || x.category === p.category))
      .sort((a, b) => (b.brand === p.brand) - (a.brand === p.brand)).slice(0, 8);
    $("#related").innerHTML = related.map(cardHTML).join("");
  }

  /* ---------------- Commande ---------------- */
  function renderCheckoutSummary() {
    const box = $("#summary"); if (!box) return;
    if (!Cart.items.length) {
      if (!$("#checkout-done").hidden) return;
      $("#checkout").innerHTML = `<div class="empty-state" style="grid-column:1/-1"><h1>Ton panier est vide</h1><a class="btn" href="shop.html">Découvrir la boutique</a></div>`;
      return;
    }
    const ship = Cart.shipping();
    box.innerHTML = `
      <h2>Récapitulatif</h2>
      ${Cart.items.map((it, i) => cartLineHTML(it, i, false)).join("")}
      <div class="summary__line"><span>Sous-total</span><span>${money(Cart.subtotal())}</span></div>
      <div class="summary__line"><span>Livraison</span><span>${ship ? money(ship) : "Offerte"}</span></div>
      <div class="summary__total"><span>Total</span><span>${money(Cart.subtotal() + ship)}</span></div>`;
  }

  function initCheckout() {
    renderCheckoutSummary();
    const form = $("#checkout-form");
    if (!form) return;
    if (!CFG.whatsapp) { const o = $('input[value="whatsapp"]'); if (o) o.closest(".pay-option").remove(); }
    if (!CFG.instagram) { const o = $('input[value="instagram"]'); if (o) o.closest(".pay-option").remove(); }
    const first = $('input[name="channel"]'); if (first) first.checked = true;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const required = ["firstname", "lastname", "phone", "email", "address", "zip", "city"];
      if (required.some((k) => !String(d[k] || "").trim())) { $("#form-error").textContent = "Merci de remplir tous les champs obligatoires."; return; }
      $("#form-error").textContent = "";

      const ref = "BASE-" + Date.now().toString(36).toUpperCase().slice(-6);
      const ship = Cart.shipping();
      const lines = Cart.items.map((it) => { const p = byId(it.id); return `• ${it.qty} x ${p.name} — Taille ${it.size} — ${money(p.price * it.qty)}`; });
      const msg = [
        `Nouvelle commande ${ref}`,
        "",
        ...lines,
        "",
        `Sous-total : ${money(Cart.subtotal())}`,
        `Livraison : ${ship ? money(ship) : "Offerte"}`,
        `TOTAL : ${money(Cart.subtotal() + ship)}`,
        "",
        `Client : ${d.firstname} ${d.lastname}`,
        `Tél : ${d.phone}`,
        `E-mail : ${d.email}`,
        `Adresse : ${d.address}, ${d.zip} ${d.city}, ${d.country || "France"}`,
        d.notes ? `Note : ${d.notes}` : ""
      ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");

      let url;
      if (d.channel === "whatsapp") url = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
      else if (d.channel === "instagram") {
        try { navigator.clipboard && navigator.clipboard.writeText(msg); } catch (err) { /* ignore */ }
        url = `https://ig.me/m/${CFG.instagram}`;
      } else url = `mailto:${CFG.email}?subject=${encodeURIComponent("Commande " + ref)}&body=${encodeURIComponent(msg)}`;

      window.open(url, "_blank", "noopener");
      $("#checkout").hidden = true;
      $("#checkout-done").hidden = false;
      Cart.clear();
      $("#order-ref").textContent = ref;
      $("#order-msg").textContent = msg;
      $("#order-retry").href = url;
      $("#order-channel-note").textContent = d.channel === "instagram"
        ? "Ton récapitulatif a été copié : colle-le dans la conversation Instagram qui vient de s'ouvrir."
        : "Envoie le message pré-rempli qui vient de s'ouvrir pour valider ta commande.";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Démarrage ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderChrome();
    const page = document.body.dataset.page;
    if (page === "home") initHome();
    if (page === "shop") initShop();
    if (page === "product") initProduct();
    if (page === "checkout") initCheckout();
    renderCart();
  });

  window.BASE = { Cart, money, toast };
})();
