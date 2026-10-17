/* ==========================================================
   BASE — Illustrations provisoires des produits
   Utilisées uniquement tant qu'un produit n'a pas de photo.
   ========================================================== */
(function () {
  "use strict";
  let uid = 0;

  function hexToRgb(h) {
    const n = parseInt(h.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(h, target, amt) {
    const a = hexToRgb(h), b = hexToRgb(target);
    return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * amt).toString(16).padStart(2, "0")).join("");
  }
  const light = (h, a) => mix(h, "#ffffff", a);
  const dark = (h, a) => mix(h, "#000000", a);
  const lum = (h) => { const [r, g, b] = hexToRgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };

  /* ---------- Chaussure (profil, pointe à droite) ---------- */
  function shoe(c, id, brand) {
    const isLight = lum(c) > 0.7;
    const upper = c;
    const overlay = isLight ? dark(c, 0.1) : light(c, 0.12);
    const edge = isLight ? dark(c, 0.28) : light(c, 0.22);
    const sole = isLight ? "#fbfbf9" : (lum(c) < 0.2 ? "#f4f3ef" : "#fbfbf9");
    const soleShade = "#dcdbd5";
    const outsole = isLight ? "#bdbcb6" : "#2a2a2a";
    const lace = isLight ? "#ffffff" : light(c, 0.35);
    const pods = brand === "on";
    return `
      <defs>
        <linearGradient id="u${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light(upper, 0.1)}"/><stop offset="1" stop-color="${dark(upper, 0.08)}"/></linearGradient>
        <linearGradient id="m${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sole}"/><stop offset="1" stop-color="${soleShade}"/></linearGradient>
      </defs>
      <ellipse cx="316" cy="420" rx="232" ry="13" fill="#000" opacity=".10"/>
      <path d="M104 412h408c12 0 18-7 14-15H96c-4 8 0 15 8 15Z" fill="${outsole}"/>
      <path d="M90 352h444c14 0 20 12 14 26-7 14-22 22-42 22H112c-16 0-28-10-28-26 0-14 0-22 6-22Z" fill="url(#m${id})" stroke="${soleShade}" stroke-width="2"/>
      ${pods ? [150, 205, 260, 315, 370, 425, 475].map((x) => `<path d="M${x} 372c10 14 26 14 36 0" fill="none" stroke="${soleShade}" stroke-width="5" stroke-linecap="round"/>`).join("") : `<path d="M100 378c140 8 300 8 440-4" fill="none" stroke="${soleShade}" stroke-width="3"/>`}
      <path d="M102 352c-6-40-2-76 22-98 18-16 42-14 58 2 12 12 32 14 46 2l34-50c8-12 26-14 36-2l20 26c40 46 96 74 160 88 34 8 54 28 54 58v-26Z" fill="url(#u${id})"/>
      <path d="M102 352c-6-40-2-76 22-98 18-16 42-14 58 2 12 12 32 14 46 2l34-50c8-12 26-14 36-2l20 26c40 46 96 74 160 88 34 8 54 28 54 58H102Z" fill="none" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M102 352c-4-34 0-62 16-82l40 30c10 20 6 40-4 52Z" fill="${overlay}" stroke="${edge}" stroke-width="2"/>
      <path d="M452 304c46 6 80 24 80 48h-94c-6-18-2-36 14-48Z" fill="${overlay}" stroke="${edge}" stroke-width="2"/>
      <path d="M232 256c40 30 90 60 168 76" fill="none" stroke="${edge}" stroke-width="2" opacity=".8"/>
      <path d="M150 336c80-6 170-6 300 0" fill="none" stroke="${edge}" stroke-width="2" stroke-dasharray="2 7" opacity=".7"/>
      ${[0, 1, 2, 3, 4].map((i) => { const x = 286 + i * 24, y = 232 + i * 13; return `<path d="M${x - 8} ${y + 12}l20-16" stroke="${lace}" stroke-width="6" stroke-linecap="round"/><circle cx="${x - 12}" cy="${y + 16}" r="3" fill="${edge}"/>`; }).join("")}
      <path d="M262 206l10-22c4-8 14-10 20-4l18 22" fill="${overlay}" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M112 262l-6-24c-1-6 4-10 9-8l14 8" fill="${overlay}" stroke="${edge}" stroke-width="2"/>`;
  }

  /* ---------- Ensemble : hoodie + jogging (à plat) ---------- */
  function set(c, id, brand) {
    const isLight = lum(c) > 0.62;
    const edge = isLight ? dark(c, 0.22) : light(c, 0.2);
    const rib = isLight ? dark(c, 0.08) : light(c, 0.07);
    const inner = dark(c, isLight ? 0.18 : 0.35);
    const patch = brand === "essentials" ? `<rect x="190" y="214" width="56" height="14" rx="4" fill="${isLight ? dark(c, 0.15) : light(c, 0.25)}"/>`
      : brand === "ralphlauren" ? `<circle cx="252" cy="218" r="8" fill="${isLight ? "#1f2a44" : light(c, 0.45)}"/>`
      : `<rect x="236" y="212" width="18" height="10" rx="2" fill="${isLight ? dark(c, 0.2) : light(c, 0.3)}"/>`;
    const zip = brand === "ralphlauren" ? `<path d="M218 176v268" stroke="${edge}" stroke-width="3"/>` : "";
    return `
      <defs>
        <linearGradient id="h${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light(c, 0.1)}"/><stop offset="1" stop-color="${dark(c, 0.08)}"/></linearGradient>
      </defs>
      <ellipse cx="300" cy="500" rx="240" ry="12" fill="#000" opacity=".07"/>
      <g>
        <path d="M168 168c-10-52 22-80 50-80s60 28 50 80c-18 26-82 26-100 0Z" fill="url(#h${id})" stroke="${edge}" stroke-width="2.5"/>
        <path d="M186 164c4-30 60-30 64 0-14 14-50 14-64 0Z" fill="${inner}"/>
        <path d="M146 170l24-14c14 26 82 26 96 0l24 14c26 10 40 30 46 56l28 156c2 12-6 22-18 22h-18l-20-108v164c0 8-6 14-14 14H148c-8 0-14-6-14-14V296l-20 108H96c-12 0-20-10-18-22l28-156c6-26 20-46 40-56Z" fill="url(#h${id})" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M134 428h168v16c0 8-6 14-14 14H148c-8 0-14-6-14-14Z" fill="${rib}" stroke="${edge}" stroke-width="2"/>
        <path d="M78 388h46l-3 16H96c-12 0-20-6-18-16ZM312 388h46c2 10-6 16-18 16h-25Z" fill="${rib}" stroke="${edge}" stroke-width="2"/>
        <path d="M166 352h104l12 52H154Z" fill="none" stroke="${edge}" stroke-width="2"/>
        <path d="M204 174l-3 58M232 174l3 58" stroke="${isLight ? "#fff" : light(c, 0.4)}" stroke-width="4" stroke-linecap="round"/>
        ${patch}${zip}
      </g>
      <g>
        <path d="M376 148h140v24H376Z" fill="${rib}" stroke="${edge}" stroke-width="2.5"/>
        <path d="M446 160l-8 30M446 160l8 30" stroke="${isLight ? "#fff" : light(c, 0.4)}" stroke-width="3" stroke-linecap="round"/>
        <path d="M376 172h140l10 140-12 160h-46l-20-236h-4l-20 236h-46l-12-160Z" fill="url(#h${id})" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M368 472h46l-1 18h-44ZM468 472h46l-1 18h-44Z" fill="${rib}" stroke="${edge}" stroke-width="2"/>
        <path d="M386 186c10 22 24 30 40 32M506 186c-10 22-24 30-40 32" fill="none" stroke="${edge}" stroke-width="2"/>
      </g>`;
  }

  /* ---------- Doudoune ---------- */
  function puffer(c, id, brand) {
    const isLight = lum(c) > 0.55;
    const edge = isLight ? dark(c, 0.25) : light(c, 0.2);
    const hi = light(c, isLight ? 0.25 : 0.14);
    const goggles = brand === "cpcompany"
      ? `<circle cx="276" cy="122" r="13" fill="#9fa6a8" stroke="#3c3f40" stroke-width="4"/><circle cx="324" cy="122" r="13" fill="#9fa6a8" stroke="#3c3f40" stroke-width="4"/><path d="M289 122h22" stroke="#3c3f40" stroke-width="4"/>`
      : "";
    const baffles = [210, 262, 314, 366, 418].map((y) => `<path d="M182 ${y}q118 16 236 0" fill="none" stroke="${edge}" stroke-width="2.5"/><path d="M190 ${y - 30}q110 10 220 0" fill="none" stroke="${hi}" stroke-width="8" stroke-linecap="round" opacity=".55"/>`).join("");
    const sleeves = [250, 300, 350, 400].map((y) => `<path d="M${130 + (y - 250) * -0.1} ${y}l42 6M${470 + (y - 250) * 0.1} ${y}l-42 6" stroke="${edge}" stroke-width="2"/>`).join("");
    return `
      <defs>
        <linearGradient id="p${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light(c, 0.12)}"/><stop offset="1" stop-color="${dark(c, 0.1)}"/></linearGradient>
      </defs>
      <ellipse cx="300" cy="512" rx="200" ry="12" fill="#000" opacity=".08"/>
      <path d="M232 160c-8-62 28-96 68-96s76 34 68 96c-20 22-116 22-136 0Z" fill="url(#p${id})" stroke="${edge}" stroke-width="2.5"/>
      ${goggles}
      <path d="M214 156l86-6 86 6c40 10 62 34 70 70l30 196c2 14-8 26-22 26h-24l-14-150v188c0 10-8 18-18 18H192c-10 0-18-8-18-18V298l-14 150h-24c-14 0-24-12-22-26l30-196c8-36 30-60 70-70Z" fill="url(#p${id})" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round"/>
      ${baffles}${sleeves}
      <path d="M300 150v348" stroke="${edge}" stroke-width="3"/>
      <path d="M262 150l38 30 38-30" fill="none" stroke="${edge}" stroke-width="2.5"/>
      ${brand === "cpcompany" ? `<circle cx="146" cy="330" r="9" fill="#9fa6a8" stroke="#3c3f40" stroke-width="3"/>` : ""}`;
  }

  /* ----------------------------------------------------------
     view 0 = vue principale, 1 = détail (zoom), 2 = vue inversée
     ---------------------------------------------------------- */
  function render(p, view = 0, brandInfo) {
    const id = "a" + (++uid);
    const tint = (brandInfo && brandInfo.tint) || "#ececea";
    const c = p.swatch || "#8d8d8b";
    const body = p.category === "chaussures" ? shoe(c, id, p.brand) : p.category === "doudounes" ? puffer(c, id, p.brand) : set(c, id, p.brand);
    const transform = view === 1
      ? (p.category === "chaussures" ? "translate(-330 -260) scale(2)" : "translate(-160 -120) scale(1.6)")
      : view === 2 ? "translate(600 0) scale(-1 1)" : "";
    const bg = view === 1 ? light(tint, 0.35) : tint;
    // "meet" + fond débordant : le produit reste entier quel que soit le format du cadre
    return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name.replace(/"/g, "&quot;")} — ${p.color.replace(/"/g, "&quot;")}" preserveAspectRatio="xMidYMid meet" style="overflow:visible">
      <defs><radialGradient id="bg${id}" gradientUnits="userSpaceOnUse" cx="300" cy="270" r="520"><stop offset="0" stop-color="${light(bg, 0.55)}"/><stop offset="1" stop-color="${bg}"/></radialGradient></defs>
      <rect x="-900" y="-900" width="2400" height="2400" fill="url(#bg${id})"/>
      <g transform="${transform}">${body}</g>
    </svg>`;
  }

  window.BASE_ART = { render };
})();
