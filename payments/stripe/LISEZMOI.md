# Paiement par carte Stripe — mise en route

Le client paie **directement sur la page de commande** de la-base.shop : le formulaire Stripe
(carte, Apple Pay, Google Pay) s'affiche dans le site, sans redirection.

Il faut deux choses :

- la **clé publiable** Stripe (`pk_…`), à mettre dans `assets/js/config.js`. Elle peut être publique ;
- un petit service gratuit (`worker.js`, sur Cloudflare Workers) qui garde la **clé secrète** Stripe
  (`sk_…`), relit les vrais prix sur le site et crée le paiement. La clé secrète ne doit **jamais**
  être mise dans le site ni envoyée par message.

## 1. Stripe : récupérer les clés

1. https://dashboard.stripe.com → **Développeurs** → **Clés API**.
2. Copie la **clé publiable** (`pk_live_…`).
3. Clique sur **Révéler la clé secrète** (`sk_live_…`). Elle ne va que dans Cloudflare (étape 2).

Pour essayer sans vrai débit : active le **mode test** (bouton en haut du tableau de bord). Les clés
commencent alors par `pk_test_` / `sk_test_`, et tu paies avec la carte `4242 4242 4242 4242`
(date future, CVC au hasard).

## 2. Cloudflare : créer le service (5 minutes)

1. Compte gratuit sur https://dash.cloudflare.com.
2. **Workers & Pages** → **Create** → **Create Worker** → nom : `base-stripe` → **Deploy**.
3. **Edit code** : efface tout, colle le contenu de `payments/stripe/worker.js`, puis **Deploy**.
4. **Settings** → **Variables and Secrets** → ajoute :
   - `SITE_ORIGIN` (Text) : `https://la-base.shop`
   - `STRIPE_SECRET_KEY` (**Secret**) : ta clé secrète `sk_…`
5. Note l'adresse du Worker (`https://base-stripe.<ton-nom>.workers.dev`). Ouverte dans le
   navigateur, elle affiche « BASE · paiement ».

## 3. Brancher le site

Dans `assets/js/config.js` :

```js
stripe: {
  publishableKey: "pk_live_…",
  apiUrl: "https://base-stripe.<ton-nom>.workers.dev"
},
```

Le choix **« Carte bancaire »** apparaît alors au paiement, sélectionné par défaut.

## 4. Réglages Stripe conseillés

- **Paramètres → Moyens de paiement** : active Cartes, Apple Pay, Google Pay.
- **Paramètres → Moyens de paiement → Domaines des moyens de paiement** : ajoute `la-base.shop`
  (nécessaire pour qu'Apple Pay s'affiche dans le formulaire intégré).
- **Paramètres → E-mails clients** : coche « Paiements réussis » pour que le client reçoive son reçu.
- **Paramètres → Image de marque** : logo `assets/brand/la-base-profil-empile.png`, couleur de fond
  `#EEE7DB`, couleur des boutons `#101211`.

## 5. Où voir les commandes

Stripe → **Paiements**. Chaque paiement porte la description `Commande BASE-XXXXXX`, l'adresse de
livraison du client et le détail des articles (tailles comprises) dans les **métadonnées**.
