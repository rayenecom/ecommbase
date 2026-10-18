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
  instagram: "base.store",     // sans le @
  tiktok: "base.store",        // sans le @
  email: "contact@base-store.fr",

  // Messages du bandeau en haut du site (ils défilent un par un)
  announcements: [
    "Livraison offerte dès 150 €",
    "100% authentique · importé des États-Unis",
    "Retours sous 14 jours"
  ],

  // Recherches proposées dans la barre de recherche
  popularSearches: ["Essentials 1977", "Cloudtilt", "XT-6", "Kayano 14", "Ralph Lauren", "Sweet Pants", "Alo Runner"]
};
