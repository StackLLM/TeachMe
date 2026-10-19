# Palette — eLarium

Source : capture Dribbble « eLearning Platform – Web App for Teachers » de
Marina Shestmintseva (Anoda), 3200 × 2400 px. Aucune feuille de style source
n'existe : les couleurs sont **mesurées au pixel** sur la capture, agrandie à
3200 px puis ramenée à une largeur de référence de 1512 px. Les valeurs propres
aux états invisibles dans la capture sont **déduites** ou **approximées**, et
signalées comme telles.

`ui/src/styles/tokens.css` est le miroir exact de ce fichier. Changer une
valeur ici, puis demander « applique palette.md » : le code suit.

## Couleurs — surfaces

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--couleur-fond-page` | `#deedf0` | Mesuré (pixel 80,100) | fond ornementé derrière l'interface |
| `--couleur-fond-page-creux` | `#c9e2e8` | Mesuré (pixel 90,750) | masses géographiques sombres du fond |
| `--couleur-fond-page-clair` | `#f3fafc` | Mesuré (pixel 250,150) | masses claires du fond |
| `--couleur-surface` | `#f4f9fb` | Mesuré (barre latérale, barre haute, colonne droite) | surfaces opaques (champs, bulles, tiroir mobile) |
| `--couleur-surface-voile` | `rgba(244, 249, 251, 0.72)` | Déduit (surface de la coque rendue translucide) | voile givré plein écran de la coque |
| `--couleur-surface-carte` | `#f8fcfe` | Mesuré (centre d'une carte de groupe) | cartes de groupe, cartes du planning, cartes de cours |
| `--couleur-surface-haute` | `#ffffff` | Déduit (cartes de rappel, carte d'offre) | surfaces surelevées, modales, menus |
| `--couleur-panneau` | `#e3f0f3` | Mesuré (panneau « Groups », pastille active) | panneau principal, navigation active |
| `--couleur-panneau-appui` | `#d7e9ed` | Déduit (survol) | survol des zones du panneau |

## Couleurs — texte

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--couleur-texte` | `#0f2d2c` | Mesuré (« Groups », « My course ») | titres, texte fort |
| `--couleur-texte-doux` | `#557f86` | Déduit (interpolation entre le titre et le méta) | texte secondaire, paragraphes |
| `--couleur-texte-meta` | `#5a93a9` | Mesuré (ligne « 19 June, 2020 ») | métadonnées, heures |
| `--couleur-texte-faible` | `#8fb4bf` | Mesuré (libellés de navigation inactifs) | navigation inactive, placeholders |
| `--couleur-blanc` | `#ffffff` | Déduit (`New group`) | texte sur accent |

## Couleurs — accents

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--couleur-accent` | `#e76f69` | Mesuré (bouton « New group », titres de groupe) | accent principal, actions |
| `--couleur-accent-fonce` | `#d75f59` | Déduit (survol du bouton) | survol et appui de l'accent |
| `--couleur-accent-voile` | `#fae2e1` | Mesuré (pastille « +7 ») | fonds d'accent très clairs |
| `--couleur-accent-pale` | `#f6c9c6` | Mesuré (pastille du 17) | pastilles de date |
| `--couleur-secondaire` | `#2f7d8c` | Mesuré (icônes du planning, « Lecture 12 ») | icônes, liens, focus |
| `--couleur-secondaire-fonce` | `#1f6170` | Déduit (survol des liens) | survol des liens et icônes |
| `--couleur-secondaire-voile` | `#e1eef1` | Déduit (fond d'icône) | fonds d'icônes, barres de progression |
| `--couleur-peche` | `#fae2c7` | Mesuré (jour sélectionné, rappel prioritaire) | sélection, mise en avant douce |
| `--couleur-peche-fonce` | `#f4d3ae` | Déduit (survol) | survol de la sélection |
| `--couleur-vert` | `#2f7d6c` | Déduit (état de succès) | confirmations, présence |
| `--couleur-erreur` | `#c9544e` | Déduit (état d'erreur) | erreurs de formulaire |

## Couleurs — voiles et lignes

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--couleur-voile-modale` | `rgba(15, 45, 44, 0.32)` | Déduit | voile derrière les modales et le tiroir |
| `--couleur-voile-clair` | `rgba(255, 255, 255, 0.72)` | Déduit | fond translucide de la barre haute collée |
| `--couleur-bordure` | `#e2edf0` | Déduit (séparateurs invisibles dans la capture) | séparateurs, contours de champs |
| `--couleur-bordure-forte` | `#cfe3e8` | Déduit (focus, survol) | contours au survol |

## Ombres

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--ombre-panneau` | `0 18px 44px rgba(47, 125, 140, 0.07)` | Déduit | panneau principal |
| `--ombre-carte` | `0 8px 22px rgba(47, 125, 140, 0.07)` | Déduit (ombre douce des cartes) | cartes au repos |
| `--ombre-carte-survol` | `0 16px 34px rgba(47, 125, 140, 0.14)` | Déduit (survol) | cartes survolées |
| `--ombre-bouton` | `0 12px 26px rgba(231, 111, 105, 0.32)` | Déduit (halo corail sous le bouton) | bouton principal |
| `--ombre-modale` | `0 32px 90px rgba(15, 45, 44, 0.28)` | Déduit | modales, tiroirs, palette |
| `--ombre-toast` | `0 18px 40px rgba(15, 45, 44, 0.18)` | Déduit | notifications éphémères |
| `--ombre-jour` | `0 10px 24px rgba(244, 211, 174, 0.55)` | Déduit (halo du jour sélectionné) | sélecteur de jour |
| `--anneau-focus` | `0 0 0 3px rgba(47, 125, 140, 0.28)` | Déduit | focus clavier de tous les éléments interactifs |

## Typographie

La police de la capture n'est pas identifiable avec certitude (aucun fichier
source). Les formes géométriques, le `a` double étage, le `y` à queue droite et
le `G` à barre désignent une famille du type Gilroy / Poppins. **Poppins**
(Google Fonts, OFL) est retenue comme substitut libre le plus proche : couleur et
graisses sont mesurées, la famille est déduite.

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--police-texte` | `"Poppins", "Avenir Next", "Segoe UI", sans-serif` | Déduit (substitut libre) | toute l'interface |
| `--police-mono` | `ui-monospace, "SF Mono", Menlo, monospace` | Déduit | liens techniques, raccourcis |
| `--taille-base` | `15px` | Mesuré (texte courant) | corps, navigation |
| `--taille-petit` | `12px` | Mesuré (libellés de jour) | micro-libellés |
| `--taille-meta` | `12.5px` | Mesuré (dates et heures) | métadonnées |
| `--taille-titre-section` | `28px` | Déduit (24 px sur la capture, mis à l'échelle) | titres de section (30 px au-delà de 1600) |
| `--taille-titre-page` | `32px` | Déduit (pages secondaires) | titre de page (36 px au-delà de 1600) |
| `--taille-titre-carte` | `18px` | Mesuré (« 42 B (Marketing Basic) ») | titre de carte |
| `--taille-nav` | `15px` | Mesuré (« Materials », « My course ») | navigation |
| `--taille-logo` | `22px` | Mesuré (« eLarium ») | logo |
| `--taille-bouton` | `15px` | Mesuré (« New group ») | boutons |
| `--interligne-serre` | `1.2` | Déduit | titres |
| `--interligne-normal` | `1.55` | Déduit | corps de texte |
| `--lettres-titre` | `-0.02em` | Déduit | titres |

## Rayons

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--rayon-panneau` | `34px` | Déduit (~30 px sur la capture, mis à l'échelle) | panneau principal |
| `--rayon-carte` | `18px` | Déduit (~16 px sur la capture, mis à l'échelle) | cartes, champs, boutons carrés |
| `--rayon-petit` | `12px` | Déduit (~10 px sur la capture, mis à l'échelle) | petits blocs |
| `--rayon-pilule` | `999px` | Mesuré (bouton, navigation active) | pilules |

## Dimensions

Mesures prises sur la capture ramenée à 1512 px. **Aucune largeur maximale et
aucun cadre** : la coque occupe 100 % de la fenêtre, sans retrait, rayon ni
ombre externes ; le fond ornementé transparaît sous un voile givré. Les valeurs
fluides et les paliers sont redéfinis dans `tokens.css` par `clamp()` et des
`@media` (les `@media` ne sont pas contrôlés par le script).

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--largeur-sidebar` | `clamp(252px, 17vw, 300px)` | Mesuré 238 px, rendu fluide | colonne de navigation |
| `--largeur-colonne` | `clamp(348px, 24vw, 440px)` | Mesuré 341 px, rendu fluide | colonne planning / rappels |
| `--hauteur-entete` | `94px` | Mesuré (barre haute) | barre haute |
| `--espace-panneau` | `36px` | Déduit (44 px au-delà de 1600) | padding intérieur des panneaux |
| `--espace-carte` | `22px` | Mesuré (26 px au-delà de 1600) | padding des cartes |
| `--gouttiere` | `26px` | Mesuré (30 px au-delà de 1600) | gouttières de grille |
| `--flou-voile` | `42px` | Déduit | flou du voile givré plein écran |

## Implémentation

- `ui/src/styles/tokens.css` déclare chaque variable ci-dessus dans `:root`.
- Les composants lisent `var(--…)` : aucune couleur, police, ombre ou durée en
  dur. `cloneme/scripts/verifier-synchro.mjs` le vérifie.
- Les polices sont fournies par `@fontsource/poppins`, donc disponibles hors
  ligne.
