/* ==========================================================
   BASE — Catalogue
   ----------------------------------------------------------
   Pour ajouter un produit : copie un bloc { ... } et modifie-le.

   id           identifiant unique, sans espace ni accent
   group        même valeur pour les coloris d'un même modèle
                (ils s'affichent en pastilles de couleur)
   name         nom du modèle (sans le coloris)
   color        nom du coloris
   swatch       couleur de la pastille (code hexadécimal)
   brand        une clé de BASE_BRANDS
   category     "ensembles" | "chaussures" | "doudounes"
   price        prix de vente
   oldPrice     (optionnel) ancien prix barré
   sizes        tailles proposées
   soldOutSizes (optionnel) tailles épuisées
   lowStock     (optionnel) tailles avec très peu de pièces
                -> affiche « Dernières pièces »
   images       (optionnel) tes photos, ex :
                ["images/products/xt6-noir-1.jpg", "images/products/xt6-noir-2.jpg"]
                Sans photo, une illustration provisoire s'affiche.
   tags         (optionnel) "new" = Nouveauté, "best" = Best-seller
   soldOut      (optionnel) true = entièrement épuisé
   description  texte de la fiche produit
   details      (optionnel) liste de points clés
   ========================================================== */

window.BASE_BRANDS = {
  essentials:  { name: "Essentials",   tint: "#ece9e2", line: "Fear of God" },
  ralphlauren: { name: "Ralph Lauren", tint: "#e6e9ee", line: "Polo" },
  on:          { name: "On",           tint: "#e9ecea", line: "Swiss engineered" },
  alo:         { name: "Alo",          tint: "#efebe8", line: "Alo Yoga" },
  salomon:     { name: "Salomon",      tint: "#e7eaec", line: "Sportstyle" },
  mizuno:      { name: "Mizuno",       tint: "#e6eaf0", line: "Since 1906" },
  saucony:     { name: "Saucony",      tint: "#eeeae6", line: "Originals" },
  asics:       { name: "Asics",        tint: "#e7ebee", line: "SportStyle" },
  cpcompany:   { name: "C.P. Company", tint: "#e8eae5", line: "Est. 1971" }
};

window.BASE_CATEGORIES = {
  ensembles:  { name: "Ensembles",  one: "Ensemble" },
  chaussures: { name: "Chaussures", one: "Chaussure" },
  doudounes:  { name: "Doudounes",  one: "Doudoune" }
};

const CLOTHING = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
const SHOES_W = ["35", "36", "37", "38", "39", "40", "41", "42"];

