# Paiement par carte myPOS — mise en route

Le site (la-base.shop) est statique. Pour payer par carte, il passe par un petit service
(`worker.js`) hébergé gratuitement sur Cloudflare Workers. Ce service :

- relit les prix sur le site (le client ne peut pas les modifier) ;
- signe la commande avec la clé privée myPOS (qui ne doit jamais être mise dans le site) ;
- renvoie le client sur la page de paiement myPOS, puis sur la-base.shop après le paiement ;
- reçoit la confirmation de myPOS (`/notify`) et la vérifie.

## 1. myPOS : créer la boutique en ligne

1. Espace myPOS → **Online** (ou « E-com ») → **Online Stores** → **Add online store**.
2. Nom : `BASE` · Site : `https://la-base.shop`.
3. Méthode d'intégration : **Custom integration / API**.
4. Clique sur **Configuration pack** et copie la longue chaîne : elle contient le SID, le numéro
   client, l'index de clé, la clé privée et le certificat myPOS. **Ne la partage avec personne.**

## 2. Cloudflare : créer le service (5 minutes)

1. Crée un compte gratuit sur https://dash.cloudflare.com.
2. **Workers & Pages** → **Create** → **Create Worker** → nom : `base-paiement` → **Deploy**.
3. **Edit code** : efface tout, colle le contenu de `payments/mypos/worker.js`, puis **Deploy**.
4. **Settings** → **Variables and Secrets** → ajoute :
   - `SITE_ORIGIN` (texte) : `https://la-base.shop`
   - `MYPOS_MODE` (texte) : `test` pour essayer, puis `live`
   - `MYPOS_CONFIG_PACK` (**secret**) : le Configuration pack copié à l'étape 1
5. Note l'adresse du Worker, du type `https://base-paiement.<ton-nom>.workers.dev`.

## 3. Brancher le site

Dans `assets/js/config.js`, mets l'adresse du Worker :

```js
paymentUrl: "https://base-paiement.<ton-nom>.workers.dev",
```

Le choix **« Carte bancaire »** apparaît alors au paiement, sélectionné par défaut.

## 4. Tester puis passer en réel

- En `MYPOS_MODE = test`, la page myPOS est la page de test : utilise les cartes de test myPOS.
- Quand tout est bon : `MYPOS_MODE = live`, avec le Configuration pack de ta boutique **réelle**.
- Les paiements apparaissent dans ton espace myPOS → Transactions.
