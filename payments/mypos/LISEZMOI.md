# Paiement par carte myPOS — mise en route

Le client paie **directement sur la page de commande** de la-base.shop : le formulaire de carte
myPOS s'affiche dans le site (myPOS Embedded Checkout), sans redirection.

Il faut deux choses :

- les identifiants **publics** de ta boutique myPOS (SID, numéro de wallet, index de clé), à mettre
  dans `assets/js/config.js` ;
- un petit service gratuit (`worker.js`, sur Cloudflare Workers) qui reçoit la confirmation de
  paiement de myPOS (`/notify`) et lui répond « OK ». **Sans cette réponse, myPOS annule le paiement.**

## 1. myPOS : créer la boutique en ligne

1. Espace myPOS → **Online** (ou « E-com ») → **Online Stores** → **Add online store**.
2. Nom : `BASE` · Site : `https://la-base.shop`.
3. Méthode d'intégration : **Embedded checkout** (ou « Custom integration / API »).
4. Note ces trois valeurs (elles ne sont pas secrètes) :
   - **Store ID (SID)** ;
   - **Wallet number** (ton numéro de compte myPOS) ;
   - **Key index** (souvent `1`).
5. Ne copie jamais la clé privée ni le « Configuration pack » dans le site.

## 2. Cloudflare : créer le service de confirmation (5 minutes)

1. Crée un compte gratuit sur https://dash.cloudflare.com.
2. **Workers & Pages** → **Create** → **Create Worker** → nom : `base-paiement` → **Deploy**.
3. **Edit code** : efface tout, colle le contenu de `payments/mypos/worker.js`, puis **Deploy**.
4. **Settings** → **Variables and Secrets** → ajoute :
   - `SITE_ORIGIN` (texte) : `https://la-base.shop`
   - `MYPOS_MODE` (texte) : `live`
   - `MYPOS_CONFIG_PACK` (**secret**, facultatif) : le Configuration pack myPOS. Il sert seulement à
     vérifier la signature des confirmations dans les journaux.
5. Note l'adresse du Worker, du type `https://base-paiement.<ton-nom>.workers.dev`.

## 3. Brancher le site

Dans `assets/js/config.js` :

```js
mypos: {
  sid: "TON_SID",
  walletNumber: "TON_WALLET",
  keyIndex: 1,
  notifyUrl: "https://base-paiement.<ton-nom>.workers.dev/notify",
  sandbox: false
},
```

Le choix **« Carte bancaire »** apparaît alors au paiement, sélectionné par défaut. Après le
formulaire de livraison, le client voit le montant à payer et le formulaire de carte myPOS sur la
même page. Paiement accepté → page « Merci, c'est validé. » et le panier est vidé.

## 4. Tester puis passer en réel

- Test : `sandbox: true` avec les identifiants de test myPOS (SID `000000000000010`, wallet
  `61938166610`, key index `1`) et les cartes de test myPOS. Aucun vrai débit.
- Réel : tes identifiants de boutique et `sandbox: false`.
- Les paiements apparaissent dans ton espace myPOS → **Transactions**, avec la référence de
  commande `BASE-XXXXXX`. Vérifie toujours le montant reçu avant d'expédier.
- Apple Pay et Google Pay ne sont pas disponibles dans le formulaire intégré : Visa, Mastercard,
  Maestro uniquement.
