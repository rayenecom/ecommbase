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
  },

  /* ---------- RALPH LAUREN — survêtements Polo & RL Fleece ---------- */
  {
    id: "rl-dk-set-black", group: "rl-dk-set",
    name: "Survêtement Polo Ralph Lauren Double-Knit", color: "Black", swatch: "#111111",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 259,
    sizes: CLOTHING, tags: ["best"],
    description: "Le survêtement Polo Ralph Lauren Double-Knit Tech : sweat zippé à capuche et jogging assortis, molleton double maille, Pony brodé.",
    details: ["Sweat zippé à capuche + jogging", "Molleton double maille technique", "Pony brodé", "Taille normalement"]
  },
  {
    id: "rl-dk-set-navy", group: "rl-dk-set",
    name: "Survêtement Polo Ralph Lauren Double-Knit", color: "Navy", swatch: "#1c1d2a",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 259,
    sizes: CLOTHING,
    description: "Le survêtement Polo Ralph Lauren Double-Knit Tech : sweat zippé à capuche et jogging assortis, molleton double maille, Pony brodé.",
    details: ["Sweat zippé à capuche + jogging", "Molleton double maille technique", "Pony brodé", "Taille normalement"]
  },
  {
    id: "rl-dk-set-grey", group: "rl-dk-set",
    name: "Survêtement Polo Ralph Lauren Double-Knit", color: "Grey", swatch: "#a3a29e",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 259,
    sizes: CLOTHING, tags: ["new"],
    description: "Le survêtement Polo Ralph Lauren Double-Knit Tech : sweat zippé à capuche et jogging assortis, molleton double maille, Pony brodé.",
    details: ["Sweat zippé à capuche + jogging", "Molleton double maille technique", "Pony brodé", "Taille normalement"]
  },
  {
    id: "rl-fleece-zip-set-black", group: "rl-fleece-zip-set",
    name: "Ensemble The RL Fleece Zippé + Jogging", color: "Black / Red Pony", swatch: "#13131a",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["best"],
    description: "THE RL FLEECE : sweat zippé à capuche noir et pantalon de jogging assorti, Pony rouge brodé. Le classique Ralph Lauren.",
    details: ["Sweat zippé à capuche + pantalon", "Molleton RL Fleece doux", "Pony rouge brodé", "Taille normalement"]
  },
  {
    id: "rl-fleece-hoodie-black", group: "rl-fleece-hoodie",
    name: "Sweat à capuche The RL Fleece", color: "Black / Red Pony", swatch: "#1e1d1e",
    brand: "ralphlauren", category: "ensembles", gender: "homme", price: 149,
    sizes: CLOTHING, tags: ["new"],
    description: "Le sweat à capuche THE RL FLEECE vendu seul : molleton doux, poche kangourou et Pony rouge brodé.",
    details: ["Sweat à capuche (vendu seul)", "Molleton RL Fleece", "Pony rouge brodé", "Taille normalement"]
  },

  /* ---------- ESSENTIALS — Classic, Signature, Zip, 1977, NBA ---------- */
  {
    id: "essentials-1977-set-dark-oatmeal", group: "essentials-1977-set",
    name: "Ensemble Essentials 1977 Hoodie + Sweatpant", color: "Dark Oatmeal", swatch: "#aaa594",
    brand: "essentials", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["best"],
    description: "Le survêtement culte Essentials « 1977 » (année de naissance de Jerry Lorenzo), floqué en relief sur le hoodie et le jogging.",
    details: ["Hoodie + jogging", "Flocage 1977 en relief", "Molleton épais", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-1977-set-iron", group: "essentials-1977-set",
    name: "Ensemble Essentials 1977 Hoodie + Sweatpant", color: "Iron", swatch: "#312e2f",
    brand: "essentials", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement culte Essentials « 1977 » (année de naissance de Jerry Lorenzo), floqué en relief sur le hoodie et le jogging.",
    details: ["Hoodie + jogging", "Flocage 1977 en relief", "Molleton épais", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-1977-set-light-oatmeal", group: "essentials-1977-set",
    name: "Ensemble Essentials 1977 Hoodie + Sweatpant", color: "Light Oatmeal", swatch: "#dbd6d0",
    brand: "essentials", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement culte Essentials « 1977 » (année de naissance de Jerry Lorenzo), floqué en relief sur le hoodie et le jogging.",
    details: ["Hoodie + jogging", "Flocage 1977 en relief", "Molleton épais", "Coupe ample : taille grand"]
  },

  /* ---------- ON — ensembles Club, Club Collective, Focus Tech ---------- */
  {
    id: "on-club-set-storm", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Storm", swatch: "#386f75",
    brand: "on", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "Hoodie et pantalon On Club assortis, coton bio et polyester recyclé, logo On brodé.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-jay", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Jay", swatch: "#3477b7",
    brand: "on", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "Hoodie et pantalon On Club assortis, coton bio et polyester recyclé, logo On brodé.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-set-desert", group: "on-club-set",
    name: "Ensemble On Club Hoodie + Pants", color: "Desert", swatch: "#ad937a",
    brand: "on", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "Hoodie et pantalon On Club assortis, coton bio et polyester recyclé, logo On brodé.",
    details: ["Hoodie + pantalon", "Coton bio et polyester recyclé", "Logo On", "Coupe relax"]
  },
  {
    id: "on-club-collective-set-crater", group: "on-club-collective-set",
    name: "Ensemble On Club Collective Hoodie + Pants", color: "Crater", swatch: "#d6d4db",
    brand: "on", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING,
    description: "Le survêtement On Club Collective : molleton épais, coupe ample et finitions premium.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-club-collective-set-black", group: "on-club-collective-set",
    name: "Ensemble On Club Collective Hoodie + Pants", color: "Black", swatch: "#0d1010",
    brand: "on", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING,
    description: "Le survêtement On Club Collective : molleton épais, coupe ample et finitions premium.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-club-collective-set-ember", group: "on-club-collective-set",
    name: "Ensemble On Club Collective Hoodie + Pants", color: "Ember", swatch: "#625c5d",
    brand: "on", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING, tags: ["best"],
    description: "Le survêtement On Club Collective : molleton épais, coupe ample et finitions premium.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-focus-tech-set-bark", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Bark", swatch: "#555141",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-shadow", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Shadow", swatch: "#4c4c46",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-black", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Black", swatch: "#171113",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING, tags: ["best"],
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-jay", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Jay", swatch: "#266eb3",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-agave", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Agave", swatch: "#678487",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-navy", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Navy", swatch: "#272f40",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-basalt", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Basalt", swatch: "#8a8e8e",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-desert", group: "on-focus-tech-set",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants", color: "Desert", swatch: "#c4af9a",
    brand: "on", category: "ensembles", gender: "homme", price: 309,
    sizes: CLOTHING,
    description: "Le survêtement On Focus Tech : tissu technique doux et respirant, pensé pour bouger toute la journée.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-club-collective-set-w-clove", group: "on-club-collective-set-w",
    name: "Ensemble On Club Collective Hoodie + Pants Femme", color: "Clove", swatch: "#806559",
    brand: "on", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le survêtement On Club Collective pour femme : molleton épais, coupe ample.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-club-collective-set-w-ember", group: "on-club-collective-set-w",
    name: "Ensemble On Club Collective Hoodie + Pants Femme", color: "Ember", swatch: "#605856",
    brand: "on", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Club Collective pour femme : molleton épais, coupe ample.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-club-collective-set-w-crater", group: "on-club-collective-set-w",
    name: "Ensemble On Club Collective Hoodie + Pants Femme", color: "Crater", swatch: "#d6d6dc",
    brand: "on", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Club Collective pour femme : molleton épais, coupe ample.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-club-collective-set-w-black", group: "on-club-collective-set-w",
    name: "Ensemble On Club Collective Hoodie + Pants Femme", color: "Black", swatch: "#111315",
    brand: "on", category: "ensembles", gender: "femme", price: 299,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Club Collective pour femme : molleton épais, coupe ample.",
    details: ["Hoodie + pantalon", "Molleton épais", "Coupe ample"]
  },
  {
    id: "on-focus-tech-set-w-crater", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Crater", swatch: "#dadae2",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-agave", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Agave", swatch: "#6b888c",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-black", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Black", swatch: "#191516",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-flurry", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Flurry", swatch: "#c6e0dd",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-magnolia", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Magnolia", swatch: "#eea7bc",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-barberry", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Barberry", swatch: "#885052",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"], tags: ["best"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },
  {
    id: "on-focus-tech-set-w-desert", group: "on-focus-tech-set-w",
    name: "Ensemble On Focus Tech Hoodie + Sweatpants Femme", color: "Desert", swatch: "#c7b099",
    brand: "on", category: "ensembles", gender: "femme", price: 309,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Le survêtement On Focus Tech pour femme : tissu technique doux et respirant.",
    details: ["Hoodie + jogging", "Tissu technique respirant", "Coupe ajustée"]
  },

  /* ---------- ALO — Accolade, Co-Op, Alpha Shell, Alo Runner ---------- */
  {
    id: "alo-runner-black-black", group: "alo-runner",
    name: "Alo Runner", color: "Black / Black", swatch: "#2a2a2a",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-white-white", group: "alo-runner",
    name: "Alo Runner", color: "White / White", swatch: "#d2d2d2",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-espresso", group: "alo-runner",
    name: "Alo Runner", color: "Espresso", swatch: "#473427",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-gravel", group: "alo-runner",
    name: "Alo Runner", color: "Gravel", swatch: "#9c8978",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-grey-grey", group: "alo-runner",
    name: "Alo Runner", color: "Grey / Grey", swatch: "#cbcbcb",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-navy", group: "alo-runner",
    name: "Alo Runner", color: "Navy", swatch: "#2f3649",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["new"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-dune-grass", group: "alo-runner",
    name: "Alo Runner", color: "Dune Grass", swatch: "#909f82",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["new"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-seashell-blue", group: "alo-runner",
    name: "Alo Runner", color: "Seashell Blue", swatch: "#8b6e64",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-pink-marshmallow", group: "alo-runner",
    name: "Alo Runner", color: "Pink Marshmallow", swatch: "#e3b2c4",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-candy-heart-pink", group: "alo-runner",
    name: "Alo Runner", color: "Candy Heart Pink", swatch: "#ea9bcc",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-crystal-clear-blue", group: "alo-runner",
    name: "Alo Runner", color: "Crystal Clear Blue", swatch: "#7b96cd",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-satsuma-breeze", group: "alo-runner",
    name: "Alo Runner", color: "Satsuma Breeze", swatch: "#fb8f2b",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-runner-smoky-quartz", group: "alo-runner",
    name: "Alo Runner", color: "Smoky Quartz", swatch: "#9f787e",
    brand: "alo", category: "chaussures", gender: "unisexe", price: 209,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Alo Runner : sneaker rétro-running unisexe, tige mesh et daim, semelle légère et confortable. Pour homme et femme.",
    details: ["Unisexe (homme et femme)", "Tige mesh et daim", "Semelle légère amortissante", "Taille normalement"]
  },
  {
    id: "alo-accolade-bone", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Bone", swatch: "#d3ccc1",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement Alo Accolade : hoodie et jogging en molleton brossé ultra-doux, logo Alo brodé.",
    details: ["Hoodie + jogging", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-accolade-espresso", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Espresso", swatch: "#39281b",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement Alo Accolade : hoodie et jogging en molleton brossé ultra-doux, logo Alo brodé.",
    details: ["Hoodie + jogging", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-accolade-navy", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Navy", swatch: "#242937",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement Alo Accolade : hoodie et jogging en molleton brossé ultra-doux, logo Alo brodé.",
    details: ["Hoodie + jogging", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-accolade-steel-grey", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Steel Grey", swatch: "#82838c",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING,
    description: "Le survêtement Alo Accolade : hoodie et jogging en molleton brossé ultra-doux, logo Alo brodé.",
    details: ["Hoodie + jogging", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-accolade-smoky-quartz", group: "alo-accolade",
    name: "Ensemble Alo Accolade Hoodie + Sweatpant", color: "Smoky Quartz", swatch: "#3f282b",
    brand: "alo", category: "ensembles", gender: "homme", price: 279,
    sizes: CLOTHING, tags: ["new"],
    description: "Le survêtement Alo Accolade : hoodie et jogging en molleton brossé ultra-doux, logo Alo brodé.",
    details: ["Hoodie + jogging", "Molleton brossé", "Coupe relax"]
  },
  {
    id: "alo-coop-set-black", group: "alo-coop-set",
    name: "Survêtement Alo Co-Op (Veste + Pantalon)", color: "Black", swatch: "#181b1e",
    brand: "alo", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING, tags: ["best"],
    description: "Le pantalon Alo Co-Op et sa veste zippée Elemental assortie, même tissu technique léger et déperlant.",
    details: ["Veste zippée Elemental + pantalon Co-Op", "Tissu technique déperlant", "Stretch 4 sens", "Taille normalement"]
  },
  {
    id: "alo-coop-set-espresso", group: "alo-coop-set",
    name: "Survêtement Alo Co-Op (Veste + Pantalon)", color: "Espresso", swatch: "#332316",
    brand: "alo", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING,
    description: "Le pantalon Alo Co-Op et sa veste zippée Elemental assortie, même tissu technique léger et déperlant.",
    details: ["Veste zippée Elemental + pantalon Co-Op", "Tissu technique déperlant", "Stretch 4 sens", "Taille normalement"]
  },
  {
    id: "alo-coop-set-gravel", group: "alo-coop-set",
    name: "Survêtement Alo Co-Op (Veste + Pantalon)", color: "Gravel", swatch: "#705c4c",
    brand: "alo", category: "ensembles", gender: "homme", price: 299,
    sizes: CLOTHING, tags: ["new"],
    description: "Le pantalon Alo Co-Op et sa veste zippée Elemental assortie, même tissu technique léger et déperlant.",
    details: ["Veste zippée Elemental + pantalon Co-Op", "Tissu technique déperlant", "Stretch 4 sens", "Taille normalement"]
  },
  {
    id: "alo-alpha-shell-set-black", group: "alo-alpha-shell-set",
    name: "Ensemble Alo Alpha Shell Veste + Pantalon", color: "Black", swatch: "#2c313b",
    brand: "alo", category: "ensembles", gender: "homme", price: 549,
    sizes: CLOTHING, tags: ["best"],
    description: "La veste Alpha Shell et son pantalon Alpha Shell : coupe-vent imperméable premium, l'ensemble technique d'Alo.",
    details: ["Veste + pantalon Alpha Shell", "Tissu imperméable et respirant", "Coupe relax", "Taille normalement"]
  },
  {
    id: "alo-alpha-shell-set-bone", group: "alo-alpha-shell-set",
    name: "Ensemble Alo Alpha Shell Veste + Pantalon", color: "Bone", swatch: "#c4bdb1",
    brand: "alo", category: "ensembles", gender: "homme", price: 549,
    sizes: CLOTHING, tags: ["new"],
    description: "La veste Alpha Shell et son pantalon Alpha Shell : coupe-vent imperméable premium, l'ensemble technique d'Alo.",
    details: ["Veste + pantalon Alpha Shell", "Tissu imperméable et respirant", "Coupe relax", "Taille normalement"]
  },
  {
    id: "alo-alpha-shell-set-espresso", group: "alo-alpha-shell-set",
    name: "Ensemble Alo Alpha Shell Veste + Pantalon", color: "Espresso", swatch: "#2f2116",
    brand: "alo", category: "ensembles", gender: "homme", price: 549,
    sizes: CLOTHING,
    description: "La veste Alpha Shell et son pantalon Alpha Shell : coupe-vent imperméable premium, l'ensemble technique d'Alo.",
    details: ["Veste + pantalon Alpha Shell", "Tissu imperméable et respirant", "Coupe relax", "Taille normalement"]
  },
  {
    id: "alo-alpha-shell-set-lunar-grey", group: "alo-alpha-shell-set",
    name: "Ensemble Alo Alpha Shell Veste + Pantalon", color: "Lunar Grey", swatch: "#7c8585",
    brand: "alo", category: "ensembles", gender: "homme", price: 549,
    sizes: CLOTHING,
    description: "La veste Alpha Shell et son pantalon Alpha Shell : coupe-vent imperméable premium, l'ensemble technique d'Alo.",
    details: ["Veste + pantalon Alpha Shell", "Tissu imperméable et respirant", "Coupe relax", "Taille normalement"]
  },
  {
    id: "alo-alpha-shell-set-navy", group: "alo-alpha-shell-set",
    name: "Ensemble Alo Alpha Shell Veste + Pantalon", color: "Navy", swatch: "#141929",
    brand: "alo", category: "ensembles", gender: "homme", price: 549,
    sizes: CLOTHING,
    description: "La veste Alpha Shell et son pantalon Alpha Shell : coupe-vent imperméable premium, l'ensemble technique d'Alo.",
    details: ["Veste + pantalon Alpha Shell", "Tissu imperméable et respirant", "Coupe relax", "Taille normalement"]
  },

  /* ---------- LULULEMON — Pace Breaker ---------- */
  {
    id: "lulu-pace-breaker-set-black", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Black", swatch: "#1a1718",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, tags: ["best"],
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-downtown-tan", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Beige (Downtown Tan)", swatch: "#b2a79f",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, tags: ["best"],
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-burgundy-bay", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Rouge (Burgundy Bay)", swatch: "#511e2b",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING,
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-glyde-set-black", group: "lulu-pace-breaker-glyde-set",
    name: "Ensemble Lululemon Pace Breaker Glyde Track Jacket + Pant", color: "Black", swatch: "#222122",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["new"],
    description: "La Pace Breaker en tissu Glyde déperlant : track jacket coupe relax et pantalon Pace Breaker assorti.",
    details: ["Track jacket Glyde + pantalon", "Tissu Glyde déperlant", "Coupe relax", "Taille normalement"]
  },

  /* ---------- SALOMON — ensemble GORE-TEX & XT-6 (tous coloris) ---------- */
  {
    id: "salomon-gtx-set-deep-black", group: "salomon-gtx-set",
    name: "Ensemble Salomon GORE-TEX Moon Patrol Veste + Pantalon", color: "Deep Black", swatch: "#313131",
    brand: "salomon", category: "ensembles", gender: "homme", price: 699,
    sizes: CLOTHING, tags: ["new"],
    description: "L'ensemble Salomon en GORE-TEX : veste et pantalon Moon Patrol 100 % imperméables et respirants.",
    details: ["Veste + pantalon GORE-TEX", "Imperméable et respirant", "Coutures étanchées", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l492148", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Tradewinds / Stormy Weather / Bog", swatch: "#272726",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l492402", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Pearl Blue / Asphalt / Black", swatch: "#9b9c9e",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l492157", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Vanilla Ice / Bog / Shadow Green", swatch: "#2c2b2a",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l492156", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Black / Icy Pink / Dawn Pink", swatch: "#e1ccd0",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l492151", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "White Pepper / Silver Sage / Dark Gull", swatch: "#9c8f81",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l493068", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Sea Foam / Green Milieu / Black", swatch: "#363636",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l493066", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black Coffee / Burro / Bitter Chocolate", swatch: "#d2cdc6",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l454169", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Black / Black / Asphalt", swatch: "#232427",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l454728", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Pearl Blue / Grisaille / Vanilla", swatch: "#bcb8b2",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478661", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black Coffee / French Roast / Vanilla Ice", swatch: "#cfcdc4",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l475822", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Almond Milk / Portabella / Ice Flow", swatch: "#ccc8bc",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l474448", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Ghost Gray / Ghost Gray / Gray Flannel", swatch: "#a29e95",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l472937", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Aloe Wash / Hazelnut / Feather Gray", swatch: "#d1c4a9",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l479882", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black / Fiery Red / Silver", swatch: "#30282a",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l491433", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black / White / Blue Curacao", swatch: "#ccd2d4",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l491546", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Cloudburst / Icy Pink / Tapioca", swatch: "#d6cccb",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l491543", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black / Almond Cream", swatch: "#262222",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l491544", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Black / Grape Leaf", swatch: "#2e2c2b",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l491587", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Niagara / Sunny Lime", swatch: "#ced49c",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l416635", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Black / Ebony / Lunar Rock", swatch: "#59575b",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l472935", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Dried Herb / Deep Lichen Green / Bright Green", swatch: "#8d7d55",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l472919", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Blue Print / Heather / White", swatch: "#dde0e4",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l474506", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Black / Black / Silver", swatch: "#aaabac",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l474455", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Safari / Safari / Black", swatch: "#af9e80",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l475811", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "White / White / Silver", swatch: "#dddede",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l477376", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Icicle / Nirvana / Nine Iron", swatch: "#3b3a3d",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l477375", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Roasted Clay / Burnt Ochre / Almond Milk", swatch: "#392c2a",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l477374", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Oxford Tan / Carbon / Clearly Aqua", swatch: "#948875",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l477326", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Iron / Etherea / Seagrass", swatch: "#665852",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l475812", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Almond Milk / Feather Gray / Pale Mauve", swatch: "#b49d8d",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l475813", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Urban Chic / Black / Lime Cream", swatch: "#676e73",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l477377", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Vanilla Ice / Iron / Etherea", swatch: "#d4cec1",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l479749", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Black / Flame Scarlet / Vanilla Ice", swatch: "#181819",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478638", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Tea / Peat", swatch: "#a09f82",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478637", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Mahogany Rose / Tawny Port / Black", swatch: "#ecdbd0",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478641", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Nine Iron / Excalibur / Plum Perfect", swatch: "#4b494d",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478615", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "North Atlantic / Black / Silver", swatch: "#647d80",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478616", group: "salomon-xt-6",
    name: "Salomon XT-6 GORE-TEX", color: "Blue Nights / Astral Aura / Plum Kitten", swatch: "#3b424d",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 219,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },
  {
    id: "salomon-xt-6-l478651", group: "salomon-xt-6",
    name: "Salomon XT-6", color: "Ultramarine / Silver / Black", swatch: "#c9cac0",
    brand: "salomon", category: "chaussures", gender: "unisexe", price: 199,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Salomon XT-6 : la trail mythique devenue culte en sportstyle, laçage Quicklace et grip Contagrip.",
    details: ["Laçage rapide Quicklace", "Semelle Contagrip", "Taille normalement"]
  },

  /* ---------- ASICS — GEL-1130 & GEL-Kayano 14 (tous coloris) ---------- */
  {
    id: "asics-gel-1130-1203b077-100", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Storm Cloud", swatch: "#9ab4bb",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203b077-101", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Pinkcloud", swatch: "#c5c3c0",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203b045-250", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Oatmeal / Obsidian Grey", swatch: "#c7c7c2",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-301", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Evergreen / Black", swatch: "#151b1a",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-114", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Cocoa Powder", swatch: "#c9c5bd",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-117", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Rusted Rock", swatch: "#bcb6b5",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-023", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Glacier Grey / Pure Silver", swatch: "#909194",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a899-105", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Pink Cloud", swatch: "#c0bbb6",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a899-100", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Taro Purple", swatch: "#a8a4a5",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a899-101", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Carrier Grey", swatch: "#c8c7bc",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a256-113", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Clay Canyon", swatch: "#413b38",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a256-114", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Mid Grey", swatch: "#b8b8b8",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1202a164-112", group: "asics-gel-1130-w",
    name: "Asics GEL-1130 Femme", color: "White / Jade", swatch: "#c3c3c2",
    brand: "asics", category: "chaussures", gender: "femme", price: 129,
    sizes: ["36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5", "41"], tags: ["best"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a256-115", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Ironclad", swatch: "#afafac",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a255-028", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Oyster Grey / Clay Grey", swatch: "#aba6a1",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a255-030", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Smoke Grey / Honey Beige", swatch: "#dcd6c6",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a255-252", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Vanilla / White Sage", swatch: "#c9c7b9",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1202a164-114", group: "asics-gel-1130-w",
    name: "Asics GEL-1130 Femme", color: "White / Malachite Green", swatch: "#c9cdc8",
    brand: "asics", category: "chaussures", gender: "femme", price: 129,
    sizes: ["36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5", "41"], tags: ["best"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a256-118", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Cloud Grey", swatch: "#ceccc9",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a256-026", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Clay Grey / Pure Silver", swatch: "#838383",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1201a906-001", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Black / Pure Silver", swatch: "#232123",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-101", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "Cream / Blueberry", swatch: "#a1a3a6",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1203a609-102", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Desert Red", swatch: "#d4d0c9",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-gel-1130-1204a182-100", group: "asics-gel-1130",
    name: "Asics GEL-1130", color: "White / Shamrock Green", swatch: "#b2b3b3",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 129,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-1130 d'Asics : silhouette running 2000s, amorti GEL et lignes argentées rétro.",
    details: ["Amorti GEL", "Look running Y2K", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-026", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Carrier Grey / Black", swatch: "#292b2b",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-118", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Cream / Cocoa Powder", swatch: "#ada8a3",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-002", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Black / Cream", swatch: "#2b2a2c",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-200", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Birch / Pure Silver", swatch: "#8f8b86",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-113", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Cream / Obsidian Grey", swatch: "#e2d4c0",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-025", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Concrete / Pure Silver", swatch: "#cacbc8",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a019-109", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Piquant Orange", swatch: "#4f362d",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1202a056-111", group: "asics-kayano-14-w",
    name: "Asics GEL-Kayano 14 Femme", color: "White / Dark Grape", swatch: "#b2b1b2",
    brand: "asics", category: "chaussures", gender: "femme", price: 179,
    sizes: ["36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5", "41"], tags: ["best"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a161-251", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Simply Taupe / Oatmeal", swatch: "#bfb19d",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1202a105-103", group: "asics-kayano-14-w",
    name: "Asics GEL-Kayano 14 Femme", color: "White / Smoke Grey", swatch: "#cbc6bb",
    brand: "asics", category: "chaussures", gender: "femme", price: 179,
    sizes: ["36", "36.5", "37", "37.5", "38", "38.5", "39", "40", "40.5", "41"], tags: ["best"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a019-006", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Black / Pure Silver", swatch: "#2f3031",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a019-200", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Birch / Dark Pewter", swatch: "#cdc9bd",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a019-110", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Malachite Green", swatch: "#3a423e",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-400", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Arctic Sky / Pure Silver", swatch: "#caced3",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-106", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Fjord Grey", swatch: "#93a0a6",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-110", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Graphite Grey", swatch: "#b0b0b1",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-109", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Cream / Ironclad", swatch: "#b6b5b2",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1201a019-102", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Pure Gold", swatch: "#7c746b",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-401", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Dolphin Grey / Pure Silver", swatch: "#9ea8a9",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-300", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "Dried Leaf Green / Pure Silver", swatch: "#989e94",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },
  {
    id: "asics-kayano-14-1203a537-117", group: "asics-kayano-14",
    name: "Asics GEL-Kayano 14", color: "White / Light Sage", swatch: "#b0ada3",
    brand: "asics", category: "chaussures", gender: "unisexe", price: 179,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La GEL-Kayano 14 : l'icône running 2008 revenue en sportswear, amorti GEL et overlays métallisés.",
    details: ["Amorti GEL", "Overlays métallisés", "Taille normalement"]
  },

  /* ---------- MIZUNO — Wave Prophecy ---------- */
  {
    id: "mizuno-wave-prophecy-mud1ga227608", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy Beta", color: "White", swatch: "#b9b7b1",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-mud1ga238701", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Silver Cloud / White Sand / Cedar Green", swatch: "#b1a694",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"], tags: ["best"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590063-wc8q", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Wind Chime / Fallen Rock", swatch: "#aca397",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590148-9673", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy 1", color: "Iron Gate / Silver", swatch: "#424242",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590126-bs96", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Black Sand / Iron Gate", swatch: "#2d2c2c",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590187-7773", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Harvest Gold / Silver", swatch: "#352e2d",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590187-6j73", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Spring Crocus / Silver", swatch: "#201f21",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590188-792a", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy 1", color: "Artisan's Gold / Zinnia / Strong Blue", swatch: "#141d29",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590148-hm1f", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy 1", color: "Harbor Mist / Chinese Red", swatch: "#1c181a",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590091-59nl", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Salute Navy Blazer", swatch: "#27272a",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590091-1k16", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Sun Dried Tomato / Barbados Cherry", swatch: "#0d0d0d",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590126-5p90", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Black", swatch: "#312c31",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },
  {
    id: "mizuno-wave-prophecy-590091-9690", group: "mizuno-wave-prophecy",
    name: "Mizuno Wave Prophecy LS", color: "Black", swatch: "#1c1b1c",
    brand: "mizuno", category: "chaussures", gender: "unisexe", price: 279,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    description: "La Mizuno Wave Prophecy : semelle Infinity Wave spectaculaire et look futuriste.",
    details: ["Semelle Infinity Wave", "Look futuriste", "Taille normalement"]
  },

  /* ---------- SWEET PANTS — casquettes ---------- */
  {
    id: "sweetpants-3d-basic-cap-black", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Black", swatch: "#2b2b2a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-basic-cap-clay", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Clay", swatch: "#ce998f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-basic-cap-kaki", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Kaki", swatch: "#766444",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-basic-cap-leaf", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Leaf", swatch: "#3d3c2c",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-basic-cap-navy", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Navy", swatch: "#2d303a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-basic-cap-sauge", group: "sweetpants-3d-basic-cap",
    name: "Casquette Sweet Pants 3D Basic", color: "Sauge", swatch: "#a29477",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-air-blue", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Air Blue", swatch: "#89b2bf",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-black", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Black", swatch: "#242424",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-electrik", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Electrik", swatch: "#213d7e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-fudge", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Fudge", swatch: "#3d1a26",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-karmin", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Karmin", swatch: "#a90e2a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-mirage", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Mirage", swatch: "#333d49",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-night", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Night", swatch: "#232b3c",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-primrose", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Primrose", swatch: "#d7bdbf",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-sage", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Sage", swatch: "#898257",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cap-yarrow", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Yarrow", swatch: "#fcda86",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-capoff-white", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Off White", swatch: "#e5e1d7",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-cappeony", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Peony", swatch: "#e2a1b9",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-3d-uni-caprocky", group: "sweetpants-3d-uni-cap",
    name: "Casquette Sweet Pants 3D Uni", color: "Rocky", swatch: "#4f4f4f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-american-cap-electrik", group: "sweetpants-american-cap",
    name: "Casquette Sweet Pants American", color: "Electrik", swatch: "#0d49bd",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 60,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-american-cap-karmin", group: "sweetpants-american-cap",
    name: "Casquette Sweet Pants American", color: "Karmin", swatch: "#9a0e2f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 60,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-american-cap-night", group: "sweetpants-american-cap",
    name: "Casquette Sweet Pants American", color: "Night", swatch: "#1c2438",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 60,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-basic-ct-cap-black", group: "sweetpants-basic-ct-cap",
    name: "Casquette Sweet Pants Basic CT", color: "Black", swatch: "#322d2d",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 50,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-basic-ct-cap-night", group: "sweetpants-basic-ct-cap",
    name: "Casquette Sweet Pants Basic CT", color: "Night", swatch: "#34303c",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 50,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-azure", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Azure", swatch: "#474a87",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-black-chaine", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Black Chaine", swatch: "#dedbd5",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-black-perle", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Black Perle", swatch: "#dfdbd4",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-night", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Night", swatch: "#262a3f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-primrose", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Primrose", swatch: "#e3cdcb",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-sage", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "Sage", swatch: "#92896f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-bijoux-cap-white-pepper", group: "sweetpants-bijoux-cap",
    name: "Casquette Sweet Pants Bijoux", color: "White Pepper", swatch: "#bdab95",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-canvas-cap-night", group: "sweetpants-canvas-cap",
    name: "Casquette Sweet Pants Canvas", color: "Night", swatch: "#233349",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-canvas-cap-toffee", group: "sweetpants-canvas-cap",
    name: "Casquette Sweet Pants Canvas", color: "Toffee", swatch: "#81574d",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-casquette-snapback-camouflage", group: "sweetpants-la-army-cap",
    name: "Casquette Sweet Pants La Army", color: "Camouflage", swatch: "#343022",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 75,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-coach-cap-night", group: "sweetpants-coach-cap",
    name: "Casquette Sweet Pants Coach", color: "Night", swatch: "#575879",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-coach-cap-off-white", group: "sweetpants-coach-cap",
    name: "Casquette Sweet Pants Coach", color: "Off White", swatch: "#d6d5d5",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-coach-cap-white-pepper", group: "sweetpants-coach-cap",
    name: "Casquette Sweet Pants Coach", color: "White Pepper", swatch: "#d7c6ad",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-coach-cap-windsor", group: "sweetpants-coach-cap",
    name: "Casquette Sweet Pants Coach", color: "Windsor", swatch: "#521825",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-denim-used-cap-blue-vintage", group: "sweetpants-denim-used-cap",
    name: "Casquette Sweet Pants Denim Used", color: "Blue Vintage", swatch: "#627699",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-denim-used-cap-dark-blue", group: "sweetpants-denim-used-cap",
    name: "Casquette Sweet Pants Denim Used", color: "Dark Blue", swatch: "#34394b",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-denim-used-cap-snow", group: "sweetpants-denim-used-cap",
    name: "Casquette Sweet Pants Denim Used", color: "Snow", swatch: "#8691a4",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-black", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Black", swatch: "#efebe7",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-camouflage", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Camouflage", swatch: "#ebe3d8",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-electrik", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Electrik", swatch: "#4a70ba",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-karmin", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Karmin", swatch: "#ece7e1",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-leopard", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Leopard", swatch: "#241f20",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-night", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Night", swatch: "#3a3147",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-gym-cap-toffee", group: "sweetpants-gym-cap",
    name: "Casquette Sweet Pants Gym", color: "Toffee", swatch: "#864e3f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-cap-electrik", group: "sweetpants-heart-cap",
    name: "Casquette Sweet Pants Heart", color: "Electrik", swatch: "#174dc4",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-cap-milk", group: "sweetpants-heart-cap",
    name: "Casquette Sweet Pants Heart", color: "Milk", swatch: "#e4d9cd",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-cap-night", group: "sweetpants-heart-cap",
    name: "Casquette Sweet Pants Heart", color: "Night", swatch: "#1f2636",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-foam-cap-electrik", group: "sweetpants-heart-foam-cap",
    name: "Casquette Sweet Pants Heart Foam", color: "Electrik", swatch: "#0a45ca",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-foam-cap-karmin", group: "sweetpants-heart-foam-cap",
    name: "Casquette Sweet Pants Heart Foam", color: "Karmin", swatch: "#cf071e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heart-foam-cap-night", group: "sweetpants-heart-foam-cap",
    name: "Casquette Sweet Pants Heart Foam", color: "Night", swatch: "#ece8e2",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heritage-cap-night", group: "sweetpants-heritage-cap",
    name: "Casquette Sweet Pants Heritage", color: "Night", swatch: "#05111d",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-heritage-cap-off-white", group: "sweetpants-heritage-cap",
    name: "Casquette Sweet Pants Heritage", color: "Off White", swatch: "#e1e1e1",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-aluminium", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Aluminium", swatch: "#c5b2aa",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-argile", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Argile", swatch: "#d1c8b5",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-azure", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Azure", swatch: "#547ac7",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-baltique", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Baltique", swatch: "#9ea0b2",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-black", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Black", swatch: "#312b2b",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-candy", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Candy", swatch: "#c5153e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-grey", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Grey", swatch: "#ebe3e1",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-imperial", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Imperial", swatch: "#7f6c9a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-kaki", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Kaki", swatch: "#bda07e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-light-clay", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Light Clay", swatch: "#e4c7c4",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-night", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Night", swatch: "#282d3e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-peony", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Peony", swatch: "#f4b2c8",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-primrose", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Primrose", swatch: "#e6c5c5",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-sage", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Sage", swatch: "#b5b08e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-varsity-blue", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Varsity Blue", swatch: "#e5dbd5",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-home-run-cap-windsor", group: "sweetpants-home-run-cap",
    name: "Casquette Sweet Pants Home Run", color: "Windsor", swatch: "#7e273c",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-la-leo-cap", group: "sweetpants-la-leo-cap",
    name: "Casquette Sweet Pants La Leo", color: "Leopard", swatch: "#544132",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 75,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-ninetys-cap-black", group: "sweetpants-ninetys-cap",
    name: "Casquette Sweet Pants Ninetys", color: "Black", swatch: "#ebe7de",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-ninetys-cap-fudge", group: "sweetpants-ninetys-cap",
    name: "Casquette Sweet Pants Ninetys", color: "Fudge", swatch: "#501b25",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-ninetys-cap-night", group: "sweetpants-ninetys-cap",
    name: "Casquette Sweet Pants Ninetys", color: "Night", swatch: "#111927",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-nylon-cap-black", group: "sweetpants-nylon-cap",
    name: "Casquette Sweet Pants Nylon", color: "Black", swatch: "#2d2e35",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-nylon-cap-fudge", group: "sweetpants-nylon-cap",
    name: "Casquette Sweet Pants Nylon", color: "Fudge", swatch: "#45212d",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-nylon-cap-night", group: "sweetpants-nylon-cap",
    name: "Casquette Sweet Pants Nylon", color: "Night", swatch: "#131e30",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-black", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Black", swatch: "#92a8be",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-electrik", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Electrik", swatch: "#89a3bd",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-fudge", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Fudge", swatch: "#8f9caf",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-karmin", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Karmin", swatch: "#dad0c7",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-night", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Night", swatch: "#0c0e10",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-primrose", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Primrose", swatch: "#adb9c8",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-seaweed", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Seaweed", swatch: "#97acc0",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-toffee", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "Toffee", swatch: "#9baebe",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-patchwork-cap-white-pepper", group: "sweetpants-patchwork-cap",
    name: "Casquette Sweet Pants Patchwork", color: "White Pepper", swatch: "#faf7ed",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sign-cap-black", group: "sweetpants-sign-cap",
    name: "Casquette Sweet Pants Sign", color: "Black", swatch: "#0c1116",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sign-cap-fudge", group: "sweetpants-sign-cap",
    name: "Casquette Sweet Pants Sign", color: "Fudge", swatch: "#2b0f17",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sign-cap-night", group: "sweetpants-sign-cap",
    name: "Casquette Sweet Pants Sign", color: "Night", swatch: "#04111f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-air-blue", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Air Blue", swatch: "#accee7",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-black", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Black", swatch: "#1c1c1e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-dark-earth", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Dark Earth", swatch: "#5b4740",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-leaf", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Leaf", swatch: "#615339",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-milk", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Milk", swatch: "#eee8dd",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-night", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Night", swatch: "#172b41",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-primrose", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Primrose", swatch: "#dbc9c9",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-sage", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Sage", swatch: "#aca592",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-white-pepper", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "White Pepper", swatch: "#dac7b2",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-smart-cap-windsor", group: "sweetpants-smart-cap",
    name: "Casquette Sweet Pants Smart", color: "Windsor", swatch: "#67303d",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 55,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sunfaded-cap-black", group: "sweetpants-sunfaded-cap",
    name: "Casquette Sweet Pants Sunfaded", color: "Black", swatch: "#38353a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 70,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sunfaded-cap-brown", group: "sweetpants-sunfaded-cap",
    name: "Casquette Sweet Pants Sunfaded", color: "Brown", swatch: "#5e433a",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 70,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sunfaded-cap-electrik", group: "sweetpants-sunfaded-cap",
    name: "Casquette Sweet Pants Sunfaded", color: "Electrik", swatch: "#114f9e",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 70,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sunfaded-cap-karmin", group: "sweetpants-sunfaded-cap",
    name: "Casquette Sweet Pants Sunfaded", color: "Karmin", swatch: "#bb1338",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 70,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-sunfaded-cap-milk", group: "sweetpants-sunfaded-cap",
    name: "Casquette Sweet Pants Sunfaded", color: "Milk", swatch: "#dbdbda",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 70,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-army", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "Army", swatch: "#554836",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-eden", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "Eden", swatch: "#264b41",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-imperial", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "Imperial", swatch: "#6d547f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-night", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "Night", swatch: "#525c73",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-white-pepper", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "White Pepper", swatch: "#ac946f",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },
  {
    id: "sweetpants-velors-cap-windsor", group: "sweetpants-velors-cap",
    name: "Casquette Sweet Pants Velors", color: "Windsor", swatch: "#722c38",
    brand: "sweetpants", category: "accessoires", gender: "unisexe", type: "casquettes", price: 65,
    sizes: TU,
    description: "Casquette Sweet Pants, la marque parisienne : logo brodé, réglable.",
    details: ["Logo Sweet Pants brodé", "Réglable", "Taille unique"]
  },

  /* ---------- ESSENTIALS — basiques SS22 (logo en haut à droite) ---------- */
  {
    id: "essentials-ss22-set-black", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Black", swatch: "#181818",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["best"],
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-ss22-set-light-oatmeal", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Light Oatmeal", swatch: "#d5d2cd",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["best"],
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-ss22-set-dark-oatmeal", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Dark Oatmeal", swatch: "#9b9a96",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-ss22-set-desert-taupe", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Desert Taupe", swatch: "#9d8877",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING, tags: ["new"],
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-ss22-set-oak", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Oak", swatch: "#af8e6a",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },
  {
    id: "essentials-ss22-set-seafoam", group: "essentials-ss22-set",
    name: "Ensemble Essentials Hoodie + Sweatpant", color: "Seafoam", swatch: "#b5baa4",
    brand: "essentials", category: "ensembles", gender: "homme", price: 269,
    sizes: CLOTHING,
    description: "L'Essentials basique : petit logo Essentials en haut à droite du hoodie, grand logo dans le dos, et logo en bas de la jambe du jogging. Molleton épais, coupe ample.",
    details: ["Hoodie + jogging vendus ensemble", "Logo Essentials en haut à droite du hoodie", "Logo en bas de jambe du jogging", "Coupe ample : taille grand"]
  },

  /* ---------- LULULEMON — Pace Breaker (tous coloris) ---------- */
  {
    id: "lulu-pace-breaker-set-steel-blue", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Steel Blue", swatch: "#657b8c",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING, tags: ["new"],
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-true-navy", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "True Navy", swatch: "#24242f",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING,
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-onyx-grey", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Onyx Grey", swatch: "#3f393a",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING,
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-oakwood-tan", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Oakwood Tan", swatch: "#947a5f",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING,
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  },
  {
    id: "lulu-pace-breaker-set-silver-drop", group: "lulu-pace-breaker-set",
    name: "Ensemble Lululemon Pace Breaker Veste + Jogger", color: "Silver Drop", swatch: "#b9b8b9",
    brand: "lululemon", category: "ensembles", gender: "homme", price: 249,
    sizes: CLOTHING,
    description: "Veste Pace Breaker et jogger Pace Breaker assortis : tissu léger, stretch et respirant, pensé pour bouger.",
    details: ["Veste zippée à capuche + jogger", "Tissu léger, stretch et déperlant", "Poches zippées", "Taille normalement"]
  }
];
