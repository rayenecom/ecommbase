/* ==========================================================
   BASE — Catalogue produits
   ----------------------------------------------------------
   Pour ajouter un produit, copie un bloc { ... } et modifie-le.

   id        : identifiant unique (sans espaces ni accents)
   name      : nom affiché
   brand     : une des clés de BASE_BRANDS ci-dessous
   category  : "ensembles" | "chaussures" | "doudounes"
   price     : prix de vente
   oldPrice  : (optionnel) ancien prix barré -> affiche un badge promo
   sizes     : tailles disponibles
   soldOutSizes : (optionnel) tailles épuisées
   color     : coloris
   images    : (optionnel) liste de photos, ex : ["images/products/essentials-oatmeal-1.jpg"]
               Sans photo, un visuel provisoire est affiché.
   tags      : (optionnel) "new" = Nouveauté, "best" = Best-seller
   soldOut   : (optionnel) true = produit entièrement épuisé
   description : texte de la fiche produit
   ========================================================== */

window.BASE_BRANDS = {
  essentials:  { name: "Essentials",       tint: "#e9e3d8" },
  ralphlauren: { name: "Ralph Lauren",     tint: "#dfe3ea" },
  on:          { name: "On",               tint: "#e4e7e4" },
  alo:         { name: "Alo",              tint: "#ece6e3" },
  salomon:     { name: "Salomon",          tint: "#e2e5e8" },
  mizuno:      { name: "Mizuno",           tint: "#e1e6ee" },
  saucony:     { name: "Saucony",          tint: "#ebe5df" },
  asics:       { name: "Asics",            tint: "#e3e8ec" },
  cpcompany:   { name: "C.P. Company",     tint: "#e2e4df" }
};

window.BASE_CATEGORIES = {
  ensembles:  "Ensembles",
  chaussures: "Chaussures",
  doudounes:  "Doudounes"
};

const SIZES_CLOTHING = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_SHOES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

