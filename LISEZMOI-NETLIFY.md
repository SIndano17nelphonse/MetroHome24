# MetroHome24 : site statique pour Netlify (vous gardez le contrôle total)

Ce dossier contient tout le code, sans rien de caché. Vous pouvez tout modifier avec un simple éditeur de texte (VS Code, ou TextEdit en mode « texte brut » sur Mac). **N'utilisez jamais Word.**

## Ce que fait cette version
- Site complet : accueil, recherche par ville, commune et quartier du Haut-Katanga, fiches d'annonces, favoris, pages légales, installation sur téléphone.
- **Les annonces sont dans un seul fichier : `site/assets/data.js`.** C'est vous qui les ajoutez, avec l'outil `outils/ajouter-annonce.html`.
- Un propriétaire qui veut publier remplit le formulaire « Publier un bien » : cela prépare un message WhatsApp (ou e-mail) pour vous. **Vous vérifiez**, puis vous ajoutez l'annonce.
- Les visiteurs appellent ou écrivent directement au publieur (téléphone et WhatsApp).

## Ce qu'elle ne fait pas (il faut un serveur pour cela)
Pas de comptes utilisateurs, pas d'annonces publiées automatiquement par les propriétaires, pas de messagerie, d'avis, de code SMS ni de paiement. Les favoris restent sur le téléphone du visiteur. Quand vous aurez le budget, vous pourrez passer à la version complète (zip `metrohome24-complet`) sans repartir de zéro.

## 1. Mettre en ligne sur Netlify (gratuit)
1. Allez sur **app.netlify.com/drop** et créez un compte gratuit (sinon le site de test est supprimé après un moment).
2. Glissez le dossier **`site`** (pas `metrohome24-netlify`) dans la zone indiquée.
3. Netlify donne une adresse du type `xxxx.netlify.app`. Pour la changer : « Site configuration », « Change site name ».
4. **Mettre à jour :** modifiez vos fichiers, puis dans Netlify, onglet « Deploys », glissez de nouveau le dossier `site`.
5. Nom de domaine à vous (facultatif) : achetez-le chez un vendeur, puis Netlify, « Domain management », « Add a domain » et suivez les instructions. Le HTTPS est automatique.
6. Vérifiez les limites du plan gratuit de Netlify sur netlify.com/pricing : un petit site d'annonces consomme très peu.
7. Variante avec GitHub : mettez tout ce dossier dans un dépôt, puis dans Netlify « Import from Git ». Le fichier `netlify.toml` indique déjà le dossier à publier.

## 2. Avant d'annoncer le site (obligatoire)
1. **Vos coordonnées :** dans `site/assets/data.js`, remplacez `phone` (format `243990000000`, sans +) et `email`.
2. **Annonces d'exemple :** 8 annonces fictives sont fournies, marquées `demo:true`. Tant qu'il en reste, une bannière rose s'affiche en haut du site. **Supprimez-les** et ajoutez vos vraies annonces.
3. **Pages légales** (`cgu.html`, `confidentialite.html`, `anti-fraude.html`, `a-propos.html`, `contact.html`) : remplacez les mentions entre crochets (nom de la société, adresse, RCCM, e-mail) avec « Rechercher et remplacer » de votre éditeur. **Attention :** ces textes décrivent la version complète avec comptes et SMS. Adaptez-les à cette version simplifiée et faites-les relire par un juriste de RDC.
4. **Badges :** « Identité vérifiée », « Mandat vérifié », « Bien inspecté » ne doivent être mis que si vous avez vraiment fait le contrôle. Un badge ne garantit pas la propriété légale.

## 3. Ajouter une annonce
1. Ouvrez `outils/ajouter-annonce.html` par double-clic. Remplissez, cliquez « Générer », puis « Copier ».
2. Ouvrez `site/assets/data.js`, repérez la ligne `listings:[` et collez le texte juste en dessous.
3. Mettez les photos dans `site/photos/` (JPG, 1200 px de large au plus, moins de 300 Ko), avec leurs noms dans l'outil.
4. Redéposez le dossier `site` sur Netlify.
Pour retirer une annonce louée ou vendue : supprimez son bloc `{ ... },` dans `data.js`.

## 4. Où modifier quoi
- **Textes et menus** : `site/index.html`.
- **Couleurs et mise en page** : `site/assets/style.css` (les couleurs sont les variables `--g`, `--y`… au début du fichier).
- **Communes et quartiers** : `site/assets/lieux.js` (à faire vérifier par vos agents locaux).
- **Images du bandeau d'accueil** : `heroImages` dans `data.js`.
- **Icône de l'application et nom** : `site/manifest.webmanifest`, `site/assets/icon-*.png`.

## 5. Règles à suivre pour publier honnêtement
Vérifiez l'identité du propriétaire, demandez le mandat d'un commissionnaire, affichez les honoraires et les frais de visite, n'acceptez jamais de photos prises sur un autre site sans autorisation, et retirez vite toute annonce signalée.
