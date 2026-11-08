/* ==========================================================
   BASE — Réglages de la boutique
   Modifie ces valeurs : tout le site se met à jour.
   ========================================================== */
window.BASE_CONFIG = {
  storeName: "BASE",

  // Prix
  currency: "EUR",
  locale: "fr-FR",

  // Livraison
  shippingPrice: 7.9,          // livraison standard
  freeShippingFrom: 150,       // livraison offerte dès ce montant (0 = jamais)
  deliveryDays: [3, 6],        // délai de livraison en jours ouvrés [min, max]
  returnDays: 14,              // délai de retour

  // Paiement en plusieurs fois (ex : PayPal 4x). Mets 0 si tu ne le proposes pas.
  installments: 0,

  // Contact / prise de commande
  // WhatsApp : format international sans "+" ni espaces (ex : 33612345678)
  whatsapp: "33600000000",
  // false = le numéro n'est pas encore prêt : un clic sur WhatsApp affiche « Une erreur est survenue ».
  // Quand ton numéro pro est en place, mets-le ci-dessus et passe ceci à true.
  whatsappActive: false,
  instagram: "base.store",     // sans le @
  tiktok: "base.store",        // sans le @
  email: "contact@base-store.fr",

  // Messages du bandeau en haut du site (ils défilent un par un)
  announcements: [
    "Bonnes affaires : prix réduits sur une sélection",
    "Livraison offerte dès 150 €",
    "100% authentique · importé des États-Unis",
    "Retours sous 14 jours"
  ],

  // Vidéo de la bannière d'accueil (sans son, idéalement < 5 Mo). Le navigateur lit le premier format qu'il supporte :
  // .webm (Chrome, Firefox) puis .mp4 H.264 (Safari, iPhone). Une seule vidéo .mp4 suffit aussi : ["assets/video/ma-video.mp4"]
  // Mets heroVideo: [] pour n'afficher que l'image.
  heroVideo: ["assets/video/hero.webm", "assets/video/hero.mp4"],
  heroPoster: "assets/video/hero.jpg",   // image affichée pendant le chargement
  // Version verticale pour téléphone (facultatif : sans elle, la vidéo ci-dessus est recadrée au centre)
  heroVideoMobile: ["assets/video/hero-m.webm", "assets/video/hero-m.mp4"],
  heroPosterMobile: "assets/video/hero-m.jpg",
  // Version « image animée » de la vidéo : utilisée dans les navigateurs des applis (TikTok, Instagram, Snapchat…)
  // qui bloquent ou détournent les vidéos, et en secours si la lecture automatique est refusée.
  heroAnim: "assets/video/hero-m.webp",

  // Paiement par carte Stripe, directement sur la page de commande (voir payments/stripe/LISEZMOI.md).
  // Tant que ces deux valeurs sont vides, le paiement par carte Stripe est masqué.
  stripe: {
    publishableKey: "pk_live_51UZGKbR5RnMKhZmV1ZHpMyPKMw1lgxfsr0pgHwvX83ndhne88vRjD8PVu51B0pDjwGZdBr0wjuY2IbfVgNsGK3Mn00tYCckko8",    // clé publiable Stripe : pk_live_… (ou pk_test_… pour essayer). Elle peut être publique.
    apiUrl: "https://base-stripe.la-base.workers.dev"   // adresse du service Cloudflare (ex : https://base-stripe.xxx.workers.dev)
  },

  // (Plus tard) Paiement par carte myPOS, utilisé seulement si Stripe n'est pas configuré (voir payments/mypos/LISEZMOI.md).
  // Tant que sid, walletNumber et notifyUrl sont vides, le paiement par carte est masqué.
  mypos: {
    sid: "",               // « Store ID » de ta boutique en ligne myPOS
    walletNumber: "",      // numéro de compte (wallet) myPOS qui reçoit l'argent
    keyIndex: 1,           // « Key index » de la boutique
    notifyUrl: "",         // adresse du service Cloudflare + /notify (ex : https://base-paiement.xxx.workers.dev/notify)
    sandbox: false         // true = mode test myPOS (aucun vrai débit)
  },

  // Recherches proposées dans la barre de recherche
  popularSearches: ["Essentials 1977", "Cloudtilt", "XT-6", "Kayano 14", "Ralph Lauren", "Sweet Pants", "Alo Runner"]
};