window.BASE_PRODUCTS = [
  /* ---------------- ESSENTIALS ---------------- */
  {
    id: "essentials-ensemble-dark-oatmeal",
    name: "Ensemble Essentials Hoodie + Jogging — Dark Oatmeal",
    brand: "essentials", category: "ensembles",
    price: 239, sizes: SIZES_CLOTHING, soldOutSizes: ["XS"],
    color: "Dark Oatmeal", tags: ["best"],
    description: "Ensemble Fear of God Essentials composé du hoodie et du jogging assortis. Molleton épais, coupe oversize, logo caoutchouté. Taille grand : prends ta taille habituelle pour un rendu oversize ou une taille en dessous pour un rendu ajusté."
  },
  {
    id: "essentials-ensemble-jet-black",
    name: "Ensemble Essentials Hoodie + Jogging — Jet Black",
    brand: "essentials", category: "ensembles",
    price: 239, sizes: SIZES_CLOTHING,
    color: "Jet Black", tags: ["new"],
    description: "Le classique tout noir. Hoodie et jogging Essentials assortis, molleton épais et coupe oversize signature."
  },
  {
    id: "essentials-ensemble-light-heather-grey",
    name: "Ensemble Essentials Hoodie + Jogging — Light Heather Grey",
    brand: "essentials", category: "ensembles",
    price: 249, oldPrice: 279, sizes: SIZES_CLOTHING,
    color: "Light Heather Grey",
    description: "Ensemble Essentials gris chiné. Hoodie à capuche doublée et jogging à chevilles élastiquées."
  },
  {
    id: "essentials-ensemble-desert-sand",
    name: "Ensemble Essentials Crewneck + Short — Desert Sand",
    brand: "essentials", category: "ensembles",
    price: 189, sizes: SIZES_CLOTHING, soldOutSizes: ["XS", "XXL"],
    color: "Desert Sand", tags: ["new"],
    description: "Version été : sweat col rond et short molleton Essentials assortis."
  },

  /* ---------------- RALPH LAUREN ---------------- */
  {
    id: "ralph-lauren-ensemble-double-knit-navy",
    name: "Ensemble Polo Ralph Lauren Double-Knit — Navy",
    brand: "ralphlauren", category: "ensembles",
    price: 279, sizes: SIZES_CLOTHING,
    color: "Navy", tags: ["best"],
    description: "Ensemble Polo Ralph Lauren en jersey double maille : veste zippée à capuche et jogging assorti, brodé du célèbre Pony."
  },
  {
    id: "ralph-lauren-ensemble-double-knit-grey",
    name: "Ensemble Polo Ralph Lauren Double-Knit — Gris chiné",
    brand: "ralphlauren", category: "ensembles",
    price: 279, sizes: SIZES_CLOTHING,
    color: "Gris chiné",
    description: "Ensemble Polo Ralph Lauren double maille gris chiné. Veste zippée et jogging, Pony brodé contrasté."
  },
  {
    id: "ralph-lauren-ensemble-black",
    name: "Ensemble Polo Ralph Lauren Fleece — Black",
    brand: "ralphlauren", category: "ensembles",
    price: 259, oldPrice: 299, sizes: SIZES_CLOTHING, soldOutSizes: ["S"],
    color: "Black", tags: ["new"],
    description: "Hoodie et jogging Polo Ralph Lauren en molleton, noir avec Pony brodé."
  },

  /* ---------------- ON (chaussures) ---------------- */
  {
    id: "on-cloud-6-all-black",
    name: "On Cloud 6 — All Black",
    brand: "on", category: "chaussures",
    price: 169, sizes: SIZES_SHOES,
    color: "Black / Black", tags: ["best"],
    description: "La On Cloud 6, légère et ultra-confortable au quotidien. Semelle CloudTec®, laçage élastique."
  },
  {
    id: "on-cloud-6-white",
    name: "On Cloud 6 — Undyed White",
    brand: "on", category: "chaussures",
    price: 169, sizes: SIZES_SHOES, soldOutSizes: ["36", "46"],
    color: "Undyed White / White",
    description: "La On Cloud 6 en blanc, idéale pour tous les jours."
  },
  {
    id: "on-cloudmonster-black",
    name: "On Cloudmonster — Black / Magnet",
    brand: "on", category: "chaussures",
    price: 189, sizes: SIZES_SHOES,
    color: "Black / Magnet", tags: ["new"],
    description: "Amorti maximal et sensation de rebond : la Cloudmonster pour courir ou marcher toute la journée."
  },
  {
    id: "on-cloudtilt-ivory",
    name: "On Cloudtilt — Ivory / Black",
    brand: "on", category: "chaussures",
    price: 179, sizes: SIZES_SHOES,
    color: "Ivory / Black",
    description: "Le modèle lifestyle d'On : silhouette épurée et amorti CloudTec Phase®."
  },

  /* ---------------- ON (ensembles) ---------------- */
  {
    id: "on-ensemble-club-hoodie-black",
    name: "Ensemble On Club Hoodie + Pants — Black",
    brand: "on", category: "ensembles",
    price: 229, sizes: SIZES_CLOTHING,
    color: "Black", tags: ["new"],
    description: "Ensemble On en coton bio : hoodie et pantalon assortis, logo On discret."
  },
  {
    id: "on-ensemble-zip-hoodie-grey",
    name: "Ensemble On Zip Hoodie + Sweat Pants — Grey",
    brand: "on", category: "ensembles",
    price: 239, sizes: SIZES_CLOTHING,
    color: "Grey",
    description: "Veste zippée et jogging On, matière douce et respirante."
  },

  /* ---------------- ALO (ensembles) ---------------- */
  {
    id: "alo-ensemble-accolade-black",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant — Black",
    brand: "alo", category: "ensembles",
    price: 249, sizes: SIZES_CLOTHING,
    color: "Black", tags: ["best"],
    description: "Le best-seller Alo : hoodie Accolade et sweatpant assortis, molleton brossé ultra-doux."
  },
  {
    id: "alo-ensemble-accolade-athletic-heather",
    name: "Ensemble Alo Accolade — Athletic Heather Grey",
    brand: "alo", category: "ensembles",
    price: 249, sizes: SIZES_CLOTHING, soldOutSizes: ["XL"],
    color: "Athletic Heather Grey",
    description: "Hoodie Accolade et sweatpant Alo Yoga en gris chiné."
  },
  {
    id: "alo-ensemble-muse-bone",
    name: "Ensemble Alo Muse Hoodie + Sweatpant — Bone",
    brand: "alo", category: "ensembles",
    price: 259, sizes: SIZES_CLOTHING,
    color: "Bone", tags: ["new"],
    description: "Ensemble Alo Muse, coupe relax et coloris crème."
  },

  /* ---------------- ALO (chaussures) ---------------- */
  {
    id: "alo-recovery-mode-sneaker-white",
    name: "Alo Recovery Mode Sneaker — White / Bone",
    brand: "alo", category: "chaussures",
    price: 199, sizes: SIZES_SHOES.slice(0, 9),
    color: "White / Bone", tags: ["new"],
    description: "La sneaker Alo pensée pour le confort : semelle légère et amortissante, look clean."
  },
  {
    id: "alo-sunset-sneaker-black",
    name: "Alo Sunset Sneaker — Black",
    brand: "alo", category: "chaussures",
    price: 189, sizes: SIZES_SHOES.slice(0, 9),
    color: "Black",
    description: "Sneaker Alo au design minimaliste, parfaite avec un ensemble Alo."
  },

  /* ---------------- SALOMON (chaussures) ---------------- */
  {
    id: "salomon-xt-6-black-phantom",
    name: "Salomon XT-6 — Black / Phantom",
    brand: "salomon", category: "chaussures",
    price: 199, sizes: SIZES_SHOES,
    color: "Black / Black / Phantom", tags: ["best"],
    description: "L'icône gorpcore. La XT-6 allie la technicité du trail au style urbain. Laçage Quicklace™."
  },
  {
    id: "salomon-xt-6-vanilla-ice",
    name: "Salomon XT-6 — Vanilla Ice / Almond Milk",
    brand: "salomon", category: "chaussures",
    price: 209, sizes: SIZES_SHOES, soldOutSizes: ["44"],
    color: "Vanilla Ice / Almond Milk",
    description: "La XT-6 dans un coloris clair très recherché."
  },
  {
    id: "salomon-acs-pro-grey",
    name: "Salomon ACS Pro — Lunar Rock / Silver",
    brand: "salomon", category: "chaussures",
    price: 199, sizes: SIZES_SHOES,
    color: "Lunar Rock / Silver", tags: ["new"],
    description: "Silhouette rétro-tech, maintien et amorti pour un look affirmé."
  },
  {
    id: "salomon-speedcross-6-black",
    name: "Salomon Speedcross 6 — Black",
    brand: "salomon", category: "chaussures",
    price: 159, oldPrice: 179, sizes: SIZES_SHOES,
    color: "Black / Black / Phantom",
    description: "Accroche légendaire et look agressif : la Speedcross 6."
  },

  /* ---------------- SALOMON (ensembles) ---------------- */
  {
    id: "salomon-ensemble-outline-black",
    name: "Ensemble Salomon Hoodie + Pants — Deep Black",
    brand: "salomon", category: "ensembles",
    price: 219, sizes: SIZES_CLOTHING,
    color: "Deep Black", tags: ["new"],
    description: "Ensemble Salomon sweat à capuche et pantalon assortis, logo brodé."
  },
  {
    id: "salomon-ensemble-track-grey",
    name: "Ensemble Salomon Track Jacket + Pants — Grey",
    brand: "salomon", category: "ensembles",
    price: 229, sizes: SIZES_CLOTHING,
    color: "Grey",
    description: "Survêtement Salomon technique : veste zippée et pantalon, matière légère et respirante."
  },

  /* ---------------- MIZUNO ---------------- */
  {
    id: "mizuno-wave-rider-10-silver",
    name: "Mizuno Wave Rider 10 — White / Silver",
    brand: "mizuno", category: "chaussures",
    price: 159, sizes: SIZES_SHOES,
    color: "White / Silver", tags: ["best"],
    description: "Le retour du running rétro des années 2000. Plaque Wave pour la stabilité et l'amorti."
  },
  {
    id: "mizuno-wave-prophecy-ls-black",
    name: "Mizuno Wave Prophecy LS — Black",
    brand: "mizuno", category: "chaussures",
    price: 189, sizes: SIZES_SHOES,
    color: "Black / Black", tags: ["new"],
    description: "Semelle Infinity Wave iconique pour un style futuriste."
  },
  {
    id: "mizuno-contender-white-navy",
    name: "Mizuno Contender — White / Navy",
    brand: "mizuno", category: "chaussures",
    price: 139, sizes: SIZES_SHOES,
    color: "White / Navy",
    description: "Silhouette running vintage Mizuno, confortable et légère."
  },

  /* ---------------- SAUCONY ---------------- */
  {
    id: "saucony-shadow-6000-grey",
    name: "Saucony Shadow 6000 — Grey / Silver",
    brand: "saucony", category: "chaussures",
    price: 149, sizes: SIZES_SHOES,
    color: "Grey / Silver", tags: ["best"],
    description: "Classique du running rétro, daim et mesh, semelle confortable."
  },
  {
    id: "saucony-progrid-triumph-4-silver",
    name: "Saucony ProGrid Triumph 4 — Silver / Black",
    brand: "saucony", category: "chaussures",
    price: 159, sizes: SIZES_SHOES, soldOutSizes: ["41"],
    color: "Silver / Black", tags: ["new"],
    description: "Le modèle tendance de Saucony, look Y2K et amorti ProGrid."
  },
  {
    id: "saucony-grid-omni-9-cream",
    name: "Saucony Grid Omni 9 — Cream / Brown",
    brand: "saucony", category: "chaussures",
    price: 139, sizes: SIZES_SHOES,
    color: "Cream / Brown",
    description: "Sneaker rétro aux tons chauds, facile à porter."
  },

  /* ---------------- ASICS ---------------- */
  {
    id: "asics-gel-kayano-14-white-silver",
    name: "Asics Gel-Kayano 14 — White / Pure Silver",
    brand: "asics", category: "chaussures",
    price: 169, sizes: SIZES_SHOES,
    color: "White / Pure Silver", tags: ["best"],
    description: "La Gel-Kayano 14, star du running rétro. Amorti GEL® et détails métalliques."
  },
  {
    id: "asics-gel-nyc-oyster-grey",
    name: "Asics Gel-NYC — Oyster Grey / Carbon",
    brand: "asics", category: "chaussures",
    price: 159, sizes: SIZES_SHOES,
    color: "Oyster Grey / Carbon", tags: ["new"],
    description: "Inspirée des archives Asics, la Gel-NYC mélange plusieurs modèles cultes."
  },
  {
    id: "asics-gel-1130-white-clay",
    name: "Asics Gel-1130 — White / Clay Canyon",
    brand: "asics", category: "chaussures",
    price: 129, oldPrice: 149, sizes: SIZES_SHOES,
    color: "White / Clay Canyon",
    description: "Silhouette running 2000s, légère et polyvalente."
  },
  {
    id: "asics-gt-2160-cream",
    name: "Asics GT-2160 — Cream / Pure Silver",
    brand: "asics", category: "chaussures",
    price: 149, sizes: SIZES_SHOES, soldOutSizes: ["39", "40"],
    color: "Cream / Pure Silver",
    description: "Modèle rétro-running au style technique, très confortable."
  },

  /* ---------------- C.P. COMPANY ---------------- */
  {
    id: "cp-company-doudoune-goggle-black",
    name: "Doudoune C.P. Company Goggle — Black",
    brand: "cpcompany", category: "doudounes",
    price: 549, sizes: SIZES_CLOTHING.slice(1),
    color: "Black", tags: ["best"],
    description: "La doudoune C.P. Company iconique avec lunettes Goggle intégrées à la capuche. Garnissage en duvet, coupe-vent."
  },
  {
    id: "cp-company-doudoune-eco-chrome-navy",
    name: "Doudoune C.P. Company Eco-Chrome R — Navy",
    brand: "cpcompany", category: "doudounes",
    price: 499, sizes: SIZES_CLOTHING.slice(1),
    color: "Total Eclipse", tags: ["new"],
    description: "Doudoune à capuche en nylon Eco-Chrome R, lentille signature sur la manche."
  },
  {
    id: "cp-company-doudoune-nycra-olive",
    name: "Doudoune C.P. Company Nycra-R — Olive",
    brand: "cpcompany", category: "doudounes",
    price: 469, oldPrice: 529, sizes: SIZES_CLOTHING.slice(1), soldOutSizes: ["S"],
    color: "Ivy Green",
    description: "Doudoune légère C.P. Company en Nycra-R, idéale de l'automne au printemps."
  }
];
