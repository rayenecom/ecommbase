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
   category     "ensembles" | "chaussures" | "doudounes" | "accessoires"
   type         (accessoires) "casquettes" | "bonnets" | "chaussettes" | "calecons"
   gender       "homme" | "femme" | "unisexe"
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
  cpcompany:   { name: "C.P. Company", tint: "#e8eae5", line: "Est. 1971" },
  ugg:         { name: "UGG",          tint: "#ece6de", line: "Since 1978" },
  nocta:       { name: "Nocta",        tint: "#e7e7e7", line: "Nike x Drake" },
  lululemon:   { name: "Lululemon",    tint: "#ece9e6", line: "Vancouver" },
  courreges:   { name: "Courrèges",    tint: "#eeeeec", line: "Paris" },
  columbia:    { name: "Columbia",     tint: "#e8eae6", line: "Since 1938" },
  sweetpants:  { name: "Sweet Pants",  tint: "#ecebe8", line: "Paris" }
};

window.BASE_CATEGORIES = {
  ensembles:  { name: "Ensembles",  one: "Ensemble" },
  chaussures: { name: "Chaussures", one: "Chaussure" },
  doudounes:  { name: "Doudounes",  one: "Doudoune" },
  accessoires: { name: "Accessoires", one: "Accessoire" }
};

window.BASE_TYPES = {
  casquettes:  "Casquettes",
  bonnets:     "Bonnets",
  chaussettes: "Chaussettes",
  calecons:    "Caleçons"
};

const CLOTHING = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
const SHOES_W = ["35", "36", "37", "38", "39", "40", "41", "42"];
const JACKETS = ["S", "M", "L", "XL", "XXL"];
const SHOES_M = ["39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47"];
const SHOES_F = ["36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5", "41", "42"];
const TU = ["TU"];

