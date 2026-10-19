# Design — eLarium

| | |
|---|---|
| Source | https://dribbble.com/shots/12258178-eLearning-Platform-Web-App-for-Teachers |
| Auteure | Marina Shestmintseva (Anoda) |
| Relevé le | 2026-10-17 |
| Licence | Concept Dribbble — tous droits réservés, reproduction locale d'étude. Voir `RAPPORT-CLONAGE.md` §Droits. |
| Capture | `.cloneme/ressources/shot-original.png` (3200 × 2400 px) |
| Largeurs de référence | 1440 · 1024 · 768 · 375 · contrôle full-width 1920 et 2560 |
| Stack source | Aucune : la source est une **image fixe** (Figma / Illustrator, mentionnés par l'auteure). |
| Stack clone | Vite 5 + React 18 + TypeScript strict + react-router-dom 6, CSS par composant + variables CSS, `@fontsource/poppins`. |
| Port | 6012 (`npm run dev`) |

> **Note (phase 0)** : le prototype démarre sans données ; les jeux de démonstration sont isolés dans `ui/src/test/fixtures/` et ne sont plus importés par l'application. Les pages ci-dessous décrivent l'interface historique, conservée comme référence de design.

La source est une unique capture d'écran d'application, pas un site. Le
périmètre cloné est donc **une page visible** (`My course`) et les six entrées
de navigation qu'elle expose. Ces six entrées sont construites dans le même
système visuel, marquées **Déduit** : elles ne sont pas visibles sur la capture.
Aucune page n'est inventée hors de ce que la barre latérale promet.

## 1. Pages et routes

| ID | Route clone | URL source | Type | Gabarit | Statut | Origine |
|---|---|---|---|---|---|---|
| P-01 | `/` | capture « My course » | tableau de bord | C-01 | cloné | Mesuré |
| P-02 | `/materials` | entrée « Materials » | bibliothèque de supports | C-01 | cloné | Déduit |
| P-03 | `/students` | entrée « Students » | liste d'élèves | C-01 | cloné | Déduit |
| P-04 | `/reviews` | entrée « Reviews » | copies à corriger | C-01 | cloné | Déduit |
| P-05 | `/messages` | entrée « Massages » (coquille source) | messagerie | C-01 | cloné | Déduit |
| P-06 | `/settings` | entrée « Settings » | réglages | C-01 | cloné | Déduit |
| P-07 | `/groups/:id` | carte de groupe | détail d'un groupe | C-01 | cloné | Déduit |
| P-99 | `*` | — | 404 | C-01 | cloné | Approximé |

- La coquille ne change pas entre les routes : C-01, C-02 et C-03 restent
  montés. Les pages changent dans `zone-principale`.
- Le titre du document suit la route : « My course · eLarium », etc.
- Une carte de groupe mène à `/groups/:id` ; un groupe inconnu affiche la 404.

## 2. Navigation et parcours

- **Barre latérale** (C-02) : logo (C-04) puis Materials · My course ·
  Students · Reviews · Messages · Settings. L'ordre et les libellés sont
  mesurés sur la capture. La coquille « Massages » est corrigée en
  « Messages » (faute évidente de la source, signalée au rapport).
- Lien actif : fond `--couleur-panneau`, rayon droit `--rayon-pilule`, texte
  `--couleur-texte`, icône `--couleur-secondaire-fonce`. Les autres liens sont
  en `--couleur-texte-faible`.
- Un point corail sur Messages signale les messages non lus ; il disparaît
  quand la page Messages est ouverte.
- **Bloc « Upgrade your schedule »** (C-11) : ouvre une modale d'offre (démo).
- **Barre haute** (C-03) : recherche (C-16 au clic), bouton visio (ouvre la
  modale de classe en direct), avatar (menu profil : Settings, Sign out démo).
- **Barre latérale mobile** : sous 980 px, elle devient un tiroir (A-04) ouvert
  par le bouton menu de la barre haute ; fermeture par Échap, voile ou clic sur
  un lien.
- Parcours clés : My course → carte de groupe → groupe ; Students → Message →
  Messages ; Reviews → Start review → modale d'évaluation ; Settings →
  enregistrement démo.

## 3. Gabarits

### C-01 — Gabarit principal
- Structure : fond ornementé (C-24) · coque · barre latérale (C-02) ·
  contenu (barre haute C-03 + zone principale).
- Coque : **100 % de la fenêtre** — aucun `max-width`, aucun retrait, aucun
  rayon, aucune ombre. Le fond ornementé (C-24) reste perceptible sous un voile
  givré (`--couleur-surface-voile` + `--flou-voile`) : l'interface n'est plus
  posée comme une carte sur un fond extérieur, elle occupe toute la surface.
  La barre latérale est transparente sur desktop ; le tiroir mobile reste
  opaque pour être lisible au-dessus du voile. Le voile est porté par un
  pseudo-élément fixe de la coque, pour ne pas créer de bloc conteneur qui
  piégerait les modales en `position: fixed`.
- Zone principale : grille `minmax(0, 1fr) var(--largeur-colonne)` à partir de
  1180 px ; une seule colonne en dessous de 980 px. La colonne de droite est
  fluide (`clamp(348px, 24vw, 440px)`).
- La page remplit la hauteur de la zone principale : le tableau de bord étire
  son panneau et sa colonne, les pages secondaires remplissent le panneau mint.
- Panneau principal : fond `--couleur-panneau`, rayon `--rayon-panneau`,
  padding `--espace-panneau`.
- Retour en haut à chaque changement de route. Entrée de page A-02.
- Fichier : `ui/src/gabarits/GabaritPrincipal.tsx` + `.css`.

## 4. Pages, section par section

### P-01 — My course
| # | Section | Composants | @1440 | @768 | @375 | Origine |
|---|---|---|---|---|---|---|
| 1 | Groups | C-06, C-05, C-12 | 5 cartes, 1 colonne jusqu'à ~2000 px puis 2–3 colonnes (`auto-fill` min 520 px) ; 88 px de haut | idem, cartes 80 px | métadonnées et avatars resserrés | Mesuré / Déduit (full-width) |
| 2 | New group | C-12 | bouton corail centré, 52 px | idem | pleine largeur | Mesuré |
| 3 | Schedule | C-07, C-08, C-09 | colonne 348–440 px fluide, 4 événements | sous Groups | sous Groups | Mesuré |
| 4 | Reminder | C-10 | 3 rappels sous Schedule | sous Schedule | idem | Mesuré |

- **Groups** : titre `--taille-titre-section`, 5 cartes (fixtures de test),
  bouton `New group` (modale C-14 + formulaire). La carte entière est un lien.
- **Schedule** : titre, date « 17 June, 2020 », sélecteur de 5 jours (16–20)
  dont le 17 est sélectionné (pêche), 4 événements pour le jour choisi.
- **Reminder** : 3 rappels datés. Le premier est prioritaire : carte pêche,
  texte corail. Les deux autres : carte blanche, pastille colorée, texte
  `--couleur-secondaire-fonce`. Croix = retrait + toast « Undo » (A-06).

### P-02 — Materials
- Barre haute de page : titre, sous-titre, bouton « Add material » (modale
  démo), recherche locale, filtres par type (All · Slides · Sheets · Video ·
  Exam).
- Grille de 9 cartes (C-18) en `auto-fill` (min 300 px) : 3 colonnes à 1440,
  6 à 2560. Vignette géométrique, titre, groupe, date, format. Carte cliquable
  → aperçu dans une modale avec métadonnées et mention « fichier de
  démonstration ».
- État vide (C-22) quand le filtre ne rend rien, avec réinitialisation.

### P-03 — Students
- Trois indicateurs (élèves, assiduité moyenne, groupes actifs).
- Champ de recherche + filtre par groupe.
- Tableau (C-19) : élève (avatar C-17), groupe, assiduité (barre), dernière
  activité, action « Message » → `/messages` avec le bon fil.
- Sous 980 px, le tableau devient une liste de cartes (mêmes données).

### P-04 — Reviews
- Onglets : To review · Reviewed.
- Grille de cartes (C-20) en `auto-fit` (min 340 px) : à 2560 px, les 3 copies
  s'étirent sur toute la largeur. Élève, devoir, groupe, date, extrait. Bouton « Start review »
  ouvre une modale : texte de la copie, note (0–20), commentaire, boutons
  « Save draft » et « Publish (demo) ». Après publication, la carte passe dans
  « Reviewed » et un toast confirme l’état démo.
- État vide quand l’onglet est vide.

### P-05 — Messages
- Deux colonnes : liste des conversations + fil (C-21). Sélection par état
  d’URL `?fil=...` pour que le rechargement garde le fil.
- Envoi : champ + bouton. Le message est ajouté localement par
  `envoyerMessage()` en mode démo (aucune requête réseau). La carte de chat
  occupe la hauteur disponible (`flex: 1`, min 400 px) ; la liste passe de 298
  à 380 px selon la largeur.
- Sous 980 px : la liste et le fil s’empilent ; un bouton retour revient à la
  liste.
- Le badge de non-lus de C-02 se met à jour.

### P-06 — Settings
- Profil (nom, e-mail, rôle), préférences (langue, fuseau), notifications
  (3 interrupteurs), animations (bascule A-10). Aucun `max-width` de
  formulaire : la grille est `1fr + 320–380 px`. Au-delà de 2000 px, les
  sections deviennent quatre cartes en 2 colonnes et le pied « Save » occupe
  toute la largeur ; au-dessous de 1300 px, tout s'empile.
- Enregistrement via `enregistrerReglages()` ; états chargement / succès /
  erreur, message « Demo — nothing was sent ».
- Les valeurs sont pré-remplies depuis les fixtures de test lorsque les tests en injectent.

### P-07 — Group detail
- En-tête : retour, nom du groupe, cours, prochaine séance, boutons « Start
  lecture » (modale visio) et « Add lecture » (démo).
- Contenu en `1.6fr + 320–440 px` : les séances prennent la largeur, le roster
  est plafonné à 440 px ; une seule colonne sous 1280 px.
- Indicateurs : élèves, assiduité, séances.
- Liste des séances (date, heure, statut, présence) et élèves du groupe.
- Données tirées du groupe ; groupe inconnu → 404.

### P-99 — 404
- Titre « This page wandered off », texte, bouton retour à My course, URL
  demandée rappelée. Style de la coque.

## 5. Composants

### C-01 — Gabarit principal
- Rôle : coque, grille, fond, entrée de page.
- Fichier : `src/gabarits/GabaritPrincipal.tsx`.

### C-02 — Barre latérale
- Rôle : navigation principale, logo, offre, settings.
- Dimensions : `--largeur-sidebar` ; padding 28 px ; liens 44 px de haut.
- États : actif, survol, focus. Tiroir mobile A-04.
- Fichier : `src/composants/BarreLaterale.tsx`.

### C-03 — Barre haute
- Rôle : recherche, visio, profil, menu mobile.
- Hauteur `--hauteur-entete` ; actions alignées à droite.
- Focus clavier sur chaque action.
- Fichier : `src/composants/EnTete.tsx`.

### C-04 — Logo eLarium
- Toucan géométrique en SVG (corail, sarcelle, pêche) + mot « eLarium ».
- Le SVG est dessiné pour le clone, pas copié de la source.
- Fichier : `src/composants/Logo.tsx`.

### C-05 — Carte de groupe
- Rôle : résumé d’un groupe ; toute la carte est un lien.
- Contenu : titre corail, date, heure, avatars empilés + pastille « +7 »,
  « Lecture N (next) ».
- Dimensions : hauteur 88 px, rayon `--rayon-carte`, padding 16 px 22 px.
- États : survol (élévation A-01), focus (anneau), nouvelle carte A-07.
- Fichier : `src/composants/CarteGroupe.tsx`.

### C-06 — Panneau Groups
- Rôle : liste des groupes, titre, bouton New group, modale de création.
- Dimensions : liste en `auto-fill` (min 520 px) à partir de 1500 px ; 1
  colonne jusqu'à ~2000 px, 2 ensuite, 3 à 2560. Au-delà de 1600 px, le bouton
  New group passe dans l'en-tête du panneau, à droite du titre, et la liste
  occupe toute la largeur.
- Fichier : `src/composants/PanneauGroupes.tsx`.

### C-07 — Panneau Schedule
- Rôle : titre, date, sélecteur de jour, liste d’événements du jour.
- Fichier : `src/composants/PanneauPlanning.tsx`.

### C-08 — Sélecteur de jour
- 5 colonnes ; le jour actif est une pastille pêche avec deux points.
- Ordre inversé dans la pastille active (jour puis numéro), comme la source.
- Fichier : `src/composants/SelecteurJour.tsx`.

### C-09 — Carte d’événement
- Orbe géométrique (C-23), « 431 group » en sarcelle + « (Lecture 1) » en
  corail, heure.
- Fichier : `src/composants/CarteEvenement.tsx`.

### C-10 — Liste des rappels et carte de rappel
- Pastille de date + carte décalée qui la chevauche.
- Prioritaire : carte pêche, titre corail. Les autres : carte blanche, titre
  sarcelle.
- Croix accessible (aria-label), retrait animé A-06.
- Fichier : `src/composants/ListeRappels.tsx`.

### C-11 — Carte d’offre
- Carte blanche, formes géométriques, texte « Upgrade your schedule » et
  flèche ; ouvre la modale d’offre.
- Fichier : `src/composants/CarteOffre.tsx`.

### C-12 — Bouton
- Variantes : `primaire` (corail), `secondaire` (sarcelle), `fantome`
  (transparent), `danger` (erreur), tailles `normal` / `petit` / `large`.
- États : survol, appui, focus, désactivé, chargement (`aria-busy`).
- Fichier : `src/composants/Bouton.tsx`.

### C-13 — Champ
- Label, input/textarea/select, aide, erreur (`aria-invalid`,
  `aria-describedby`).
- Fichier : `src/composants/Champ.tsx`.

### C-14 — Modale
- Rôle : dialogue centré, voile, focus piégé, Échap, clic sur le voile.
- Largeur 520 px (480 px sous 600), rayon `--rayon-carte`, ombre
  `--ombre-modale`.
- Fichier : `src/composants/Modale.tsx`.

### C-15 — Toast
- Notification en bas à droite, action éventuelle (« Undo »), auto-retrait
  4,2 s, pause au survol.
- Fichier : `src/composants/Toast.tsx`.

### C-16 — Palette de recherche
- Recherche globale (groupes, élèves, supports, conversations) ; résultats
  groupés, navigation clavier (flèches, Entrée), état vide.
- Fichier : `src/composants/PaletteRecherche.tsx`.

### C-17 — Avatar
- Image ronde, anneau blanc, initiale de secours, tailles 26 / 34 / 40 / 64.
- Fichier : `src/composants/Avatar.tsx`.

### C-18 — Carte de matériau
- Vignette géométrique selon le type, titre, groupe, date, format.
- Fichier : `src/composants/CarteMateriau.tsx`.

### C-19 — Tableau des élèves
- Tableau desktop, cartes en mobile, barre d’assiduité.
- Fichier : `src/composants/TableauEleves.tsx`.

### C-20 — Carte d’évaluation
- Copie à corriger, extrait, statut, action.
- Fichier : `src/composants/CarteEvaluation.tsx`.

### C-21 — Fil de messages
- Liste de bulles, envoi local, état vide.
- Fichier : `src/composants/FilMessages.tsx`.

### C-22 — État vide
- Icône, titre, texte, action de réinitialisation.
- Fichier : `src/composants/EtatVide.tsx`.

### C-23 — Icônes
- Jeu SVG maison, trait 1,8 px, bouts arrondis, `currentColor`.
- Fichier : `src/composants/Icones.tsx`.

### C-24 — Ornements de fond
- Grandes masses géographiques floutées en SVG, comme les éléments
  « chaotiques » décrits par l’auteure.
- Fichier : `src/composants/OrnementsFond.tsx`.

### C-25 — Pastille
- Petites pastilles : « +7 », statut de séance, non-lus, type de support.
- Fichier : `src/composants/Pastille.tsx`.

### C-26 — En-tête de page
- Surtitre, titre `h1`, sous-titre et actions, commun aux pages P-02 à P-07.
- Fichier : `src/composants/EntetePage.tsx`.

## 6. Typographie appliquée

| Niveau | Famille | Taille @1440 | @768 | @375 | Interligne | Graisse | Casse | Origine |
|---|---|---|---|---|---|---|---|---|
| Titre de section | `--police-texte` | `--taille-titre-section` (28 px) | 25 px | 23 px | `--interligne-serre` | 700 | — | Mesuré / Déduit |
| Titre de page | `--police-texte` | `--taille-titre-page` (32 px) | 29 px | 26 px | `--interligne-serre` | 700 | — | Déduit |
| Titre de carte | `--police-texte` | `--taille-titre-carte` (18 px) | 16,5 px | 16 px | 1.25 | 600 | — | Mesuré |
| Navigation | `--police-texte` | `--taille-nav` (15 px) | 16 px | 16 px | 1.2 | 500 / 600 actif | — | Mesuré |
| Méta | `--police-texte` | `--taille-meta` (12,5 px) | 12 px | 12 px | 1.4 | 400 | — | Mesuré |
| Bouton | `--police-texte` | `--taille-bouton` (15 px) | 15 px | 15 px | 1.2 | 600 | — | Mesuré |
| Logo | `--police-texte` | `--taille-logo` (22 px) | 22 px | 20 px | 1 | 700 | — | Mesuré |

Au-delà de 1600 px, les titres passent à 30 px (section) et 36 px (page), les
paddings de panneau à 44 px, les gouttières à 30 px.

## 7. Responsive

| Point de rupture | Ce qui change | Origine |
|---|---|---|
| ≥ 1600 px | pleine largeur : sidebar 272–300, colonne 384–440, padding 44, titres 30/36, groupes en 1–3 colonnes (2 à partir de ~2000, 3 à 2560), réglages en sections 2 colonnes, matières en `auto-fill`, copies en `auto-fit` | Déduit (full-width) |
| ≥ 1181 px | 3 zones : sidebar `clamp(252, 17vw, 300)`, panneau principal, colonne `clamp(348, 24vw, 440)` ; coque pleine fenêtre | Mesuré / Déduit |
| 1181–1599 px | sidebar 252–272, colonne 348–384, paddings 36 | Déduit |
| 981–1179 px | sidebar 224, colonne 316, paddings 22, coque pleine fenêtre | Déduit |
| ≥ 981 px | coque à hauteur fixe (`100vh`), barre haute et barre latérale fixes, zone principale défilante | Déduit |
| ≤ 980 px | coque pleine fenêtre ; barre latérale en tiroir ; grille en une colonne ; Schedule et Reminder passent sous Groups ; la barre haute gagne le bouton menu et le logo | Déduit |
| ≤ 600 px | coque pleine fenêtre ; cartes pleine largeur ; boutons pleine largeur ; avatars réduits ; sélecteur de jour compact | Déduit |
| `prefers-reduced-motion` | animations neutralisées (A-10) | Déduit |

## 8. États de page

| État | Où | Rendu | Origine |
|---|---|---|---|
| 404 | route inconnue | titre, texte, retour My course | Approximé |
| Vide | recherche, filtres, onglet Reviews vide | C-22 avec réinitialisation | Approximé |
| Chargement | enregistrement Settings, envoi message | bouton `aria-busy`, libellé « Saving… » | Approximé |
| Erreur | formulaires, `?demo-erreur=1` | message sous le champ / bandeau | Approximé |
| Succès | Settings, Reviews, New group | toast + état démo explicite | Approximé |
| Recherche sans résultat | C-16 | C-22 | Approximé |

## 9. Points d’intégration backend

Tous dans `ui/src/lib/api.ts`, mode démo par défaut. `?demo-erreur=1` force
l’échec pour vérifier les états d’erreur.

| Fonction (`src/lib/api.ts`) | Utilisée par | Mode démo | À brancher |
|---|---|---|---|
| `creerGroupe(donnees)` | New group | ajoute localement, `{ ok: true, demo: true }` | POST `/api/groups` |
| `envoyerMessage(filId, contenu)` | Messages | ajoute localement, `{ ok: true, demo: true }` | POST `/api/messages` |
| `enregistrerReglages(reglages)` | Settings | 600 ms, `{ ok: true, demo: true }` | PUT `/api/settings` |
| `deposerMateriau(donnees)` | Materials | ajoute localement, `{ ok: true, demo: true }` | POST `/api/materials` |
| `enregistrerEvaluation(donnees)` | Reviews | déplace la copie, `{ ok: true, demo: true }` | POST `/api/reviews` |
| `planifierSeance(donnees)` | Group detail | ajoute la séance localement | POST `/api/groups/:id/lectures` |
| `creerSeanceVisio(groupeId)` | Visio | rend un lien factice `demo://` | POST `/api/live` |

Aucune de ces fonctions ne prétend avoir envoyé quelque chose : l’interface
affiche « Demo — nothing was sent » ou « Saved locally (demo) ».

## 10. Correspondance source → clone

| Élément | Position sur la capture (1512 px) | Composant | Sélecteur clone |
|---|---|---|---|
| coque | x 152–1360, y 52–1083 | C-01 | `[data-ref="coque"]` |
| barre latérale | x 152–390 | C-02 | `[data-ref="barre-laterale"]` |
| logo | x 180–298, y 88–130 | C-04 | `[data-ref="logo"]` |
| panneau Groups | x 390–1019, y 150–1052 | C-06 | `[data-ref="panneau-groupes"]` |
| première carte | x 441–957, y 287–388 | C-05 | `[data-ref="carte-groupe"]` |
| bouton New group | x 536–862, y 944–995 | C-12 | `[data-ref="bouton-nouveau-groupe"]` |
| colonne droite | x 1019–1360 | C-07 + C-10 | `[data-ref="colonne-droite"]` |
| calendrier | x 1111–1161, y 309–391 | C-08 | `[data-ref="selecteur-jour"]` |
| premier événement | x 1035–1337, y 414–480 | C-09 | `[data-ref="carte-evenement"]` |
| premier rappel | x 1044–1349, y 826–889 | C-10 | `[data-ref="carte-rappel"]` |
| recherche | x 1043–1165, y 88–124 | C-16 | `[data-ref="recherche"]` |
| carte d’offre | x 172–348, y 666–840 | C-11 | `[data-ref="carte-offre"]` |

## 11. Limites

- Une seule page est visible. Les six autres routes sont **déduites** de la
  navigation ; leur contenu est de démonstration, cohérent avec le sujet.
- La police exacte est inconnue ; Poppins est un substitut libre (OFL).
- Les avatars de la capture sont des photos impossible à réattribuer. Le clone
  utilise des portraits libres Unsplash, listés dans `.cloneme/ressources.json`.
- Les orbes du planning et les formes décoratives sont redessinés en SVG.
- Les états de survol, focus, chargement, erreur et vide ne sont pas visibles
  sur la capture : ils sont **Approximés** à partir de la palette.
- La coquille « Massages » de la source est corrigée en « Messages ».
- Aucune donnée réelle dans l'application : les jeux de démonstration sont isolés dans `ui/src/test/fixtures/` ; les dates et libellés du prototype restent à remplacer (Lot 4).
- **Échelle / plein écran** : la capture est une planche de présentation (coque
  à 80 % de la largeur, marges de ~10 %). Le clone occupe **100 % de la
  fenêtre**, sans cadre, sans rayon ni ombre externes : le fond ornementé est
  intégré à l'interface sous un voile givré, plutôt que laissé autour d'une
  carte flottante. Aucun `max-width` de conteneur. Les proportions internes
  sont conservées ; les valeurs absolues sont mises à l'échelle. C'est une
  adaptation d'écran assumée, pas une mesure.
- **431 group** : présent uniquement dans le planning du 17 juin (groupe
  partagé, absent de la liste « My course »). Son événement ouvre la modale
  visio avec un libellé fixe, sans sélecteur de groupe.
- **Roster partiel** : le tiroir et la page groupe affichent les 3 élèves de
  démonstration du groupe sur les 10 annoncés ; la mention est visible.
- **Défilement** : sur desktop, la coque garde la hauteur de l'écran et la zone
  principale défile (les longues pages ne poussent pas la barre latérale). Sous
  981 px, c'est la page entière qui défile, comme sur mobile.
