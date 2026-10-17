# BASE — Boutique en ligne

Ensembles et sneakers 100% authentiques importés des États-Unis :
Essentials, Ralph Lauren, Alo, On, Salomon, Mizuno, Saucony, Asics, C.P. Company.

Site statique (HTML / CSS / JavaScript), sans serveur ni installation. Ouvre `index.html` pour le voir.

## Ce que fait le site
- **Accueil** : héro avec produits cliquables, réassurance, best-sellers par onglets, catégories, look « ensemble + sneakers », nouveautés, marques, garantie d'authenticité, FAQ, newsletter.
- **Boutique** (`#/boutique`) : filtres marque / taille disponible / couleur / prix, tri, recherche, filtres actifs supprimables.
- **Cartes produit** : pastilles de coloris (aperçu au survol), ajout rapide d'une taille au survol (bouton « + » sur mobile).
- **Fiche produit** (`#/produit/<id>`) : choix du coloris, tailles épuisées barrées avec « Me prévenir du restock », alerte « Dernières pièces », date de livraison estimée, guide des tailles, « Complète le look », produits similaires, « Vus récemment », barre d'achat collante sur mobile.
- **Panier** : barre « livraison offerte », suggestions pour compléter le look, total.
- **Commande** (`#/commande`) : formulaire vérifié champ par champ, puis envoi du récapitulatif par WhatsApp, Instagram ou e-mail. Le paiement se fait ensuite par lien (PayPal, SumUp, Stripe…).

## Personnaliser
| Quoi | Où |
|---|---|
| WhatsApp, Instagram, e-mail, frais et délais de livraison, bandeau, paiement en plusieurs fois | `assets/js/config.js` |
| Produits, prix, tailles, coloris, épuisés, dernières pièces, promos | `assets/js/products.js` |
| Couleurs et polices | variables en haut de `assets/css/style.css` |

## Ajouter tes photos (le plus important pour vendre)
Ouvre `assets/js/photos.js` : chaque produit y est déjà listé. Colle les liens ou chemins de tes photos entre les crochets :
```js
"salomon-xt6-black": ["images/products/xt6-noir-1.jpg", "images/products/xt6-noir-2.jpg"],
```
Tu peux mettre tes fichiers dans `images/products/` ou coller une adresse web (https://…).
La 1re photo est la principale, la 2e s'affiche au survol. Sans photo, une illustration provisoire s'affiche.
Format conseillé : carré, fond clair uni, 1200 × 1200 px.

## Mettre en ligne (gratuit)
- **GitHub Pages** : Settings → Pages → Branch → `/ (root)`.
- **Netlify** ou **Vercel** : glisse-dépose le dossier, ou connecte le dépôt.

## Paiement par carte directement sur le site
Le site envoie les commandes par message puis tu envoies un lien de paiement. Pour un paiement automatique, il faudra brancher Stripe Checkout ou passer sur Shopify.
