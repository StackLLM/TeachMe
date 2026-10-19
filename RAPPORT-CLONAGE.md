> **Rapport historique du clone Dribbble.** Il documente la reproduction initiale de l'interface ; il ne décrit pas la plateforme marocaine cible. Voir [`Plan.md`](./Plan.md) et [`UX.md`](./UX.md). Les données de démonstration ont depuis été isolées dans `ui/src/test/fixtures/`.

# Rapport de clonage — eLarium

## En bref

- **Source** : <https://dribbble.com/shots/12258178-eLearning-Platform-Web-App-for-Teachers> — shot de Marina Shestmintseva (Anoda), **image fixe** 3200 × 2400.
- **Relevé le** : 2026-10-17.
- **Licence** : aucune licence explicite sur le shot ; concept Dribbble tous droits réservés. Clone local d'étude, non destiné à la publication en l'état.
- **Périmètre** : la page visible « My course » (P-01), les six entrées de sa barre latérale (P-02 à P-07) et une 404 (P-99). Toutes les routes répondent.
- **Chaîne** : `tsc` ✅ · `vitest` ✅ 13 tests · `build` ✅ · `verifier-synchro` ✅ 68 tokens, 44 IDs.
- **Lancer** : `cd ui && npm run dev` → **http://127.0.0.1:6012** (ou `./start.sh`). 6010 et 6011 étaient déjà occupés sur la machine.
- **Preuves visuelles** : `.cloneme/captures/` (4 largeurs, 8 routes, modales, tiroirs, palette, calendrier).

## Pages

| ID | Page | Statut | Écarts forts restants | Remarque |
|---|---|---|---|---|
| P-01 | `/` — My course | cloné | 0 écart fonctionnel ; écart d'échelle assumé | 5 groupes (1→3 colonnes), planning, 3 rappels ; pleine largeur |
| P-02 | `/materials` | cloné (déduit) | n/a — pas de source | bibliothèque, filtres, aperçu, dépôt démo |
| P-03 | `/students` | cloné (déduit) | n/a | tableau, assiduité, tiroir de profil |
| P-04 | `/reviews` | cloné (déduit) | n/a | onglets, note, publication démo |
| P-05 | `/messages` | cloné (déduit) | n/a | liste + fil, envoi local, nouveau fil ; « Massages » corrigé |
| P-06 | `/settings` | cloné (déduit) | n/a | profil, préférences, notifications, motion |
| P-07 | `/groups/:id` | cloné (déduit) | n/a | séances, présence, roster, visio |
| P-99 | `*` | cloné | n/a | 404 dans la coque, retour My course |

« Déduit » signifie : la page n'est pas visible sur la capture. Elle est construite
à partir de l'entrée de navigation, avec le même système visuel et des données de
démonstration. Son contenu n'est pas une copie de la source.

## Ce qui a été testé

| Vérification | Comment | Résultat |
|---|---|---|
| Typage | `npx tsc --noEmit` | ✅ 0 erreur |
| Tests de parcours | `npx vitest run` | ✅ 13/13 (3 fichiers) |
| Build | `npm run build` | ✅ 264,7 Ko JS · 82,0 Ko CSS (gzip 80,9 / 12,9 Ko) |
| Synchro fichiers ↔ code | `verifier-synchro.mjs` | ✅ 68 tokens, 44 IDs, 9 constantes |
| Captures | Playwright + Chrome for Testing, 1440/1920/2560/1024/768/375 | ✅ 54 captures : 41 de pages + 13 d'interactions |
| Débordement horizontal | 8 routes × 6 largeurs (375 → 2560) | ✅ 0 débordement (`scrollWidth ≤ innerWidth`), 48 pages-largeurs |
| Plein écran | coque 100 % de la fenêtre, sans cadre, rayon ni ombre externes ; aucun `max-width` | ✅ coque mesurée de 1024 px (1024) à 2560 px (2560) ; contenu qui suit |
| Erreurs console | parcours Playwright complet | ✅ 0 erreur, 0 exception |
| Clics et états | tests + Playwright | ✅ groupe créé, rappel retiré/annulé, jour changé, palette → élève, tiroir, visio, note publiée, message envoyé, réglages enregistrés, tiroir mobile, calendrier, menu profil |

Détail des tests : `ui/src/test/tableau.test.tsx` (5), `navigation.test.tsx` (6),
`messages.test.tsx` (2). Les tests couvrent la page, la 404, la recherche
globale, le filtrage, la création, le retrait/undo et les formulaires.

## Écarts restants

