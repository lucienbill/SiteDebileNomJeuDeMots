# Site pour choisir aléatoirement un nom avec un jeu de mots
## C'est quoi ce truc ?
A l'époque où je travaillais avec [Mickaël](https://twitter.com/Mickael37A), il m'a fait découvrir [ce site](https://mescanefeux.com/452) qui contient une liste de prénoms et de noms avec des jeux de mots.
Je m'en servais de temps en temps pour le travail (histoire vraie. Je teste des logiciels, et crée régulièrement des personnes fictives).
Je suis très fainéant, je voulais donc un truc pour choisir aléatoirement un nom faisant partie de cette liste.

Au départ, j'ai bidouillé un bout de javascript que j'exécutais dans la console du navigateur.
Ca fonctionnait, mais j'avais envie de faire mieux.
J'ai donc fait un site internet : [https://nomavecjeudemotsdebile.pages.dev/](https://nomavecjeudemotsdebile.pages.dev/).

Ce repo GitHub contient le code source du site.

## Comment ça marche ?
### Le site
Ce site permet de choisir aléatoirement un prénom et un nom formant un jeu de mots, parmi une liste fixe (Content/names.js).

### L'hébergement du site
Pour héberger mon site, j'utilise [CloudFlare Pages](https://pages.cloudflare.com/#pricing).
Le code source du site site est le contenu du dossier "Content" (du HTML, du javascript simple, du CSS) ; c'est du 100% front-end.

Le process de déploiement sur mon instance de CloudFlare Pages est : copier le contenu du dossier "Content" et le mettre sur le serveur (en vrai c'est un peu plus subtil que ça, parce que CloudFlare est un CDN, blablabla : d'autres expliquent ça mieux que moi).
Cette opération est réalisée automatiquement à chaque commit/merge sur la branche principale.

## Je peux participer ?
Oui !
Si vous voulez ajouter vous-même des jeux de mots, des fonctionnalités, modifier l'apparence etc : soumettez une pull request.
Si vous souhaitez demander l'ajout d'une fonctionnalité, d'un jeu de mot, signaler un bug et que vous n'avez ni le temps ni l'envie de coder, ouvrez une issue.

### Ces personnes ont contribué au projet
-  [Matthieu Haméon](https://github.com/mhameon)
-  [GTexier37](https://github.com/GTexier37)
-  [HugoLMTY](https://github.com/HugoLMTY)

### Je veux ajouter des noms moi-même, y a-t-il des règles ?
Pour le moment, les seules règles sont de ne pas mettre de doublon et de trier la liste dans l'ordre alphabétique (c'est arbitraire, mais ça me donne l'impression d'y voir plus clair). Pour le reste, je suis ouvert à toute proposition.
