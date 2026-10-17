/* ==========================================================
   BASE — Catalogue
   ----------------------------------------------------------
   Pour ajouter un produit : copie un bloc { ... } et modifie-le.
   Les photos se règlent dans photos.js.

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
const JACKETS = ["S", "M", "L", "XL", "XXL"];

window.BASE_PRODUCTS = [
  /* ---------- ESSENTIALS ---------- */
  {
    id: "essentials-set-oatmeal-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Oatmeal Heather", swatch: "#e9e5dc",
    brand: "essentials", category: "ensembles", price: 269,
    sizes: CLOTHING, soldOutSizes: ["XS"], lowStock: ["M"], tags: ["best"],
    description: "L'ensemble le plus demandé. Hoodie et jogging Fear of God Essentials Classic assortis, en molleton épais au toucher brossé. Coupe ample, logo caoutchouté.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-black", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Black", swatch: "#161616",
    brand: "essentials", category: "ensembles", price: 269,
    sizes: CLOTHING, tags: ["best"],
    description: "Le classique tout noir. Hoodie et jogging Essentials Classic assortis, molleton épais et coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-warm-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Warm Heather", swatch: "#b4b0a6",
    brand: "essentials", category: "ensembles", price: 269, oldPrice: 299,
    sizes: CLOTHING,
    description: "Ensemble Essentials gris chiné chaud. Hoodie à capuche doublée et jogging à chevilles élastiquées.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-set-homestead-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Homestead Heather", swatch: "#8b7d6a",
    brand: "essentials", category: "ensembles", price: 249,
    sizes: CLOTHING, soldOutSizes: ["XS", "XXL"], tags: ["new"],
    description: "Le coloris taupe de la saison. Hoodie et jogging Essentials Classic assortis.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand"]
  },

  /* ---------- RALPH LAUREN ---------- */
  {
    id: "rl-double-knit-heather-grey", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Heather Grey", swatch: "#6f7073",
    brand: "ralphlauren", category: "ensembles", price: 249,
    sizes: CLOTHING, tags: ["best"],
    description: "Veste zippée à capuche et jogging Polo Ralph Lauren en molleton double maille, brodés du Pony.",
    details: ["Veste zippée + jogging", "Molleton double maille", "Pony brodé", "Coupe droite, taille normalement"]
  },
  {
    id: "rl-double-knit-tan", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Tan", swatch: "#b08d62",
    brand: "ralphlauren", category: "ensembles", price: 249,
    sizes: CLOTHING, lowStock: ["L"], tags: ["new"],
    description: "Veste zippée et jogging Polo Ralph Lauren double maille, coloris camel, Pony brodé.",
    details: ["Veste zippée + jogging", "Molleton double maille", "Pony brodé"]
  },
  {
    id: "rl-double-knit-royal-blue", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Royal Blue", swatch: "#1f43b5",
    brand: "ralphlauren", category: "ensembles", price: 279,
    sizes: CLOTHING, soldOutSizes: ["S"],
    description: "Veste zippée et jogging Polo Ralph Lauren Double-Knit Tech en bleu roi, Pony brodé.",
    details: ["Veste zippée + jogging", "Molleton double maille technique", "Pony brodé ton sur ton"]
  },

  /* ---------- ON — chaussures ---------- */
  {
    id: "on-cloud-6-black", group: "on-cloud-6",
    name: "On Cloud 6", color: "Black / White", swatch: "#1a1a1a",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["best"],
    description: "La On Cloud 6, légère et confortable du matin au soir. Semelle CloudTec®, laçage élastique qu'on n'a jamais besoin de refaire.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloud-6-white", group: "on-cloud-6",
    name: "On Cloud 6", color: "White / White", swatch: "#f1f0ec",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, soldOutSizes: ["36", "46"], tags: ["best"],
    description: "La On Cloud 6 toute blanche, la paire du quotidien par excellence.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Taille normalement"]
  },
  {
    id: "on-cloud-6-glacier", group: "on-cloud-6",
    name: "On Cloud 6", color: "Glacier / White", swatch: "#c9ced5",
    brand: "on", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["new"],
    description: "La On Cloud 6 dans un gris glacier très facile à porter.",
    details: ["Semelle CloudTec®", "Laçage élastique speed-lacing", "Taille normalement"]
  },
  {
    id: "on-cloudmonster-3-hyper-black", group: "on-cloudmonster-3-hyper",
    name: "On Cloudmonster 3 Hyper", color: "Black / Ivory", swatch: "#232323",
    brand: "on", category: "chaussures", price: 229,
    sizes: SHOES, lowStock: ["42", "43"], tags: ["new"],
    description: "Amorti maximal et effet rebond. La Cloudmonster 3 Hyper se porte aussi bien pour courir que pour marcher toute la journée.",
    details: ["Amorti maximal CloudTec®", "Mousse Helion™ HF", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-grain", group: "on-cloudtilt",
    name: "On Cloudtilt", color: "Grain / White", swatch: "#e6e1d6",
    brand: "on", category: "chaussures", price: 179,
    sizes: SHOES,
    description: "Le modèle lifestyle d'On : silhouette épurée et amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Silhouette lifestyle", "Taille normalement"]
  },

  /* ---------- ON — ensembles ---------- */
  {
    id: "on-club-set-black", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Black", swatch: "#1c1c1c",
    brand: "on", category: "ensembles", price: 269,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie et pantalon On Club assortis, coton bio et polyester recyclé, logo On brodé. Coupe relax, pensée pour la vie en dehors de la piste.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On brodé", "Coupe relax"]
  },
  {
    id: "on-club-set-crater", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Crater", swatch: "#c4c5c4",
    brand: "on", category: "ensembles", price: 269,
    sizes: CLOTHING,
    description: "L'ensemble On Club en gris chiné Crater, logo On brodé.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On brodé", "Coupe relax"]
  },

  /* ---------- ALO — ensembles ---------- */
  {
    id: "alo-accolade-black", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Black", swatch: "#161616",
    brand: "alo", category: "ensembles", price: 279,
    sizes: CLOTHING, tags: ["best"],
    description: "Le best-seller Alo Yoga : hoodie Accolade et sweatpant assortis, molleton brossé ultra-doux.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-heather", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Athletic Heather Grey", swatch: "#b3b3b1",
    brand: "alo", category: "ensembles", price: 279,
    sizes: CLOTHING, soldOutSizes: ["XL"],
    description: "Hoodie Accolade et sweatpant Alo Yoga en gris chiné.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-ivory", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Ivory", swatch: "#ece7dc",
    brand: "alo", category: "ensembles", price: 279,
    sizes: CLOTHING, tags: ["new"],
    description: "L'ensemble Alo Accolade dans son coloris ivoire signature.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },

  /* ---------- ALO — chaussures ---------- */
  {
    id: "alo-recovery-natural-white", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "Natural White", swatch: "#f3f1ec",
    brand: "alo", category: "chaussures", price: 209,
    sizes: SHOES_W, tags: ["new"],
    description: "La sneaker Alo pensée pour le confort : semelle légère et amortissante, look clean.",
    details: ["Semelle légère amortissante", "Cuir lisse", "Taille normalement"]
  },
  {
    id: "alo-recovery-black-gum", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "Black / Gum", swatch: "#1b1b1b",
    brand: "alo", category: "chaussures", price: 209,
    sizes: SHOES_W,
    description: "La Recovery Mode Alo en noir avec semelle gomme, parfaite avec un ensemble Accolade.",
    details: ["Semelle gomme", "Cuir lisse", "Taille normalement"]
  },

  /* ---------- SALOMON — chaussures ---------- */
  {
    id: "salomon-xt6-black-coffee", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Black Coffee / French Roast", swatch: "#3b2a24",
    brand: "salomon", category: "chaussures", price: 199,
    sizes: SHOES, tags: ["best"],
    description: "L'icône gorpcore. La XT-6 allie la technicité du trail au style urbain, avec le laçage rapide Quicklace™.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Accroche Contagrip®", "Taille normalement"]
  },
  {
    id: "salomon-xt6-rainy-day", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Rainy Day / Paloma / Silver", swatch: "#e2e2e0",
    brand: "salomon", category: "chaussures", price: 209,
    sizes: SHOES, soldOutSizes: ["44"], lowStock: ["42"],
    description: "La XT-6 dans un coloris clair très recherché.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Taille normalement"]
  },
  {
    id: "salomon-xt6-adv-black", group: "salomon-xt6-adv",
    name: "Salomon XT-6 ADV", color: "Black / Phantom", swatch: "#1e1f21",
    brand: "salomon", category: "chaussures", price: 209,
    sizes: SHOES, tags: ["best"],
    description: "La XT-6 Advanced tout en noir, le modèle qui a lancé la tendance.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Accroche Contagrip®", "Taille normalement"]
  },
  {
    id: "salomon-acs-pro-white", group: "salomon-acs-pro",
    name: "Salomon ACS Pro", color: "White / Jade / Celadon", swatch: "#cfdcc4",
    brand: "salomon", category: "chaussures", price: 179, oldPrice: 199,
    sizes: SHOES, tags: ["new"],
    description: "Silhouette rétro-tech, maintien et amorti pour un look affirmé.",
    details: ["Laçage Quicklace™", "Amorti EnergyCell™", "Taille normalement"]
  },
  {
    id: "salomon-speedcross-3", group: "salomon-speedcross-3",
    name: "Salomon Speedcross 3", color: "Black / Pink / Lime", swatch: "#1c1c1c",
    brand: "salomon", category: "chaussures", price: 139,
    sizes: SHOES,
    description: "Accroche légendaire et look affirmé : la Speedcross 3.",
    details: ["Crampons Contagrip®", "Laçage Quicklace™", "Taille normalement"]
  },

  /* ---------- SALOMON — ensembles ---------- */
  {
    id: "salomon-set-black", group: "salomon-set",
    name: "Ensemble Salomon Logo Hoodie + Shakeout Pants", color: "Deep Black", swatch: "#161718",
    brand: "salomon", category: "ensembles", price: 229,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie Salomon Logo et pantalon Shakeout Core, tout en noir. Le look sportstyle Salomon, à porter avec une XT-6.",
    details: ["Hoodie Salomon Logo + pantalon Shakeout Core", "Grand logo Salomon sur la poitrine", "Pantalon léger avec poche zippée", "Taille normalement"]
  },
  {
    id: "salomon-set-white", group: "salomon-set",
    name: "Ensemble Salomon Logo Hoodie + Shakeout Pants", color: "Whisper White / Deep Black", swatch: "#efece4",
    brand: "salomon", category: "ensembles", price: 219,
    sizes: CLOTHING,
    description: "Hoodie Salomon Logo blanc cassé et pantalon Shakeout Core noir.",
    details: ["Hoodie Salomon Logo + pantalon Shakeout Core", "Grand logo Salomon sur la poitrine", "Pantalon léger avec poche zippée", "Taille normalement"]
  },

  /* ---------- MIZUNO ---------- */
  {
    id: "mizuno-wave-rider-10", group: "mizuno-wave-rider-10",
    name: "Mizuno Wave Rider 10", color: "White / Silver Cloud", swatch: "#dcdcdc",
    brand: "mizuno", category: "chaussures", price: 169,
    sizes: SHOES, tags: ["best"],
    description: "Le running rétro des années 2000 est de retour. Plaque Wave pour la stabilité et l'amorti.",
    details: ["Plaque Mizuno Wave", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-ls", group: "mizuno-wave-prophecy-ls",
    name: "Mizuno Wave Prophecy LS", color: "Silver Cloud / White Sand", swatch: "#d9d3c4",
    brand: "mizuno", category: "chaussures", price: 259,
    sizes: SHOES, tags: ["new"],
    description: "La semelle Infinity Wave iconique pour un style futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-rider-beta", group: "mizuno-wave-rider-beta",
    name: "Mizuno Wave Rider β", color: "White / Silver Cloud", swatch: "#e6e4dd",
    brand: "mizuno", category: "chaussures", price: 199,
    sizes: SHOES,
    description: "Réédition d'un modèle running Mizuno des années 2000, confortable et léger.",
    details: ["Plaque Mizuno Wave", "Look vintage", "Taille normalement"]
  },

  /* ---------- SAUCONY ---------- */
  {
    id: "saucony-shadow-6000", group: "saucony-shadow-6000",
    name: "Saucony Shadow 6000", color: "White / Grey / Navy", swatch: "#ecebe8",
    brand: "saucony", category: "chaussures", price: 149,
    sizes: SHOES, tags: ["best"],
    description: "Classique du running rétro, daim et mesh, semelle confortable.",
    details: ["Daim et mesh", "Semelle confortable", "Taille normalement"]
  },
  {
    id: "saucony-progrid-triumph-4", group: "saucony-progrid-triumph-4",
    name: "Saucony ProGrid Triumph 4", color: "Black / Silver", swatch: "#232325",
    brand: "saucony", category: "chaussures", price: 169,
    sizes: SHOES, soldOutSizes: ["41"], tags: ["new"],
    description: "Le modèle tendance de Saucony, look Y2K et amorti ProGrid.",
    details: ["Amorti ProGrid", "Look Y2K", "Taille normalement"]
  },
  {
    id: "saucony-progrid-omni-9", group: "saucony-progrid-omni-9",
    name: "Saucony ProGrid Omni 9", color: "White / Brown", swatch: "#d9d2c8",
    brand: "saucony", category: "chaussures", price: 159, oldPrice: 179,
    sizes: SHOES,
    description: "Sneaker rétro aux tons chauds, facile à porter.",
    details: ["Amorti ProGrid", "Look rétro", "Taille normalement"]
  },

  /* ---------- ASICS ---------- */
  {
    id: "asics-gel-kayano-14-birch", group: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14", color: "Birch / Pure Silver", swatch: "#d9d0bd",
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
    id: "asics-gel-nyc-khaki", group: "asics-gel-nyc",
    name: "Asics Gel-NYC", color: "Khaki / Pure Silver", swatch: "#c9c6b0",
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
    id: "cp-goggle-down-brown", group: "cp-goggle-down",
    name: "Doudoune C.P. Company Eco-Chrome R Goggle", color: "Re-Color Brown", swatch: "#6b4e2e",
    brand: "cpcompany", category: "doudounes", price: 1190,
    sizes: JACKETS, tags: ["new"], lowStock: ["L"],
    description: "La doudoune C.P. Company iconique, avec les lunettes Goggle intégrées à la capuche. Nylon Eco-Chrome R teint en pièce, garnissage duvet.",
    details: ["Lunettes Goggle sur la capuche", "Nylon Eco-Chrome R", "Garnissage duvet"]
  },
  {
    id: "cp-dd-shell-puffer-flint", group: "cp-dd-shell-puffer",
    name: "Doudoune C.P. Company D.D. Shell", color: "Flint Grey", swatch: "#c9c5b6",
    brand: "cpcompany", category: "doudounes", price: 649,
    sizes: JACKETS, tags: ["best"],
    description: "Doudoune à capuche en nylon D.D. Shell, matelassage carré et lentille signature sur la manche.",
    details: ["Lentille signature sur la manche", "Nylon D.D. Shell", "Garnissage duvet", "Taille normalement"]
  },
  {
    id: "cp-dd-shell-puffer-andorra", group: "cp-dd-shell-puffer",
    name: "Doudoune C.P. Company D.D. Shell", color: "Andorra", swatch: "#6e2424",
    brand: "cpcompany", category: "doudounes", price: 649,
    sizes: JACKETS, soldOutSizes: ["S"],
    description: "La doudoune D.D. Shell dans un rouge profond, lentille signature sur la manche.",
    details: ["Lentille signature sur la manche", "Nylon D.D. Shell", "Garnissage duvet"]
  },
  {
    id: "cp-explorer-lens-down-blue", group: "cp-explorer-lens-down",
    name: "Doudoune C.P. Company Explorer Lens", color: "Orion Blue", swatch: "#4f6b84",
    brand: "cpcompany", category: "doudounes", price: 699, oldPrice: 749,
    sizes: JACKETS,
    description: "Doudoune Explorer en nylon D.D. Shell, lentille intégrée à la capuche.",
    details: ["Lentille intégrée à la capuche", "Nylon D.D. Shell", "Garnissage duvet"]
  }
];