| Où | Écart | Raison | Gravité |
|---|---|---|---|
| Coque entière | capture : coque à ~80 % de la largeur, marges ~10 % ; clone : **100 % de la fenêtre**, sans cadre, rayon ni ombre externes, fond ornementé intégré sous un voile givré | la capture est une planche de présentation ; le clone est une app plein écran ; proportions internes conservées | moyen, assumé |
| Typographie | Poppins au lieu de la police exacte (type Gilroy) | aucun fichier source ; substitut libre le plus proche | moyen, assumé |
| Avatars | portraits Unsplash au lieu des photos de la capture | photos non réattribuables | faible |
| Fond | masses SVG floutées au lieu du motif exact | assets non fournis | faible |
| P-02 à P-07 | contenu inventé (supports, copies, conversations, élèves) | non visibles sur la capture | n/a |
| Planning | « 431 group » n'existe pas dans la liste des groupes | groupe partagé, cohérence de la source ; la visio utilise un libellé fixe | faible |
| Roster | 3 élèves affichés sur 10 | jeu de démonstration partiel | faible |
| P-05 | « Massages » → « Messages » | coquille évidente de la source, corrigée volontairement | faible |
| Shell desktop | coque à hauteur fixe, zone principale défilante | adaptation d'écran ; la capture est statique | faible |
| Capture `.aco` | palette officielle inaccessible (HTTP 202) | protection Dribbble | faible, palette mesurée au pixel |

Aucun écart de type « couleur différente », « police absente » ou « route
cassée » n'a été relevé. Les couleurs, rayons, ombres et tailles du clone sont
dans `palette.md` et `tokens.css` ; le script vérifie qu'ils sont identiques.

## Limites

- **Pas de DOM source** : la comparaison par empreintes du script
  `comparer-empreintes.mjs` ne s'applique pas. Les empreintes du clone sont
  dans `.cloneme/mesures/clone/` ; la comparaison à la source est visuelle et
  géométrique, à partir de la capture.
- **Animations déduites** : la source est une image fixe. Les durées, courbes et
  états de survol sont des choix cohérents, documentés dans `animation.md`.
- **Backend absent** : les sept points d'intégration sont en mode démo. Aucun
  message, note, groupe, support ou réglage ne quitte le navigateur.
- **Fichiers et visio** : le téléchargement, le dépôt de fichier et la salle de
  visio n'existent pas ; les modales le disent explicitement.
- **Données** : le jeu de démonstration est isolé dans `ui/src/test/fixtures/`
  depuis la phase 0 ; l'interface démarre vide. Les ajouts restent en mémoire et
  disparaissent au rechargement.
- **Erreurs** : `?demo-erreur=1` fait échouer les fonctions de `lib/api.ts` pour
  vérifier les états d'erreur.
- **À regarder en direct** : survols et élévations (A-01), entrée de page
  (A-02), ressort des modales (A-03), tiroir mobile (A-04), sélection de jour
  (A-05), retrait de rappel + toast (A-06), cascade des cartes (A-09), mode
  réduit (A-10).

## Dépendances et technologies

| Paquet | Version | Pourquoi |
|---|---|---|
| `react` / `react-dom` | 18.3.1 | UI |
| `react-router-dom` | 6.28 | 8 routes, query params pour les tiroirs et filtres |
| `@fontsource/poppins` | 5.1 | police embarquée, aucune requête Google Fonts |
| `vite` | 5.4 | serveur de dev et build |
| `typescript` | 5.6 | strict, `noUnusedLocals` |
| `vitest` + `jsdom` | 2.1 / 25 | tests de parcours |
| `@testing-library/react`, `dom`, `jest-dom` | 16 / 10 / 6 | requêtes accessibles, matchers |

Pas de Tailwind, pas de framer-motion, pas de bibliothèque d'icônes : CSS par
composant, SVG dessinés à la main, transitions CSS. Le bundle reste à ~265 Ko
avant gzip.

## Droits

- **Concept et capture Dribbble** : tous droits réservés à Marina Shestmintseva /
  Anoda. La capture n'est utilisée que comme référence d'analyse dans
  `.cloneme/ressources/` ; elle n'est pas servie dans l'application.
- **Textes, logo et mise en page d'origine** : à remplacer avant toute
  publication. Le clone est une base de travail locale.
- **Portraits** : Unsplash License (usage gratuit, attribution non obligatoire).
  Sources et fichiers dans `.cloneme/ressources.json`.
- **Poppins** : SIL Open Font License 1.1.
- **Logo toucan, orbes et fond** : dessin SVG original du clone.

## Fichiers de référence

- `design.md` — 8 pages, 26 composants, responsive, états, intégrations.
- `palette.md` — 68 tokens (couleurs, typo, rayons, ombres, dimensions,
  animations) avec leur origine.
- `animation.md` — 10 animations, durées, courbes, mode réduit, constantes JS.
- `.cloneme/instantane/` — copie des trois fichiers au dernier état synchronisé.
- `.cloneme/mesures/clone/P-01@{1440,1920,2560,1024,768,375}.json` — géométrie et
  styles calculés des cibles.
- `.cloneme/mesures/audit-fullwidth.json` — 48 contrôles (8 routes × 6 largeurs) :
  débordement, boîte de la coque, colonnes du dashboard, grilles et chat.
- `.cloneme/captures/` — captures de validation.
