/* ==========================================================
   BASE — Configuration de la boutique
   Modifie ces valeurs pour personnaliser ton site.
   ========================================================== */
window.BASE_CONFIG = {
  storeName: "BASE",
  tagline: "100% authentique. Importé des États-Unis.",

  // Devise et format des prix
  currency: "EUR",
  locale: "fr-FR",

  // Livraison
  shippingPrice: 7.9,       // prix de la livraison standard
  freeShippingFrom: 150,    // livraison offerte à partir de ce montant (0 = jamais)
  deliveryTime: "3 à 7 jours ouvrés",

  // Contact / prise de commande
  // WhatsApp : numéro au format international, sans "+" ni espaces (ex : 33612345678)
  whatsapp: "33600000000",
  instagram: "base.store",            // sans le @
  tiktok: "base.store",               // sans le @
  email: "contact@base-store.fr",

  // Bandeau défilant en haut du site
  announcements: [
    "Livraison offerte dès 150 €",
    "100% authentique — vérifié avant chaque envoi",
    "Importé directement des États-Unis",
    "Paiement sécurisé • Envoi suivi"
  ]
};
