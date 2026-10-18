# BASE — Boutique en ligne

Ensembles, sneakers et accessoires 100% authentiques importés des États-Unis :
Essentials, Ralph Lauren, UGG, Nocta, Lululemon, Alo, On, Salomon, Mizuno, Asics, C.P. Company,
Courrèges, Columbia, Sweet Pants.

Site statique (HTML / CSS / JavaScript), sans serveur ni installation. Ouvre `index.html` pour le voir.

## Ce que fait le site
- **Accueil** : héro avec produits cliquables, réassurance, best-sellers par onglets, catégories, look « ensemble + sneakers », nouveautés, marques, garantie d'authenticité, FAQ, newsletter.
- **Boutique** (`#/boutique`) : filtres genre (Femme / Homme) / type d'accessoire / marque / taille / couleur / prix, tri, recherche.
- **Catégories** : Ensembles, Chaussures, Accessoires (casquettes, bonnets, chaussettes, caleçons), Doudounes. Menus Femme et Homme.
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

## Photos produit
Toutes les photos sont sur **le même fond beige crème (#EEE7DB)**, au format carré 1200 × 1200 px :
chaque produit a été détouré automatiquement (IA de suppression d'arrière-plan) puis reposé sur le fond crème
avec une ombre douce. Les photos sont listées par produit dans `assets/js/photos.js`.

> Les photos actuelles proviennent des sites des marques et de revendeurs (On, Fear of God, Alo, Nocta, Salomon,
> Courrèges, Kith, DTLR, Simon, Overkill, Flannels, Backcountry, Smallable…). Elles appartiennent à leurs auteurs :
> remplace-les par tes propres photos dès que possible.

Pour ajouter tes propres photos : mets-les dans `images/products/` et liste-les dans `photos.js`.
Pour garder le même rendu, prends-les sur un fond uni et demande-moi de les passer au fond crème.

## Mettre en ligne (gratuit)
- **GitHub Pages** : Settings → Pages → Branch → `/ (root)`.
- **Netlify** ou **Vercel** : glisse-dépose le dossier, ou connecte le dépôt.

## Paiement par carte directement sur le site
Le site envoie les commandes par message puis tu envoies un lien de paiement. Pour un paiement automatique, il faudra brancher Stripe Checkout ou passer sur Shopify.
