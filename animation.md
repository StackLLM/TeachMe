# Animations — eLarium

La source est une **image fixe** (shot Dribbble de 3200 × 2400 px) : aucune
animation, aucun `@keyframes`, aucune durée n'est lisible. Toutes les fiches
ci-dessous sont donc **Déduites** de la mise en page et du ton du shot, ou
**Approximées** quand l'état n'est pas visible. Le code suit ces fiches ; les
valeurs partagées vivent dans `ui/src/styles/tokens.css` et
`ui/src/lib/animations.ts`.

## Réglages globaux

| Variable | Valeur | Origine | Usage |
|---|---|---|---|
| `--duree-rapide` | `160ms` | Déduit | survols, appuis, fonds de sélection |
| `--duree-moyenne` | `260ms` | Déduit | modales, tiroirs, remplacements de liste |
| `--duree-lente` | `420ms` | Déduit | entrée de page, apparition en cascade |
| `--courbe-standard` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Déduit (sortie douce) | la plupart des transitions |
| `--courbe-sortie` | `cubic-bezier(0.4, 0, 1, 1)` | Déduit | fermeture des modales et toasts |
| `--courbe-ressort` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Déduit (léger dépassement) | panneaux, pastilles, toasts |

Constantes JS équivalentes dans `ui/src/lib/animations.ts` : elles sont la copie
exacte des variables ci-dessus.

| Constante | Valeur | Origine | Usage |
|---|---|---|---|
| `DUREES.rapide` | 160 ms | Déduit = `--duree-rapide` | survols |
| `DUREES.moyenne` | 260 ms | Déduit = `--duree-moyenne` | modales |
| `DUREES.lente` | 420 ms | Déduit = `--duree-lente` | entrées de page |
| `COURBES.standard` | `[0.22, 0.61, 0.36, 1]` | Déduit = `--courbe-standard` | transitions |
| `COURBES.sortie` | `[0.4, 0, 1, 1]` | Déduit = `--courbe-sortie` | fermetures |
| `COURBES.ressort` | `[0.34, 1.56, 0.64, 1]` | Déduit = `--courbe-ressort` | panneaux |
| `SEUILS.mobile` | 600 px | Miroir du `@media` mobile | bascule mobile |
| `SEUILS.tablette` | 980 px | Miroir du `@media` tablette | tiroir de navigation |
| `SEUILS.compact` | 1180 px | Miroir du `@media` compact | colonnes resserrées |

- Défilement lissé : non. Aucun défilement animé n'est visible sur le shot ;
  les changements de route reviennent en haut instantanément.
- Bibliothèque source : aucune (image). Le clone n'utilise ni GSAP ni
  framer-motion : transitions CSS et `@keyframes` suffisent.

## Inventaire

| ID | Élément | Pages | Déclencheur | Nature | Origine |
|---|---|---|---|---|---|
| A-01 | navigation, cartes, boutons | toutes | survol, focus, appui | transitions CSS nommées | Déduit |
| A-02 | conteneur de page | toutes | changement de route | fondu + translation de 8 px | Déduit |
| A-03 | modales (groupe, visio, offre, matériau, évaluation) | toutes | ouverture / fermeture | fondu du voile, ressort du panneau | Déduit |
| A-04 | barre latérale mobile | toutes ≤ 980 px | clic sur le bouton menu | glissement depuis la gauche | Déduit |
| A-05 | sélecteur de jour et événements | P-01 | clic sur un jour | fond qui glisse, liste en fondu | Déduit |
| A-06 | rappels + notification | P-01 | clic sur la croix | repli, puis toast avec « Undo » | Approximé |
| A-07 | ajout d'un groupe | P-01 | soumission du formulaire | entrée de carte + toast | Déduit |
| A-08 | palette de recherche | toutes | clic sur Search, Ctrl/⌘ + K | voile, panneau, résultats en cascade | Déduit |
| A-09 | cascade d'entrée des listes | P-01, P-02, P-03, P-04 | chargement de la page | apparition décalée de 40 ms | Déduit |
| A-10 | mode animations réduites | toutes | préférence système ou réglage | neutralisation globale | Déduit |

## Fiches

### A-01 — Survols, focus et appuis
- Déclencheur : `:hover`, `:focus-visible`, `:active` sur les liens, boutons,
  cartes et lignes.
- Propriétés : `background-color`, `color`, `box-shadow`, `transform`.
  Les cartes montent de 3 px ; les boutons s'enfoncent à `scale(0.97)`.
- Durée / retard / courbe : `--duree-rapide` (cartes : `--duree-moyenne`),
  0, `--courbe-standard`.
- Réversible : oui, au retrait du pointeur.
- Mode réduit : couleurs conservées, transformations supprimées.
- Implémentation : `ui/src/styles/animations.css` (règles partagées),
  `ui/src/composants/Bouton.css`, `CarteGroupe.css`, `BarreLaterale.css`.