window.BASE_PRODUCTS = [
  /* ---------- ESSENTIALS ---------- */
  {
    id: "essentials-set-dark-oatmeal", group: "essentials-set",
    name: "Ensemble Essentials Hoodie + Jogging", color: "Dark Oatmeal", swatch: "#b9a98f",
    brand: "essentials", category: "ensembles", price: 239,
    sizes: CLOTHING, soldOutSizes: ["XS"], lowStock: ["M"], tags: ["best"],
    description: "L'ensemble le plus demandé. Hoodie et jogging Fear of God Essentials assortis, en molleton épais au toucher brossé. Coupe oversize, logo caoutchouté.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe oversize : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-jet-black", group: "essentials-set",
    name: "Ensemble Essentials Hoodie + Jogging", color: "Jet Black", swatch: "#1d1d1d",
    brand: "essentials", category: "ensembles", price: 239,
    sizes: CLOTHING, tags: ["best"],
    description: "Le classique tout noir. Hoodie et jogging Essentials assortis, molleton épais et coupe oversize.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe oversize : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-light-heather-grey", group: "essentials-set",
    name: "Ensemble Essentials Hoodie + Jogging", color: "Light Heather Grey", swatch: "#b8b9b8",
    brand: "essentials", category: "ensembles", price: 239, oldPrice: 269,
    sizes: CLOTHING,
    description: "Ensemble Essentials gris chiné. Hoodie à capuche doublée et jogging à chevilles élastiquées.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe oversize : taille grand"]
  },
  {
    id: "essentials-set-desert-sand", group: "essentials-set",
    name: "Ensemble Essentials Hoodie + Jogging", color: "Desert Sand", swatch: "#cdb998",
    brand: "essentials", category: "ensembles", price: 239,
    sizes: CLOTHING, soldOutSizes: ["XS", "XXL"], tags: ["new"],
    description: "Le coloris sable de la saison. Hoodie et jogging Essentials assortis.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe oversize : taille grand"]
  },

  /* ---------- RALPH LAUREN ---------- */
  {
    id: "rl-double-knit-navy", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Navy", swatch: "#1f2a44",
    brand: "ralphlauren", category: "ensembles", price: 279,
    sizes: CLOTHING, tags: ["best"],
    description: "Veste zippée à capuche et jogging assorti en jersey double maille, brodés du Pony.",
    details: ["Veste zippée + jogging", "Jersey double maille", "Pony brodé contrasté", "Coupe droite, taille normalement"]
  },
  {
    id: "rl-double-knit-grey", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Gris chiné", swatch: "#9d9e9f",
    brand: "ralphlauren", category: "ensembles", price: 279,
    sizes: CLOTHING, lowStock: ["L"],
    description: "Veste zippée et jogging Polo Ralph Lauren double maille gris chiné, Pony brodé.",
    details: ["Veste zippée + jogging", "Jersey double maille", "Pony brodé contrasté"]
  },
  {
    id: "rl-double-knit-black", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Black", swatch: "#171717",
    brand: "ralphlauren", category: "ensembles", price: 259, oldPrice: 299,
    sizes: CLOTHING, soldOutSizes: ["S"], tags: ["new"],
    description: "Hoodie et jogging Polo Ralph Lauren noirs, Pony brodé.",
    details: ["Veste zippée + jogging", "Jersey double maille", "Pony brodé ton sur ton"]
  },

  /* ---------- ON — chaussures ---------- */
  {
    id: "on-cloud-6-black", group: "on-cloud-6",
    name: "On Cloud 6", color: "Black / Black", swatch: "#1a1a1a",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["best"],
    description: "La On Cloud 6, légère et confortable du matin au soir. Semelle CloudTec®, laçage élastique qu'on n'a jamais besoin de refaire.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloud-6-white", group: "on-cloud-6",
    name: "On Cloud 6", color: "Undyed White / White", swatch: "#f1f0ec",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, soldOutSizes: ["36", "46"], tags: ["best"],
    description: "La On Cloud 6 en blanc, la paire du quotidien par excellence.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Taille normalement"]
  },
  {
    id: "on-cloud-6-glacier", group: "on-cloud-6",
    name: "On Cloud 6", color: "Glacier / Grey", swatch: "#c9ced1",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["new"],
    description: "La On Cloud 6 dans un gris glacier très facile à porter.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Taille normalement"]
  },
  {
    id: "on-cloudmonster-black", group: "on-cloudmonster",
    name: "On Cloudmonster", color: "Black / Magnet", swatch: "#232323",
    brand: "on", category: "chaussures", price: 189,
    sizes: SHOES, lowStock: ["42", "43"], tags: ["new"],
    description: "Amorti maximal et effet rebond. La Cloudmonster se porte aussi bien pour courir que pour marcher toute la journée.",
    details: ["Amorti maximal CloudTec®", "Speedboard® pour le rebond", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-ivory", group: "on-cloudtilt",
    name: "On Cloudtilt", color: "Ivory / Black", swatch: "#ece6d8",
    brand: "on", category: "chaussures", price: 179,
    sizes: SHOES,
    description: "Le modèle lifestyle d'On : silhouette épurée et amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Silhouette lifestyle", "Taille normalement"]
  },

  /* ---------- ON — ensembles ---------- */
  {
    id: "on-club-set-black", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Black", swatch: "#1c1c1c",
    brand: "on", category: "ensembles", price: 229,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie et pantalon On en coton bio, logo discret. Le confort On au quotidien.",
    details: ["Hoodie + pantalon", "Coton biologique", "Logo On discret"]
  },
  {
    id: "on-club-set-grey", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Grey", swatch: "#a3a5a4",
    brand: "on", category: "ensembles", price: 229,
    sizes: CLOTHING,
    description: "Hoodie et pantalon On gris, matière douce et respirante.",
    details: ["Hoodie + pantalon", "Coton biologique", "Logo On discret"]
  },

  /* ---------- ALO — ensembles ---------- */
  {
    id: "alo-accolade-black", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Black", swatch: "#161616",
    brand: "alo", category: "ensembles", price: 249,
    sizes: CLOTHING, tags: ["best"],
    description: "Le best-seller Alo Yoga : hoodie Accolade et sweatpant assortis, molleton brossé ultra-doux.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-heather", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Athletic Heather Grey", swatch: "#b3b3b1",
    brand: "alo", category: "ensembles", price: 249,
    sizes: CLOTHING, soldOutSizes: ["XL"],
    description: "Hoodie Accolade et sweatpant Alo Yoga en gris chiné.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-bone", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Bone", swatch: "#e2dbcd",
    brand: "alo", category: "ensembles", price: 249,
    sizes: CLOTHING, tags: ["new"],
    description: "L'ensemble Alo Accolade dans son coloris crème signature.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },

  /* ---------- ALO — chaussures ---------- */
  {
    id: "alo-recovery-white", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "White / Bone", swatch: "#f3f1ec",
    brand: "alo", category: "chaussures", price: 199,
    sizes: SHOES_W, tags: ["new"],
    description: "La sneaker Alo pensée pour le confort : semelle légère et amortissante, look clean.",
    details: ["Semelle légère amortissante", "Look minimaliste", "Taille normalement"]
  },
  {
    id: "alo-recovery-black", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "Black", swatch: "#1b1b1b",
    brand: "alo", category: "chaussures", price: 199,
    sizes: SHOES_W,
    description: "La Recovery Mode Alo en noir, parfaite avec un ensemble Accolade.",
    details: ["Semelle légère amortissante", "Look minimaliste", "Taille normalement"]
  },

  /* ---------- SALOMON — chaussures ---------- */
  {
    id: "salomon-xt6-black", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Black / Phantom", swatch: "#1e1f21",
    brand: "salomon", category: "chaussures", price: 199,
    sizes: SHOES, tags: ["best"],
    description: "L'icône gorpcore. La XT-6 allie la technicité du trail au style urbain, avec le laçage rapide Quicklace™.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Accroche Contagrip®", "Taille normalement"]
  },
  {
    id: "salomon-xt6-vanilla", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Vanilla Ice / Almond Milk", swatch: "#ede6d6",
    brand: "salomon", category: "chaussures", price: 209,
    sizes: SHOES, soldOutSizes: ["44"], lowStock: ["42"],
    description: "La XT-6 dans un coloris clair très recherché.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Taille normalement"]
  },
  {
    id: "salomon-acs-pro-lunar", group: "salomon-acs-pro",
    name: "Salomon ACS Pro", color: "Lunar Rock / Silver", swatch: "#bfc1c3",
    brand: "salomon", category: "chaussures", price: 199,
    sizes: SHOES, tags: ["new"],
    description: "Silhouette rétro-tech, maintien et amorti pour un look affirmé.",
    details: ["Laçage Quicklace™", "Amorti EnergyCell™", "Taille normalement"]
  },
  {
    id: "salomon-speedcross-6-black", group: "salomon-speedcross-6",
    name: "Salomon Speedcross 6", color: "Black / Phantom", swatch: "#202020",
    brand: "salomon", category: "chaussures", price: 159, oldPrice: 179,
    sizes: SHOES,
    description: "Accroche légendaire et look affirmé : la Speedcross 6.",
    details: ["Crampons Contagrip®", "Laçage Quicklace™", "Taille normalement"]
  },

  /* ---------- SALOMON — ensembles ---------- */
  {
    id: "salomon-set-black", group: "salomon-set",
    name: "Ensemble Salomon Hoodie + Pants", color: "Deep Black", swatch: "#161718",
    brand: "salomon", category: "ensembles", price: 219,
    sizes: CLOTHING, tags: ["new"],
    description: "Sweat à capuche et pantalon Salomon assortis, logo brodé.",
    details: ["Hoodie + pantalon", "Logo brodé", "Coupe droite"]
  },
  {
    id: "salomon-set-grey", group: "salomon-set",
    name: "Ensemble Salomon Hoodie + Pants", color: "Ghost Grey", swatch: "#a7a9aa",
    brand: "salomon", category: "ensembles", price: 219,
    sizes: CLOTHING,
    description: "Sweat à capuche et pantalon Salomon gris, logo brodé.",
    details: ["Hoodie + pantalon", "Logo brodé", "Coupe droite"]
  },

  /* ---------- MIZUNO ---------- */
  {
    id: "mizuno-wave-rider-10-silver", group: "mizuno-wave-rider-10",
    name: "Mizuno Wave Rider 10", color: "White / Silver", swatch: "#d9dadc",
    brand: "mizuno", category: "chaussures", price: 159,
    sizes: SHOES, tags: ["best"],
    description: "Le running rétro des années 2000 est de retour. Plaque Wave pour la stabilité et l'amorti.",
    details: ["Plaque Mizuno Wave", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-black", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Black", swatch: "#1d1d1d",
    brand: "mizuno", category: "chaussures", price: 189,
    sizes: SHOES, tags: ["new"],
    description: "La semelle Infinity Wave iconique pour un style futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-contender-white-navy", group: "mizuno-contender",
    name: "Mizuno Contender", color: "White / Navy", swatch: "#e9ebef",
    brand: "mizuno", category: "chaussures", price: 139,
    sizes: SHOES,
    description: "Silhouette running vintage Mizuno, confortable et légère.",
    details: ["Look vintage", "Légère", "Taille normalement"]
  },

  /* ---------- SAUCONY ---------- */
  {
    id: "saucony-shadow-6000-grey", group: "saucony-shadow-6000",
    name: "Saucony Shadow 6000", color: "Grey / Silver", swatch: "#a9a9a7",
    brand: "saucony", category: "chaussures", price: 149,
    sizes: SHOES, tags: ["best"],
    description: "Classique du running rétro, daim et mesh, semelle confortable.",
    details: ["Daim et mesh", "Semelle confortable", "Taille normalement"]
  },
  {
    id: "saucony-progrid-triumph-4-silver", group: "saucony-progrid-triumph-4",
    name: "Saucony ProGrid Triumph 4", color: "Silver / Black", swatch: "#c7c8ca",
    brand: "saucony", category: "chaussures", price: 159,
    sizes: SHOES, soldOutSizes: ["41"], tags: ["new"],
    description: "Le modèle tendance de Saucony, look Y2K et amorti ProGrid.",
    details: ["Amorti ProGrid", "Look Y2K", "Taille normalement"]
  },
  {
    id: "saucony-grid-omni-9-cream", group: "saucony-grid-omni-9",
    name: "Saucony Grid Omni 9", color: "Cream / Brown", swatch: "#e5dccb",
    brand: "saucony", category: "chaussures", price: 139,
    sizes: SHOES,
    description: "Sneaker rétro aux tons chauds, facile à porter.",
    details: ["Look rétro", "Tons chauds", "Taille normalement"]
  },

  /* ---------- ASICS ---------- */
  {
    id: "asics-gel-kayano-14-silver", group: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14", color: "White / Pure Silver", swatch: "#dcdddf",
    brand: "asics", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["best"], lowStock: ["44"],
    description: "La Gel-Kayano 14, star du running rétro. Amorti GEL® et détails métalliques.",
    details: ["Amorti GEL®", "Détails métallisés", "Taille normalement"]
  },
  {
    id: "asics-gel-kayano-14-black", group: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14", color: "Black / Pure Silver", swatch: "#202022",
    brand: "asics", category: "chaussures", price: 169,
    sizes: SHOES,
    description: "La Gel-Kayano 14 en noir et argent.",
    details: ["Amorti GEL®", "Détails métallisés", "Taille normalement"]
  },
  {
    id: "asics-gel-nyc-oyster", group: "asics-gel-nyc",
    name: "Asics Gel-NYC", color: "Oyster Grey / Carbon", swatch: "#cfccc5",
    brand: "asics", category: "chaussures", price: 159,
    sizes: SHOES, tags: ["new"],
    description: "Inspirée des archives Asics, la Gel-NYC mélange plusieurs modèles cultes.",
    details: ["Amorti GEL®", "Design inspiré des archives", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-clay", group: "asics-gel-1130",
    name: "Asics Gel-1130", color: "White / Clay Canyon", swatch: "#d9c2ab",
    brand: "asics", category: "chaussures", price: 129, oldPrice: 149,
    sizes: SHOES,
    description: "Silhouette running des années 2000, légère et polyvalente.",
    details: ["Amorti GEL®", "Légère", "Taille normalement"]
  },

  /* ---------- C.P. COMPANY ---------- */
  {
    id: "cp-goggle-down-black", group: "cp-goggle-down",
    name: "Doudoune C.P. Company Goggle", color: "Black", swatch: "#151515",
    brand: "cpcompany", category: "doudounes", price: 549,
    sizes: CLOTHING.slice(1), tags: ["best"], lowStock: ["L"],
    description: "La doudoune C.P. Company iconique, avec les lunettes Goggle intégrées à la capuche. Garnissage en duvet, coupe-vent.",
    details: ["Lunettes Goggle sur la capuche", "Garnissage duvet", "Coupe-vent", "Taille normalement"]
  },
  {
    id: "cp-goggle-down-navy", group: "cp-goggle-down",
    name: "Doudoune C.P. Company Goggle", color: "Total Eclipse", swatch: "#1e2638",
    brand: "cpcompany", category: "doudounes", price: 549,
    sizes: CLOTHING.slice(1), tags: ["new"],
    description: "La doudoune Goggle dans le bleu nuit signature de la marque.",
    details: ["Lunettes Goggle sur la capuche", "Garnissage duvet", "Coupe-vent"]
  },
  {
    id: "cp-nycra-down-olive", group: "cp-nycra-down",
    name: "Doudoune C.P. Company Nycra-R", color: "Ivy Green", swatch: "#4f5641",
    brand: "cpcompany", category: "doudounes", price: 469, oldPrice: 529,
    sizes: CLOTHING.slice(1), soldOutSizes: ["S"],
    description: "Doudoune légère C.P. Company en Nycra-R, lentille signature sur la manche.",
    details: ["Lentille signature sur la manche", "Nylon Nycra-R", "Légère et chaude"]
  }
];