window.BASE_PRODUCTS = [
  /* ---------- ESSENTIALS ---------- */
  {
    id: "essentials-set-oatmeal-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Oatmeal Heather", swatch: "#e4e1dc",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, soldOutSizes: ["XS"], lowStock: ["M"], tags: ["best"],
    description: "L'ensemble le plus demandé. Hoodie et jogging Fear of God Essentials Classic assortis, en molleton épais au toucher brossé. Coupe ample, logo caoutchouté.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-black", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Black", swatch: "#1a1a1a",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["best"],
    description: "Le classique tout noir. Hoodie et jogging Essentials Classic assortis, molleton épais et coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand", "Logo Essentials caoutchouté"]
  },
  {
    id: "essentials-set-warm-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Warm Heather", swatch: "#a9a59a",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269, oldPrice: 299,
    sizes: CLOTHING,
    description: "Ensemble Essentials gris chiné chaud. Hoodie à capuche doublée et jogging à chevilles élastiquées.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-set-homestead-heather", group: "essentials-set",
    name: "Ensemble Essentials Classic Hoodie + Sweatpant", color: "Homestead Heather", swatch: "#7a6b5a",
    brand: "essentials", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, soldOutSizes: ["XS", "XXL"], tags: ["new"],
    description: "Le coloris taupe de la saison. Hoodie et jogging Essentials Classic assortis.",
    details: ["Hoodie + jogging vendus ensemble", "Molleton épais, intérieur brossé", "Coupe ample : taille grand"]
  },

  /* ---------- RALPH LAUREN ---------- */
  {
    id: "rl-double-knit-heather-grey", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Heather Grey", swatch: "#5d5459",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, tags: ["best"],
    description: "Veste zippée à capuche et jogging Polo Ralph Lauren en molleton double maille, brodés du Pony.",
    details: ["Veste zippée + jogging", "Molleton double maille", "Pony brodé", "Coupe droite, taille normalement"]
  },
  {
    id: "rl-double-knit-tan", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Tan", swatch: "#926f4e",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, lowStock: ["L"], tags: ["new"],
    description: "Veste zippée et jogging Polo Ralph Lauren double maille, coloris camel, Pony brodé.",
    details: ["Veste zippée + jogging", "Molleton double maille", "Pony brodé"]
  },
  {
    id: "rl-double-knit-royal-blue", group: "rl-double-knit",
    name: "Ensemble Polo Ralph Lauren Double-Knit", color: "Royal Blue", swatch: "#10409f",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, soldOutSizes: ["S"],
    description: "Veste zippée et jogging Polo Ralph Lauren Double-Knit Tech en bleu roi, Pony brodé.",
    details: ["Veste zippée + jogging", "Molleton double maille technique", "Pony brodé ton sur ton"]
  },


  /* ---------- ON — ensembles ---------- */
  {
    id: "on-club-set-black", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Black", swatch: "#141213",
    brand: "on", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie et pantalon On Club assortis, coton bio et polyester recyclé, logo On brodé. Coupe relax, pensée pour la vie en dehors de la piste.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On brodé", "Coupe relax"]
  },
  {
    id: "on-club-set-crater", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Crater", swatch: "#bbb5b3",
    brand: "on", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "L'ensemble On Club en gris chiné Crater, logo On brodé.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On brodé", "Coupe relax"]
  },

  /* ---------- ALO — ensembles ---------- */
  {
    id: "alo-accolade-black", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Black", swatch: "#1d1e1e",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["best"],
    description: "Le best-seller Alo Yoga : hoodie Accolade et sweatpant assortis, molleton brossé ultra-doux.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-heather", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Athletic Heather Grey", swatch: "#5b514e",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, soldOutSizes: ["XL"],
    description: "Hoodie Accolade et sweatpant Alo Yoga en gris chiné.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },
  {
    id: "alo-accolade-ivory", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Ivory", swatch: "#dcdbd7",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["new"],
    description: "L'ensemble Alo Accolade dans son coloris ivoire signature.",
    details: ["Hoodie + sweatpant", "Molleton brossé ultra-doux", "Coupe relax"]
  },

  /* ---------- ALO — chaussures ---------- */
  {
    id: "alo-recovery-natural-white", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "Natural White", swatch: "#d4d4d4",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: SHOES_W, tags: ["new"],
    description: "La sneaker Alo pensée pour le confort : semelle légère et amortissante, look clean.",
    details: ["Semelle légère amortissante", "Cuir lisse", "Taille normalement"]
  },
  {
    id: "alo-recovery-black-gum", group: "alo-recovery",
    name: "Alo Recovery Mode Sneaker", color: "Black / Gum", swatch: "#464443",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: SHOES_W,
    description: "La Recovery Mode Alo en noir avec semelle gomme, parfaite avec un ensemble Accolade.",
    details: ["Semelle gomme", "Cuir lisse", "Taille normalement"]
  },

  /* ---------- SALOMON — chaussures ---------- */
  {
    id: "salomon-xt6-black-coffee", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Black Coffee / French Roast", swatch: "#cfcdc4",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: SHOES, tags: ["best"],
    description: "L'icône gorpcore. La XT-6 allie la technicité du trail au style urbain, avec le laçage rapide Quicklace™.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Accroche Contagrip®", "Taille normalement"]
  },
  {
    id: "salomon-xt6-rainy-day", group: "salomon-xt6",
    name: "Salomon XT-6", color: "Rainy Day / Paloma / Silver", swatch: "#c3c0be",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 209,
    sizes: SHOES, soldOutSizes: ["44"], lowStock: ["42"],
    description: "La XT-6 dans un coloris clair très recherché.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Taille normalement"]
  },
  {
    id: "salomon-xt6-adv-black", group: "salomon-xt6-adv",
    name: "Salomon XT-6 ADV", color: "Black / Phantom", swatch: "#2a272a",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 209,
    sizes: SHOES, tags: ["best"],
    description: "La XT-6 Advanced tout en noir, le modèle qui a lancé la tendance.",
    details: ["Laçage Quicklace™", "Châssis SensiFit™", "Accroche Contagrip®", "Taille normalement"]
  },
  {
    id: "salomon-acs-pro-white", group: "salomon-acs-pro",
    name: "Salomon ACS Pro", color: "White / Jade / Celadon", swatch: "#a7a186",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 179, oldPrice: 199,
    sizes: SHOES, tags: ["new"],
    description: "Silhouette rétro-tech, maintien et amorti pour un look affirmé.",
    details: ["Laçage Quicklace™", "Amorti EnergyCell™", "Taille normalement"]
  },
  {
    id: "salomon-speedcross-3", group: "salomon-speedcross-3",
    name: "Salomon Speedcross 3", color: "Black / Pink / Lime", swatch: "#333131",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 139,
    sizes: SHOES,
    description: "Accroche légendaire et look affirmé : la Speedcross 3.",
    details: ["Crampons Contagrip®", "Laçage Quicklace™", "Taille normalement"]
  },

  /* ---------- SALOMON — ensembles ---------- */
  {
    id: "salomon-set-black", group: "salomon-set",
    name: "Ensemble Salomon Logo Hoodie + Shakeout Pants", color: "Deep Black", swatch: "#313131",
    brand: "salomon", category: "ensembles", gender: "homme", price: 229,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie Salomon Logo et pantalon Shakeout Core, tout en noir. Le look sportstyle Salomon, à porter avec une XT-6.",
    details: ["Hoodie Salomon Logo + pantalon Shakeout Core", "Grand logo Salomon sur la poitrine", "Pantalon léger avec poche zippée", "Taille normalement"]
  },
  {
    id: "salomon-set-white", group: "salomon-set",
    name: "Ensemble Salomon Logo Hoodie + Shakeout Pants", color: "Whisper White / Deep Black", swatch: "#ede7e1",
    brand: "salomon", category: "ensembles", gender: "homme", price: 219,
    sizes: CLOTHING,
    description: "Hoodie Salomon Logo blanc cassé et pantalon Shakeout Core noir.",
    details: ["Hoodie Salomon Logo + pantalon Shakeout Core", "Grand logo Salomon sur la poitrine", "Pantalon léger avec poche zippée", "Taille normalement"]
  },

  /* ---------- MIZUNO ---------- */
  {
    id: "mizuno-wave-rider-10", group: "mizuno-wave-rider-10",
    name: "Mizuno Wave Rider 10", color: "White / Silver Cloud", swatch: "#bebdb7",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 169,
    sizes: SHOES, tags: ["best"],
    description: "Le running rétro des années 2000 est de retour. Plaque Wave pour la stabilité et l'amorti.",
    details: ["Plaque Mizuno Wave", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-ls", group: "mizuno-wave-prophecy-ls",
    name: "Mizuno Wave Prophecy LS", color: "Silver Cloud / White Sand", swatch: "#b1a694",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 259,
    sizes: SHOES, tags: ["new"],
    description: "La semelle Infinity Wave iconique pour un style futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-rider-beta", group: "mizuno-wave-rider-beta",
    name: "Mizuno Wave Rider β", color: "White / Silver Cloud", swatch: "#a3a297",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 199,
    sizes: SHOES,
    description: "Réédition d'un modèle running Mizuno des années 2000, confortable et léger.",
    details: ["Plaque Mizuno Wave", "Look vintage", "Taille normalement"]
  },

  /* ---------- SAUCONY ---------- */
  {
    id: "saucony-shadow-6000", group: "saucony-shadow-6000",
    name: "Saucony Shadow 6000", color: "White / Grey / Navy", swatch: "#a7a5a1",
    brand: "saucony", category: "chaussures", gender: "unisexe", price: 149,
    sizes: SHOES, tags: ["best"],
    description: "Classique du running rétro, daim et mesh, semelle confortable.",
    details: ["Daim et mesh", "Semelle confortable", "Taille normalement"]
  },
  {
    id: "saucony-progrid-triumph-4", group: "saucony-progrid-triumph-4",
    name: "Saucony ProGrid Triumph 4", color: "Black / Silver", swatch: "#373637",
    brand: "saucony", category: "chaussures", gender: "unisexe", price: 169,
    sizes: SHOES, soldOutSizes: ["41"], tags: ["new"],
    description: "Le modèle tendance de Saucony, look Y2K et amorti ProGrid.",
    details: ["Amorti ProGrid", "Look Y2K", "Taille normalement"]
  },
  {
    id: "saucony-progrid-omni-9", group: "saucony-progrid-omni-9",
    name: "Saucony ProGrid Omni 9", color: "White / Brown", swatch: "#deddde",
    brand: "saucony", category: "chaussures", gender: "unisexe", price: 159, oldPrice: 179,
    sizes: SHOES,
    description: "Sneaker rétro aux tons chauds, facile à porter.",
    details: ["Amorti ProGrid", "Look rétro", "Taille normalement"]
  },

  /* ---------- ASICS ---------- */
  {
    id: "asics-gel-kayano-14-birch", group: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14", color: "Birch / Pure Silver", swatch: "#8f8b86",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 169,
    sizes: SHOES, tags: ["best"], lowStock: ["44"],
    description: "La Gel-Kayano 14, star du running rétro. Amorti GEL® et détails métalliques.",
    details: ["Amorti GEL®", "Détails métallisés", "Taille normalement"]
  },
  {
    id: "asics-gel-kayano-14-black", group: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14", color: "Black / Pure Silver", swatch: "#2f3032",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 169,
    sizes: SHOES,
    description: "La Gel-Kayano 14 en noir et argent.",
    details: ["Amorti GEL®", "Détails métallisés", "Taille normalement"]
  },
  {
    id: "asics-gel-nyc-khaki", group: "asics-gel-nyc",
    name: "Asics Gel-NYC", color: "Khaki / Pure Silver", swatch: "#a9a898",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 159,
    sizes: SHOES, tags: ["new"],
    description: "Inspirée des archives Asics, la Gel-NYC mélange plusieurs modèles cultes.",
    details: ["Amorti GEL®", "Design inspiré des archives", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-clay", group: "asics-gel-1130",
    name: "Asics Gel-1130", color: "White / Clay Canyon", swatch: "#413b38",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129, oldPrice: 149,
    sizes: SHOES,
    description: "Silhouette running des années 2000, légère et polyvalente.",
    details: ["Amorti GEL®", "Légère", "Taille normalement"]
  },

  /* ---------- C.P. COMPANY ---------- */
  {
    id: "cp-goggle-down-brown", group: "cp-goggle-down",
    name: "Doudoune C.P. Company Eco-Chrome R Goggle", color: "Re-Color Brown", swatch: "#55422e",
    brand: "cpcompany", category: "doudounes", gender: "homme", price: 1190,
    sizes: JACKETS, tags: ["new"], lowStock: ["L"],
    description: "La doudoune C.P. Company iconique, avec les lunettes Goggle intégrées à la capuche. Nylon Eco-Chrome R teint en pièce, garnissage duvet.",
    details: ["Lunettes Goggle sur la capuche", "Nylon Eco-Chrome R", "Garnissage duvet"]
  },
  {
    id: "cp-dd-shell-puffer-flint", group: "cp-dd-shell-puffer",
    name: "Doudoune C.P. Company D.D. Shell", color: "Flint Grey", swatch: "#8f8d82",
    brand: "cpcompany", category: "doudounes", gender: "homme", price: 649,
    sizes: JACKETS, tags: ["best"],
    description: "Doudoune à capuche en nylon D.D. Shell, matelassage carré et lentille signature sur la manche.",
    details: ["Lentille signature sur la manche", "Nylon D.D. Shell", "Garnissage duvet", "Taille normalement"]
  },
  {
    id: "cp-dd-shell-puffer-andorra", group: "cp-dd-shell-puffer",
    name: "Doudoune C.P. Company D.D. Shell", color: "Andorra", swatch: "#3c1817",
    brand: "cpcompany", category: "doudounes", gender: "homme", price: 649,
    sizes: JACKETS, soldOutSizes: ["S"],
    description: "La doudoune D.D. Shell dans un rouge profond, lentille signature sur la manche.",
    details: ["Lentille signature sur la manche", "Nylon D.D. Shell", "Garnissage duvet"]
  },
  {
    id: "cp-explorer-lens-down-blue", group: "cp-explorer-lens-down",
    name: "Doudoune C.P. Company Explorer Lens", color: "Orion Blue", swatch: "#1e2832",
    brand: "cpcompany", category: "doudounes", gender: "homme", price: 699, oldPrice: 749,
    sizes: JACKETS,
    description: "Doudoune Explorer en nylon D.D. Shell, lentille intégrée à la capuche.",
    details: ["Lentille intégrée à la capuche", "Nylon D.D. Shell", "Garnissage duvet"]
  },

  /* ---------- ON — chaussures (Cloudtilt, Cloudtilt Arc, Cloudtilt Remix, Cloudsurfer Max) ---------- */
  {
    id: "on-cloudsurfer-max-m-3mf30434727", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Iceberg / Olive", swatch: "#3f5257",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M, tags: ["best"],
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30435103", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Brook / Ivory", swatch: "#aeb8b8",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M, tags: ["best"],
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30436015", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Ivory / Dustrose", swatch: "#c1b6ab",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30435065", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Ivory / Dijon", swatch: "#d3bc7f",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30433053", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Midnight / Ivory", swatch: "#3e4558",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30435168", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Saffron / Squash", swatch: "#e89751",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30430924", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "White / Ivory", swatch: "#c8c6c6",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30430106", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Black / Eclipse", swatch: "#212721",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30434731", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "Olive / Seedling", swatch: "#727260",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-m-3mf30431200", group: "on-cloudsurfer-max-m",
    name: "On Cloudsurfer Max Homme", color: "White / White", swatch: "#c6beb6",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30224734", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Seedling / Olive", swatch: "#4e4c40",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F, tags: ["best"],
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30221200", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "White / White", swatch: "#b8b6b0",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F, tags: ["best"],
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225076", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "White / Camellia", swatch: "#e3d6d7",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30220106", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Black / Eclipse", swatch: "#1c241c",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225262", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Ivory / Flurry", swatch: "#aec3c3",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225066", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Dijon / Ivory", swatch: "#d7ccb8",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225073", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Foxglove / Ivory", swatch: "#c2b5bf",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225156", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Squash / Saffron", swatch: "#e5803a",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudsurfer-max-w-3wf30225074", group: "on-cloudsurfer-max-w",
    name: "On Cloudsurfer Max Femme", color: "Pebble / Oyster", swatch: "#8e7e81",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "Amorti maximal et déroulé fluide : la Cloudsurfer Max pour courir ou marcher longtemps sans fatigue.",
    details: ["Amorti maximal CloudTec Phase®", "Mousse Helion™", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-m-3mg30335104", group: "on-cloudtilt-arc-m",
    name: "On Cloudtilt Arc Homme", color: "Ox / Pebble", swatch: "#2b2326",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M, tags: ["best"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-m-3mg30333228", group: "on-cloudtilt-arc-m",
    name: "On Cloudtilt Arc Homme", color: "Alloy / Ivory", swatch: "#b4b5b8",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M, tags: ["best"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-m-3mg30335226", group: "on-cloudtilt-arc-m",
    name: "On Cloudtilt Arc Homme", color: "Bark / Sable", swatch: "#433d3a",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M, tags: ["new"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-m-3mg30335224", group: "on-cloudtilt-arc-m",
    name: "On Cloudtilt Arc Homme", color: "Grain / Ivory", swatch: "#c3b7a5",
    brand: "on", category: "chaussures", gender: "homme", price: 180,
    sizes: SHOES_M,
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-w-3wg30315104", group: "on-cloudtilt-arc-w",
    name: "On Cloudtilt Arc Femme", color: "Ox / Pebble", swatch: "#645a5b",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F, tags: ["best"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-w-3wg30315227", group: "on-cloudtilt-arc-w",
    name: "On Cloudtilt Arc Femme", color: "Biscuit / Sable", swatch: "#896f67",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F, tags: ["best"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-w-3wg30313228", group: "on-cloudtilt-arc-w",
    name: "On Cloudtilt Arc Femme", color: "Alloy / Ivory", swatch: "#b7b8bb",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F, tags: ["new"],
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-arc-w-3wg30315224", group: "on-cloudtilt-arc-w",
    name: "On Cloudtilt Arc Femme", color: "Grain / Ivory", swatch: "#ccc1af",
    brand: "on", category: "chaussures", gender: "femme", price: 180,
    sizes: SHOES_F,
    description: "La Cloudtilt revisitée : silhouette plus affirmée, lignes Arc et même amorti CloudTec Phase® ultra-doux.",
    details: ["Amorti CloudTec Phase®", "Silhouette Arc", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10105217", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Grain / White", swatch: "#b8b5af",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M, tags: ["best"],
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10104843", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Olive / Desert", swatch: "#9f958a",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M, tags: ["best"],
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10105216", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Platinum / Midnight", swatch: "#2c2d36",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10100264", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Eclipse / Black", swatch: "#23252a",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10105292", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Tide / White", swatch: "#b1bbbc",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10104908", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Tundra / Black", swatch: "#311e23",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10100041", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Storm / White", swatch: "#cdcece",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10105119", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Fen / Grain", swatch: "#23231e",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10101485", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Sand / Ivory", swatch: "#a6878b",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10105218", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Eclipse / Jay", swatch: "#2a2e36",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10103740", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Glacier / Ice", swatch: "#c9c7c3",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10102531", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Pearl / Ice", swatch: "#c9c6bf",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3me10101430", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Black / Ivory", swatch: "#d0d0ce",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-m-3mg31030777", group: "on-cloudtilt-m",
    name: "On Cloudtilt Homme", color: "Black / Glacier", swatch: "#2c2c2d",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10271430", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Black / Ivory", swatch: "#1a1c1f",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M, tags: ["best"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10275230", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Autumn / Ivory", swatch: "#c3aba5",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M, tags: ["best"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10270924", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "White / Ivory", swatch: "#cacbcc",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M, tags: ["new"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10271043", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Black / Black", swatch: "#26282c",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10273228", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Alloy / Ivory", swatch: "#b8b6ae",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10275228", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Ash / Espresso", swatch: "#a3a09e",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10271536", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Glacier / Alloy", swatch: "#888c92",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-m-3mg10271392", group: "on-cloudtilt-remix-m",
    name: "On Cloudtilt Remix Homme", color: "Glacier / Storm", swatch: "#aaacac",
    brand: "on", category: "chaussures", gender: "homme", price: 170,
    sizes: SHOES_M,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10241430", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Black / Ivory", swatch: "#1a1c1f",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F, tags: ["best"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10243147", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Silver / Ivory", swatch: "#aea8a2",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F, tags: ["best"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10245085", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Camellia / Ivory", swatch: "#c0969d",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F, tags: ["new"],
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10244905", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Verbana / Ivory", swatch: "#cdbcd0",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10244556", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Orchid / Ivory", swatch: "#c1b4be",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10240938", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Glacier / Wash", swatch: "#bcbeb4",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10243228", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Alloy / Ivory", swatch: "#b8b6ae",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-remix-w-3wg10241043", group: "on-cloudtilt-remix-w",
    name: "On Cloudtilt Remix Femme", color: "Black / Black", swatch: "#232427",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "La Cloudtilt en version Remix : tige retravaillée au look rétro-tech, amorti CloudTec Phase®.",
    details: ["Amorti CloudTec Phase®", "Tige Remix rétro-tech", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10050264", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Eclipse / Black", swatch: "#303339",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F, tags: ["best"],
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10055221", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Biscuit / Ivory", swatch: "#b4aaa9",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F, tags: ["best"],
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10055258", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Ether / Ivory", swatch: "#b3abb1",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10050924", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "White / Ivory", swatch: "#cac8c7",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10054846", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Heron / Dew", swatch: "#c4bebe",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10056055", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Cinder / Iceberg", swatch: "#948d86",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10056130", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Frost / Salt", swatch: "#a7a7a7",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10055220", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "White / Bran", swatch: "#cac9bc",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10053343", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Alloy / Silver", swatch: "#bbb7b9",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10051430", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Black / Ivory", swatch: "#d2d3cf",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10054844", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Marsh / Heather", swatch: "#aaafba",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },
  {
    id: "on-cloudtilt-w-3we10052531", group: "on-cloudtilt-w",
    name: "On Cloudtilt Femme", color: "Pearl / Ice", swatch: "#c7c4bc",
    brand: "on", category: "chaussures", gender: "femme", price: 170,
    sizes: SHOES_F,
    description: "Le modèle lifestyle d'On : amorti CloudTec Phase® ultra-doux et silhouette épurée, pour marcher toute la journée.",
    details: ["Amorti CloudTec Phase®", "Tige en maille légère", "Ultra-légère", "Taille normalement"]
  },

  /* ---------- ENSEMBLES — nouveautés (UGG, Nocta, Lululemon, Alo, On femme) ---------- */
  {
    id: "ugg-tasman-set-black", group: "ugg-tasman-set",
    name: "Ensemble UGG Tasman Hoodie + Jogger", color: "Black", swatch: "#1f1b1d",
    brand: "ugg", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le hoodie et le jogging UGG Tasman assortis, en molleton doux avec les finitions tressées signature de la Tasman.",
    details: ["Hoodie + jogging", "Molleton doux", "Bordures tressées Tasman", "Coupe relax"]
  },
  {
    id: "ugg-tasman-set-dusty-rose", group: "ugg-tasman-set",
    name: "Ensemble UGG Tasman Hoodie + Jogger", color: "Dusty Rose", swatch: "#c58f8c",
    brand: "ugg", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["new"],
    description: "Le hoodie et le jogging UGG Tasman assortis, en molleton doux avec les finitions tressées signature de la Tasman.",
    details: ["Hoodie + jogging", "Molleton doux", "Bordures tressées Tasman", "Coupe relax"]
  },
  {
    id: "ugg-tasman-set-green", group: "ugg-tasman-set",
    name: "Ensemble UGG Tasman Hoodie + Jogger", color: "Green", swatch: "#5f7873",
    brand: "ugg", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    description: "Le hoodie et le jogging UGG Tasman assortis, en molleton doux avec les finitions tressées signature de la Tasman.",
    details: ["Hoodie + jogging", "Molleton doux", "Bordures tressées Tasman", "Coupe relax"]
  },
  {
    id: "nocta-cs-set-black", group: "nocta-cs-set",
    name: "Ensemble Nocta Fleece CS Hoodie + Sweatpant", color: "Black", swatch: "#232227",
    brand: "nocta", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["best"],
    description: "Le survêtement Nocta (Nike x Drake) en molleton épais : hoodie oversize et jogging assortis, logo brodé.",
    details: ["Hoodie + jogging", "Molleton épais", "Coupe oversize", "Logo Nocta brodé"]
  },
  {
    id: "nocta-cs-set-dark-grey", group: "nocta-cs-set",
    name: "Ensemble Nocta Fleece CS Hoodie + Sweatpant", color: "Dark Grey", swatch: "#a8a5a4",
    brand: "nocta", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement Nocta (Nike x Drake) en molleton épais : hoodie oversize et jogging assortis, logo brodé.",
    details: ["Hoodie + jogging", "Molleton épais", "Coupe oversize", "Logo Nocta brodé"]
  },
  {
    id: "nocta-cs-set-work-blue", group: "nocta-cs-set",
    name: "Ensemble Nocta Fleece CS Hoodie + Sweatpant", color: "Work Blue", swatch: "#5b7aa7",
    brand: "nocta", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["new"],
    description: "Le survêtement Nocta (Nike x Drake) en molleton épais : hoodie oversize et jogging assortis, logo brodé.",
    details: ["Hoodie + jogging", "Molleton épais", "Coupe oversize", "Logo Nocta brodé"]
  },
  {
    id: "lulu-steady-state-set-black", group: "lulu-steady-state-set",
    name: "Ensemble Lululemon Steady State Hoodie + Jogger", color: "Black", swatch: "#1b181b",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 229,
    sizes: CLOTHING, tags: ["best"],
    description: "Hoodie et jogger Lululemon Steady State en molleton SuperLoft, ultra-doux et chaud.",
    details: ["Hoodie + jogger", "Molleton SuperLoft", "Coupe classique", "Taille normalement"]
  },
  {
    id: "lulu-steady-state-set-true-navy", group: "lulu-steady-state-set",
    name: "Ensemble Lululemon Steady State Hoodie + Jogger", color: "True Navy", swatch: "#242430",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 229,
    sizes: CLOTHING,
    description: "Hoodie et jogger Lululemon Steady State en molleton SuperLoft, ultra-doux et chaud.",
    details: ["Hoodie + jogger", "Molleton SuperLoft", "Coupe classique", "Taille normalement"]
  },
  {
    id: "lulu-steady-state-set-light-ivory", group: "lulu-steady-state-set",
    name: "Ensemble Lululemon Steady State Hoodie + Jogger", color: "Light Ivory", swatch: "#ccc3b7",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 229,
    sizes: CLOTHING, tags: ["new"],
    description: "Hoodie et jogger Lululemon Steady State en molleton SuperLoft, ultra-doux et chaud.",
    details: ["Hoodie + jogger", "Molleton SuperLoft", "Coupe classique", "Taille normalement"]
  },
  {
    id: "lulu-steady-state-set-nomad", group: "lulu-steady-state-set",
    name: "Ensemble Lululemon Steady State Hoodie + Jogger", color: "Nomad", swatch: "#41352f",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 229,
    sizes: CLOTHING,
    description: "Hoodie et jogger Lululemon Steady State en molleton SuperLoft, ultra-doux et chaud.",
    details: ["Hoodie + jogger", "Molleton SuperLoft", "Coupe classique", "Taille normalement"]
  },
  {
    id: "lulu-scuba-set-light-ivory", group: "lulu-scuba-set",
    name: "Ensemble Lululemon Scuba Full-Zip + Wide-Leg", color: "Light Ivory", swatch: "#d2c2b3",
    brand: "lululemon", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le duo viral Lululemon : veste Scuba oversize zippée et pantalon Scuba large, en molleton coton doux.",
    details: ["Veste zippée + pantalon large", "Molleton coton doux", "Coupe oversize", "Taille normalement"]
  },
  {
    id: "lulu-scuba-set-porcelain-pink", group: "lulu-scuba-set",
    name: "Ensemble Lululemon Scuba Full-Zip + Wide-Leg", color: "Porcelain Pink", swatch: "#a3898d",
    brand: "lululemon", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["new"],
    description: "Le duo viral Lululemon : veste Scuba oversize zippée et pantalon Scuba large, en molleton coton doux.",
    details: ["Veste zippée + pantalon large", "Molleton coton doux", "Coupe oversize", "Taille normalement"]
  },
  {
    id: "lulu-scuba-set-graphite-grey", group: "lulu-scuba-set",
    name: "Ensemble Lululemon Scuba Full-Zip + Wide-Leg", color: "Graphite Grey", swatch: "#363336",
    brand: "lululemon", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    description: "Le duo viral Lululemon : veste Scuba oversize zippée et pantalon Scuba large, en molleton coton doux.",
    details: ["Veste zippée + pantalon large", "Molleton coton doux", "Coupe oversize", "Taille normalement"]
  },
  {
    id: "lulu-softstreme-set-black", group: "lulu-softstreme-set",
    name: "Ensemble Lululemon Softstreme Half-Zip + Pant", color: "Black", swatch: "#272729",
    brand: "lululemon", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    description: "Sweat demi-zip et pantalon taille haute Lululemon Softstreme, matière fluide et ultra-douce.",
    details: ["Demi-zip + pantalon", "Tissu Softstreme fluide", "Taille haute"]
  },
  {
    id: "lulu-softstreme-set-light-ivory", group: "lulu-softstreme-set",
    name: "Ensemble Lululemon Softstreme Half-Zip + Pant", color: "Light Ivory", swatch: "#160e10",
    brand: "lululemon", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["new"],
    description: "Sweat demi-zip et pantalon taille haute Lululemon Softstreme, matière fluide et ultra-douce.",
    details: ["Demi-zip + pantalon", "Tissu Softstreme fluide", "Taille haute"]
  },
  {
    id: "alo-muse-set-ivory", group: "alo-muse-set",
    name: "Ensemble Alo Muse Hoodie + Sweatpant", color: "Ivory", swatch: "#a78977",
    brand: "alo", category: "ensembles", gender: "femme", price: 279,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le set Alo Muse pour femme : hoodie et sweatpant assortis, molleton brossé et coupe relax.",
    details: ["Hoodie + sweatpant", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-muse-set-athletic-heather-grey", group: "alo-muse-set",
    name: "Ensemble Alo Muse Hoodie + Sweatpant", color: "Athletic Heather Grey", swatch: "#a1a09e",
    brand: "alo", category: "ensembles", gender: "femme", price: 279,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    description: "Le set Alo Muse pour femme : hoodie et sweatpant assortis, molleton brossé et coupe relax.",
    details: ["Hoodie + sweatpant", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-muse-set-navy", group: "alo-muse-set",
    name: "Ensemble Alo Muse Hoodie + Sweatpant", color: "Navy", swatch: "#172636",
    brand: "alo", category: "ensembles", gender: "femme", price: 279,
    sizes: ["XXS", "XS", "S", "M", "L", "XL"], tags: ["new"],
    description: "Le set Alo Muse pour femme : hoodie et sweatpant assortis, molleton brossé et coupe relax.",
    details: ["Hoodie + sweatpant", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "on-club-set-w-flurry", group: "on-club-set-w",
    name: "Ensemble On Club Hoodie + Pants Femme", color: "Flurry", swatch: "#c2dddb",
    brand: "on", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Hoodie et pantalon On Club pour femme, coton bio et polyester recyclé, logo On. Coupe relax pour tous les jours.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-w-bubblegum", group: "on-club-set-w",
    name: "Ensemble On Club Hoodie + Pants Femme", color: "Bubblegum", swatch: "#e77ea5",
    brand: "on", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XS", "S", "M", "L", "XL"], tags: ["new"],
    description: "Hoodie et pantalon On Club pour femme, coton bio et polyester recyclé, logo On. Coupe relax pour tous les jours.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-w-barberry", group: "on-club-set-w",
    name: "Ensemble On Club Hoodie + Pants Femme", color: "Barberry", swatch: "#864e50",
    brand: "on", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Hoodie et pantalon On Club pour femme, coton bio et polyester recyclé, logo On. Coupe relax pour tous les jours.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-w-crater", group: "on-club-set-w",
    name: "Ensemble On Club Hoodie + Pants Femme", color: "Crater", swatch: "#d5d5d5",
    brand: "on", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Hoodie et pantalon On Club pour femme, coton bio et polyester recyclé, logo On. Coupe relax pour tous les jours.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-w-black", group: "on-club-set-w",
    name: "Ensemble On Club Hoodie + Pants Femme", color: "Black", swatch: "#1d1d21",
    brand: "on", category: "ensembles", gender: "femme", price: 249,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Hoodie et pantalon On Club pour femme, coton bio et polyester recyclé, logo On. Coupe relax pour tous les jours.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },

  /* ---------- ACCESSOIRES — casquettes, bonnets, chaussettes, caleçons ---------- */
  {
    id: "alo-cap-black", group: "alo-cap",
    name: "Casquette Alo Off-Duty", color: "Black", swatch: "#1d1d1d",
    brand: "alo", category: "accessoires", gender: "unisexe", type: "casquettes", price: 58,
    sizes: TU, tags: ["best"],
    description: "La casquette Alo Off-Duty, logo brodé, réglable.",
    details: ["Logo Alo brodé", "Réglable", "Taille unique"]
  },
  {
    id: "alo-cap-bright-white", group: "alo-cap",
    name: "Casquette Alo Off-Duty", color: "Bright White", swatch: "#f1f1f2",
    brand: "alo", category: "accessoires", gender: "unisexe", type: "casquettes", price: 58,
    sizes: TU,
    description: "La casquette Alo Off-Duty, logo brodé, réglable.",
    details: ["Logo Alo brodé", "Réglable", "Taille unique"]
  },
  {
    id: "alo-cap-sand-dollar", group: "alo-cap",
    name: "Casquette Alo Off-Duty", color: "Sand Dollar", swatch: "#e8dacc",
    brand: "alo", category: "accessoires", gender: "unisexe", type: "casquettes", price: 58,
    sizes: TU, tags: ["new"],
    description: "La casquette Alo Off-Duty, logo brodé, réglable.",
    details: ["Logo Alo brodé", "Réglable", "Taille unique"]
  },
  {
    id: "courreges-cap-ac-black", group: "courreges-cap-ac",
    name: "Casquette Courrèges Signature AC", color: "Black", swatch: "#262729",
    brand: "courreges", category: "accessoires", gender: "unisexe", type: "casquettes", price: 150,
    sizes: TU, tags: ["best"],
    description: "Casquette Courrèges en coton, logo AC brodé.",
    details: ["Coton", "Logo AC brodé", "Réglable"]
  },
  {
    id: "courreges-cap-ac-4010", group: "courreges-cap-ac",
    name: "Casquette Courrèges Signature AC", color: "Burgundy", swatch: "#44242c",
    brand: "courreges", category: "accessoires", gender: "unisexe", type: "casquettes", price: 150,
    sizes: TU,
    description: "Casquette Courrèges en coton, logo AC brodé.",
    details: ["Coton", "Logo AC brodé", "Réglable"]
  },
  {
    id: "courreges-cap-vinyl-black", group: "courreges-cap-vinyl",
    name: "Casquette Courrèges ReEdition Vinyl", color: "Black", swatch: "#343233",
    brand: "courreges", category: "accessoires", gender: "unisexe", type: "casquettes", price: 175,
    sizes: TU, tags: ["new"],
    description: "La casquette en vinyle iconique de Courrèges.",
    details: ["Vinyle", "Logo AC", "Réglable"]
  },
  {
    id: "courreges-cap-vinyl-4010", group: "courreges-cap-vinyl",
    name: "Casquette Courrèges ReEdition Vinyl", color: "Burgundy", swatch: "#3d2728",
    brand: "courreges", category: "accessoires", gender: "unisexe", type: "casquettes", price: 175,
    sizes: TU,
    description: "La casquette en vinyle iconique de Courrèges.",
    details: ["Vinyle", "Logo AC", "Réglable"]
  },
  {
    id: "sweetpants-beanie-grey", group: "sweetpants-beanie",
    name: "Bonnet Sweet Pants Logo", color: "Heather Grey", swatch: "#363236",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "bonnets", price: 49,
    sizes: TU, tags: ["best"],
    description: "Le bonnet Sweet Pants, patch logo, de la marque de jogging parisienne.",
    details: ["Maille côtelée", "Patch logo", "Taille unique"]
  },
  {
    id: "sweetpants-beanie-navy", group: "sweetpants-beanie",
    name: "Bonnet Sweet Pants Logo", color: "Navy", swatch: "#141118",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "bonnets", price: 49,
    sizes: TU,
    description: "Le bonnet Sweet Pants, patch logo, de la marque de jogging parisienne.",
    details: ["Maille côtelée", "Patch logo", "Taille unique"]
  },
  {
    id: "columbia-mesh-snapback-blab", group: "columbia-mesh-snapback",
    name: "Casquette Columbia Mesh Snapback", color: "Black", swatch: "#454b6c",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU, tags: ["best"],
    description: "La casquette trucker Columbia, filet respirant et patch logo.",
    details: ["Filet respirant", "Patch logo Columbia", "Fermeture snapback"]
  },
  {
    id: "columbia-mesh-snapback-shcoctwi", group: "columbia-mesh-snapback",
    name: "Casquette Columbia Mesh Snapback", color: "Shark / Collegiate Navy", swatch: "#494446",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU,
    description: "La casquette trucker Columbia, filet respirant et patch logo.",
    details: ["Filet respirant", "Patch logo Columbia", "Fermeture snapback"]
  },
  {
    id: "columbia-mesh-snapback-shpucoctwi", group: "columbia-mesh-snapback",
    name: "Casquette Columbia Mesh Snapback", color: "Shark / Purple", swatch: "#b5aeb7",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU,
    description: "La casquette trucker Columbia, filet respirant et patch logo.",
    details: ["Filet respirant", "Patch logo Columbia", "Fermeture snapback"]
  },
  {
    id: "columbia-tree-flag-bk", group: "columbia-tree-flag",
    name: "Casquette Columbia Tree Flag Trucker", color: "Black", swatch: "#1f2020",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU,
    description: "Casquette trucker Columbia avec le patch drapeau-sapin emblématique.",
    details: ["Filet respirant", "Patch Tree Flag", "Fermeture snapback"]
  },
  {
    id: "columbia-tree-flag-colnava", group: "columbia-tree-flag",
    name: "Casquette Columbia Tree Flag Trucker", color: "Collegiate Navy", swatch: "#bbbec3",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU,
    description: "Casquette trucker Columbia avec le patch drapeau-sapin emblématique.",
    details: ["Filet respirant", "Patch Tree Flag", "Fermeture snapback"]
  },
  {
    id: "columbia-tree-flag-mosgre", group: "columbia-tree-flag",
    name: "Casquette Columbia Tree Flag Trucker", color: "Moss Green", swatch: "#363525",
    brand: "columbia", category: "accessoires", gender: "unisexe", type: "casquettes", price: 35,
    sizes: TU, tags: ["new"],
    description: "Casquette trucker Columbia avec le patch drapeau-sapin emblématique.",
    details: ["Filet respirant", "Patch Tree Flag", "Fermeture snapback"]
  },
  {
    id: "cp-goggle-beanie-black", group: "cp-goggle-beanie",
    name: "Bonnet C.P. Company Goggle", color: "Black", swatch: "#131316",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 120,
    sizes: TU, tags: ["best"],
    description: "Le bonnet C.P. Company en laine mérinos extra-fine avec les lunettes Goggle signature.",
    details: ["Laine mérinos extra-fine", "Lunettes Goggle", "Taille unique"]
  },
  {
    id: "cp-goggle-beanie-fallen-rock", group: "cp-goggle-beanie",
    name: "Bonnet C.P. Company Goggle", color: "Fallen Rock", swatch: "#595453",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 120,
    sizes: TU,
    description: "Le bonnet C.P. Company en laine mérinos extra-fine avec les lunettes Goggle signature.",
    details: ["Laine mérinos extra-fine", "Lunettes Goggle", "Taille unique"]
  },
  {
    id: "cp-goggle-beanie-andorra", group: "cp-goggle-beanie",
    name: "Bonnet C.P. Company Goggle", color: "Andorra", swatch: "#30090d",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 120,
    sizes: TU, tags: ["new"],
    description: "Le bonnet C.P. Company en laine mérinos extra-fine avec les lunettes Goggle signature.",
    details: ["Laine mérinos extra-fine", "Lunettes Goggle", "Taille unique"]
  },
  {
    id: "cp-lens-beanie-black", group: "cp-lens-beanie",
    name: "Bonnet C.P. Company Lens", color: "Black", swatch: "#050507",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 95,
    sizes: TU,
    description: "Bonnet C.P. Company en laine mérinos extra-fine, lentille signature.",
    details: ["Laine mérinos extra-fine", "Lentille signature", "Taille unique"]
  },
  {
    id: "cp-lens-beanie-moon-melange", group: "cp-lens-beanie",
    name: "Bonnet C.P. Company Lens", color: "Moon Melange", swatch: "#a4a7ac",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 95,
    sizes: TU,
    description: "Bonnet C.P. Company en laine mérinos extra-fine, lentille signature.",
    details: ["Laine mérinos extra-fine", "Lentille signature", "Taille unique"]
  },
  {
    id: "cp-lens-beanie-gauze-white", group: "cp-lens-beanie",
    name: "Bonnet C.P. Company Lens", color: "Gauze White", swatch: "#eee4d7",
    brand: "cpcompany", category: "accessoires", gender: "unisexe", type: "bonnets", price: 95,
    sizes: TU,
    description: "Bonnet C.P. Company en laine mérinos extra-fine, lentille signature.",
    details: ["Laine mérinos extra-fine", "Lentille signature", "Taille unique"]
  },
  {
    id: "rl-pony-beanie-90511020", group: "rl-pony-beanie",
    name: "Bonnet Polo Ralph Lauren Signature Pony", color: "Navy", swatch: "#1d2139",
    brand: "ralphlauren", category: "accessoires", gender: "unisexe", type: "bonnets", price: 85,
    sizes: TU, tags: ["best"],
    description: "Bonnet Polo Ralph Lauren en laine, Pony brodé.",
    details: ["Laine", "Pony brodé", "Taille unique"]
  },
  {
    id: "rl-pony-beanie-90511002", group: "rl-pony-beanie",
    name: "Bonnet Polo Ralph Lauren Signature Pony", color: "Charcoal", swatch: "#1f2124",
    brand: "ralphlauren", category: "accessoires", gender: "unisexe", type: "bonnets", price: 85,
    sizes: TU,
    description: "Bonnet Polo Ralph Lauren en laine, Pony brodé.",
    details: ["Laine", "Pony brodé", "Taille unique"]
  },
  {
    id: "rl-pony-beanie-90511040", group: "rl-pony-beanie",
    name: "Bonnet Polo Ralph Lauren Signature Pony", color: "Black", swatch: "#1d1b1c",
    brand: "ralphlauren", category: "accessoires", gender: "unisexe", type: "bonnets", price: 85,
    sizes: TU,
    description: "Bonnet Polo Ralph Lauren en laine, Pony brodé.",
    details: ["Laine", "Pony brodé", "Taille unique"]
  },
  {
    id: "rl-bear-beanie", group: "rl-bear-beanie",
    name: "Bonnet Polo Ralph Lauren Polo Bear", color: "Cream", swatch: "#1f2224",
    brand: "ralphlauren", category: "accessoires", gender: "unisexe", type: "bonnets", price: 129,
    sizes: TU, tags: ["new"],
    description: "Bonnet côtelé Polo Ralph Lauren avec le Polo Bear brodé.",
    details: ["Laine mélangée", "Polo Bear", "Taille unique"]
  },
  {
    id: "alo-throwback-sock-white", group: "alo-throwback-sock",
    name: "Chaussettes Alo Throwback Half-Crew", color: "White / Black", swatch: "#e4e4e4",
    brand: "alo", category: "accessoires", gender: "unisexe", type: "chaussettes", price: 25,
    sizes: ["S", "M", "L"],
    description: "Chaussettes Alo mi-hautes à rayures rétro, maille douce et respirante.",
    details: ["Maille douce", "Rayures rétro", "Mi-hautes"]
  },
  {
    id: "alo-throwback-sock-black", group: "alo-throwback-sock",
    name: "Chaussettes Alo Throwback Half-Crew", color: "Black / White", swatch: "#0c0c0c",
    brand: "alo", category: "accessoires", gender: "unisexe", type: "chaussettes", price: 25,
    sizes: ["S", "M", "L"],
    description: "Chaussettes Alo mi-hautes à rayures rétro, maille douce et respirante.",
    details: ["Maille douce", "Rayures rétro", "Mi-hautes"]
  },
  {
    id: "lulu-daily-sock-white", group: "lulu-daily-sock",
    name: "Chaussettes Lululemon Daily Essential Quarter", color: "White", swatch: "#e8e8e8",
    brand: "lululemon", category: "accessoires", gender: "unisexe", type: "chaussettes", price: 18,
    sizes: ["S", "M", "L"], tags: ["best"],
    description: "Chaussettes Lululemon courtes du quotidien, confortables et durables.",
    details: ["Coton mélangé", "Hauteur quart", "Logo Lululemon"]
  },
  {
    id: "lulu-daily-sock-light-ivory", group: "lulu-daily-sock",
    name: "Chaussettes Lululemon Daily Essential Quarter", color: "Light Ivory", swatch: "#e7e0d3",
    brand: "lululemon", category: "accessoires", gender: "unisexe", type: "chaussettes", price: 18,
    sizes: ["S", "M", "L"],
    description: "Chaussettes Lululemon courtes du quotidien, confortables et durables.",
    details: ["Coton mélangé", "Hauteur quart", "Logo Lululemon"]
  },
  {
    id: "lulu-power-stride-sock", group: "lulu-power-stride-sock",
    name: "Chaussettes Lululemon Power Stride Crew", color: "Graphite Grey / Black", swatch: "#282629",
    brand: "lululemon", category: "accessoires", gender: "unisexe", type: "chaussettes", price: 24,
    sizes: ["S", "M", "L"], tags: ["new"],
    description: "Chaussettes Lululemon Power Stride, maintien de la voûte et zones respirantes.",
    details: ["Maintien de la voûte", "Zones respirantes", "Hauteur crew"]
  },
  {
    id: "alo-boxer-black", group: "alo-boxer",
    name: "Caleçon Alo Day and Night Boxer", color: "Black", swatch: "#161617",
    brand: "alo", category: "accessoires", gender: "homme", type: "calecons", price: 39,
    sizes: CLOTHING.slice(1), tags: ["best"],
    description: "Le boxer Alo Day and Night, tissu doux et extensible pour le jour comme la nuit.",
    details: ["Tissu doux et extensible", "Ceinture logo Alo", "Coupe boxer"]
  },
  {
    id: "alo-boxer-grey", group: "alo-boxer",
    name: "Caleçon Alo Day and Night Boxer", color: "Grey", swatch: "#636164",
    brand: "alo", category: "accessoires", gender: "homme", type: "calecons", price: 39,
    sizes: CLOTHING.slice(1),
    description: "Le boxer Alo Day and Night, tissu doux et extensible pour le jour comme la nuit.",
    details: ["Tissu doux et extensible", "Ceinture logo Alo", "Coupe boxer"]
  },
  {
    id: "alo-boxer-white", group: "alo-boxer",
    name: "Caleçon Alo Day and Night Boxer", color: "White", swatch: "#eff0f2",
    brand: "alo", category: "accessoires", gender: "homme", type: "calecons", price: 39,
    sizes: CLOTHING.slice(1),
    description: "Le boxer Alo Day and Night, tissu doux et extensible pour le jour comme la nuit.",
    details: ["Tissu doux et extensible", "Ceinture logo Alo", "Coupe boxer"]
  },
  {
    id: "lulu-aim-boxer-black", group: "lulu-aim-boxer",
    name: "Caleçons Lululemon Always In Motion (pack de 5)", color: "Black", swatch: "#222224",
    brand: "lululemon", category: "accessoires", gender: "homme", type: "calecons", price: 99,
    sizes: CLOTHING.slice(1), tags: ["best"],
    description: "Le pack de 5 boxers Lululemon Always In Motion, tissu respirant et anti-frottements.",
    details: ["Tissu respirant", "Anti-frottements", "Entrejambe 13 cm (5 pouces)"]
  }
];