### A-02 — Entrée de page
- Déclencheur : changement de route (montage du conteneur de page).
- Propriétés : `opacity` 0 → 1, `transform: translateY(8px)` → `none`.
- Durée / retard / courbe : `--duree-lente`, 0, `--courbe-standard`.
- Réversible : non (animation d'entrée).
- Mode réduit : opacité immédiate, aucune translation.
- Implémentation : `ui/src/gabarits/GabaritPrincipal.tsx`, clé de route sur le
  conteneur ; `ui/src/styles/animations.css` (`.page-entree`).

### A-03 — Modales
- Déclencheur : ouverture par bouton, fermeture par Échap, clic sur le voile ou
  bouton de fermeture.
- Propriétés : voile `opacity` 0 → 1 ; panneau `opacity` 0 → 1 et
  `scale(0.96)` → `1`, `translateY(12px)` → `0`.
- Durée / retard / courbe : ouverture `--duree-moyenne`, `--courbe-ressort` ;
  fermeture `--duree-rapide`, `--courbe-sortie`.
- Réversible : oui.
- Mode réduit : apparition immédiate, pas d'échelle.
- Implémentation : `ui/src/composants/Modale.tsx` + `Modale.css`.

### A-04 — Barre latérale mobile
- Déclencheur : clic sur le bouton menu (≤ 980 px), clic sur le voile, Échap.
- Propriétés : `transform: translateX(-100%)` → `translateX(0)` ; voile en
  fondu.
- Durée / retard / courbe : `--duree-moyenne`, 0, `--courbe-standard`.
- Réversible : oui.
- Mode réduit : ouverture sans glissement.
- Implémentation : `ui/src/composants/BarreLaterale.tsx` + `BarreLaterale.css`.

### A-05 — Sélection d'un jour
- Déclencheur : clic sur un jour du sélecteur ; le jour sélectionné reçoit un
  fond pêche et la liste des événements se remplace.
- Propriétés : fond et ombre de la pastille ; opacité de la liste
  (`opacity` 0 → 1, `translateY(6px)` → 0). Les deux points du jour
  sélectionné apparaissent avec un léger ressort.
- Durée / retard / courbe : `--duree-rapide` pour la pastille,
  `--duree-moyenne` pour la liste, `--courbe-ressort` pour les points.
- Réversible : oui, en choisissant un autre jour.
- Mode réduit : changement immédiat.
- Implémentation : `ui/src/composants/SelecteurJour.tsx`,
  `PanneauPlanning.tsx`.

### A-06 — Retrait d'un rappel
- Déclencheur : clic sur la croix d'un rappel.
- Propriétés : `opacity` 1 → 0, `transform: translateX(14px)`, puis
  `max-height` vers 0 ; la liste se referme. Un toast apparaît avec « Undo ».
- Durée / retard / courbe : `--duree-moyenne`, `--courbe-sortie` ; toast
  `--duree-moyenne`, `--courbe-ressort`.
- Réversible : oui, par « Undo » tant que le toast est visible (4,2 s) ou
  depuis l'état « tout est fait ».
- Mode réduit : retrait immédiat, toast sans translation.
- Implémentation : `ui/src/composants/ListeRappels.tsx`,
  `ui/src/composants/Toast.tsx`.

### A-07 — Ajout d'un groupe
- Déclencheur : soumission valide du formulaire « New group ».
- Propriétés : nouvelle carte `opacity` 0 → 1, `translateY(14px)` → 0,
  `scale(0.98)` → 1 ; léger ressort.
- Durée / retard / courbe : `--duree-lente`, `--courbe-ressort`.
- Réversible : non ; le groupe reste dans la liste locale de démonstration.
- Mode réduit : apparition immédiate.
- Implémentation : `ui/src/composants/PanneauGroupes.tsx`,
  `ui/src/composants/CarteGroupe.css` (`.carte-groupe--nouvelle`).

### A-08 — Palette de recherche
- Déclencheur : clic sur la barre de recherche, `Ctrl/⌘ + K`, `/` hors champ.
- Propriétés : voile en fondu ; panneau `opacity` 0 → 1, `scale(0.98)` → 1,
  `translateY(-8px)` → 0 ; résultats décalés de 30 ms chacun.
- Durée / retard / courbe : `--duree-rapide`, `--courbe-standard`.
- Réversible : oui, Échap ou clic sur le voile.
- Mode réduit : apparition immédiate, pas de cascade.
- Implémentation : `ui/src/composants/PaletteRecherche.tsx` + `.css`.

### A-09 — Cascade d'entrée des listes
- Déclencheur : montage de la page ou changement de filtre.
- Propriétés : `opacity` 0 → 1, `translateY(10px)` → 0, avec un retard
  `index × 40 ms` (plafonné à 6).
- Durée / retard / courbe : `--duree-lente`, 0, `--courbe-standard`.
- Réversible : non.
- Mode réduit : tout apparaît d'un coup.
- Implémentation : `ui/src/styles/animations.css` (`.cascade` et
  `--cascade-index`), `ui/src/lib/animations.ts` (`delaiCascade`).

### A-10 — Mode animations réduites
- Déclencheur : `prefers-reduced-motion: reduce`, ou bascule manuelle dans
  Réglages (`data-animations="reduites"` sur `<html>`).
- Propriétés : durées d'animation et de transition ramenées à 0,01 ms, pas de
  transformation, défilement instantané.
- Durée / retard / courbe : sans objet.
- Réversible : oui.
- Mode réduit : c'est le mode lui-même.
- Implémentation : `ui/src/styles/animations.css`,
  `ui/src/state/Animations.tsx`, bascule dans `PageReglages.tsx`.

## Ce qui n'a pas pu être lu

- Toutes les valeurs de durée, courbe et seuil : la source est une image fixe.
  Elles sont **Déduites**, jamais présentées comme relevées.
- Les états de survol et de focus ne sont pas visibles sur le shot : les choix
  suivent la palette (voiles, pêche, corail) et sont **Approximés**.
- Aucun carrousel, compteur ou animation au défilement : rien de tel dans la
  composition.
