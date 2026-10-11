# BASE — Boutique en ligne

Site e-commerce de **BASE** : ensembles et sneakers 100% authentiques importés des États-Unis
(Essentials, Ralph Lauren, Alo, On, Salomon, Mizuno, Saucony, Asics, C.P. Company).

Site 100% statique (HTML / CSS / JavaScript) : aucune installation, aucun serveur nécessaire.

## Voir le site
Ouvre simplement `index.html` dans ton navigateur.

## Pages
| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : bandeau, héro, marques, nouveautés, catégories, best-sellers, authenticité |
| `shop.html` | Boutique avec filtres (catégorie, marque, taille), tri et recherche |
| `product.html?id=...` | Fiche produit : tailles, panier, commande WhatsApp, guide des tailles |
| `checkout.html` | Commande : coordonnées + envoi de la commande par WhatsApp, Instagram ou e-mail |
| `faq.html` | Authenticité, livraison, retours, tailles, contact |
| `legal.html` | Mentions légales & CGV (**à compléter avant la mise en ligne**) |

## Personnaliser
- **Infos boutique** (WhatsApp, Instagram, e-mail, frais de port, bandeau) → `assets/js/config.js`
- **Produits** (ajouter, modifier, prix, tailles, épuisé, promo) → `assets/js/products.js`
- **Couleurs & polices** → variables en haut de `assets/css/style.css`

## Ajouter tes photos
1. Mets tes photos dans `images/products/` (ex : `essentials-oatmeal-1.jpg`).
2. Dans `products.js`, ajoute au produit :
   ```js
   images: ["images/products/essentials-oatmeal-1.jpg", "images/products/essentials-oatmeal-2.jpg"],
   ```
   La 2e photo s'affiche au survol dans la boutique. Sans photo, un visuel provisoire est affiché.
3. Photo de la bannière d'accueil : ajoute `images/hero.jpg` (format paysage).

Conseil : photos carrées (1:1), fond clair uni, 1200×1200 px.

## Mettre en ligne (gratuit)
- **GitHub Pages** : Settings → Pages → Branch → dossier `/ (root)`.
- **Netlify** / **Vercel** : glisse-dépose le dossier ou connecte le dépôt.

## Paiement
Les commandes sont envoyées par WhatsApp / Instagram / e-mail, puis tu envoies un lien de paiement
(PayPal, SumUp, Stripe Payment Link…). Pour un paiement automatique par carte directement sur le site,
il faudra brancher Stripe ou passer sur Shopify.
