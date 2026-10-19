# eLarium — prototype d'interface, en transition vers la plateforme marocaine

> **Phase 0 — analyse & conception.** Le dépôt contient encore le prototype
> d'interface cloné d'une capture Dribbble ; il n'est pas la plateforme cible.
> Le plan directeur est [`Plan.md`](./Plan.md) et la spécification UX
> [`UX.md`](./UX.md). Les données de démonstration ont été retirées du code
> applicatif et isolées dans `ui/src/test/fixtures/` : l'interface démarre donc
> **sans contenu** et affiche des états vides. Voir la section « État actuel »
> de `Plan.md` (§2 et §13).

Base frontend React du tableau de bord **eLarium**, reproduite d'après le shot
Dribbble « eLearning Platform – Web App for Teachers » de Marina Shestmintseva
(Anoda) :

<https://dribbble.com/shots/12258178-eLearning-Platform-Web-App-for-Teachers>

La source est une **image fixe**, pas un site : la page visible (`My course`) est
reproduite au plus près, et les six entrées de navigation qu'elle expose sont
construites dans le même système visuel. La coque occupe **toute la fenêtre**,
sans cadre ni carte flottante : le fond ornementé de la source est intégré à
l'interface sous un voile givré, sans `max-width`. Les grilles de cartes, le
planning, les formulaires et les tableaux s'étendent avec l'écran (jusqu'à
3 colonnes de groupes et 6 de supports sur un écran 2560 px). Le détail de ce qui est mesuré, déduit
ou approximé est dans `design.md`, `palette.md` et `animation.md`.

## Lancer

```bash
cd ui
npm install     # déjà fait dans ce dossier
npm run dev     # http://127.0.0.1:6012
```

ou, depuis la racine :

```bash
./start.sh
```

Le serveur écoute explicitement sur `127.0.0.1` : utilisez cette adresse si
`localhost` est capté par un autre processus IPv6.

Le port **6012** est utilisé (6010 et 6011 étaient déjà occupés sur la machine).
`./stop.sh` arrête le serveur.

Autres commandes, depuis `ui/` :

```bash
npm run build       # tsc --noEmit + vite build
npm run preview     # sert dist/ sur le port 6012
npm test            # vitest run (13 tests)
```

## Ce qui est dans le clone

| Route | Page | Origine |
|---|---|---|
| `/` | My course : 5 groupes, planning du 17 juin, 3 rappels | mesuré sur la capture |
| `/materials` | bibliothèque de supports, filtres, aperçu, dépôt démo | déduit de la navigation |
| `/students` | élèves, assiduité, recherche, tiroir de profil | déduit |
| `/reviews` | copies à corriger, note, retour publié en démo | déduit |
| `/messages` | conversations, envoi local, nouveau fil | déduit |
| `/settings` | profil, préférences, notifications, animations | déduit |
| `/groups/:id` | détail d'un groupe, séances, roster | déduit |
| `*` | 404 | approximé |

Tout reste interactif, mais l'interface ne contient plus de données fictives :
les listes sont vides tant que le backend n'est pas branché. Les tests injectent
deux-mêmes leurs fixtures.

## Les trois fichiers de référence

Ils sont à la racine et pilotent le code :

- **`design.md`** — pages, routes, gabarits, composants `C-xx`, états,
  responsive, points d'intégration.
- **`palette.md`** — chaque token couleur, typo, rayon, ombre, dimension, avec
  son origine (Relevé / Mesuré / Déduit / Approximé / Inaccessible).
- **`animation.md`** — animations `A-xx`, durées, courbes, mode réduit.

Pour changer l'apparence : modifier `palette.md`, puis
`ui/src/styles/tokens.css` avec la même valeur. Le script de contrôle vérifie
que les deux restent identiques :

```bash
node Skills/CloneMe/scripts/verifier-synchro.mjs .
```

Il vérifie aussi que chaque ID de page, composant et animation est présent dans
le code (`cloneme: P-xx`, `C-xx`, `A-xx`).

## Brancher un backend

Tout passe par `ui/src/lib/api.ts`, avec `MODE_DEMO = true` par défaut :

- `creerGroupe(donnees)` → `POST /api/groups` (exemple à définir)
- `envoyerMessage(filId, texte)` → `POST /api/messages`
- `enregistrerReglages(reglages)` → `PUT /api/settings`
- `deposerMateriau(donnees)` → `POST /api/materials`
- `enregistrerEvaluation(donnees)` → `POST /api/reviews`
- `planifierSeance(donnees)` → `POST /api/groups/:id/lectures`
- `creerSeanceVisio(groupeId)` → `POST /api/live`

Chaque fonction a un délai simulé et rend `{ ok: true, demo: true }`. Passer
`?demo-erreur=1` dans l'URL fait échouer les fonctions pour tester les états
d'erreur. Les fixtures de test sont dans `ui/src/test/fixtures/donnees.ts` ;
elles ne sont jamais importées par le code applicatif. Les types du prototype
restent dans `ui/src/lib/types.ts`.

## Structure

```text
elarium-clone/
├── design.md · palette.md · animation.md · RAPPORT-CLONAGE.md
├── .cloneme/            inventaire, ressources, cibles, mesures, captures
├── ui/
│   ├── public/ressources/avatars/    portraits Unsplash
│   └── src/
│       ├── styles/      tokens.css · base.css · animations.css
│       ├── lib/         animations.ts · api.ts · types.ts · seances.ts
│       ├── test/        fixtures/ · 13 tests de parcours
│       ├── state/       Animations · Donnees · Notifications
│       ├── gabarits/    GabaritPrincipal
│       ├── composants/  Logo, BarreLaterale, EnTete, cartes, modales…
│       ├── pages/       une page par route
```

## Droits

- Le **concept Dribbble et la capture** appartiennent à leur auteure. Ce clone
  est une base d'étude locale : ne pas publier les textes, le logo ou la mise en
  page d'origine sans autorisation.
- Les **portraits** viennent d'Unsplash (Unsplash License) et remplacent les
  photos non réattribuables de la capture. Sources dans
  `.cloneme/ressources.json`.
- La police **Poppins** est sous SIL Open Font License 1.1 et embarquée via
  `@fontsource/poppins`.
- Le logo toucan, les orbes du planning et le fond ornementé sont des dessins
  SVG originaux du clone.
