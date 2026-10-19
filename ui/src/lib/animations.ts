/**
 * cloneme: A-01, A-02, A-03, A-05, A-06, A-08, A-10 — constantes d'animation.
 *
 * La capture Dribbble est une image fixe : aucune durée, courbe ni seuil n'a pu
 * être lu dans une source. Toutes les valeurs sont donc **déduites** de la
 * nature calme et aérée de l'interface, et calées sur les tokens de
 * `tokens.css` (palette.md / animation.md). Chaque constante dit de quelle
 * variable CSS elle est la copie.
 */

/** Copies exactes de `--duree-*` (tokens.css). */
export const DUREES = { rapide: 160, moyenne: 260, lente: 420 } as const

/** Copies exactes de `--courbe-*` (tokens.css). */
export const COURBES = {
  standard: [0.22, 0.61, 0.36, 1],
  sortie: [0.4, 0, 1, 1],
  ressort: [0.34, 1.56, 0.64, 1],
} as const

/** Points de rupture, miroir des `@media` de tokens.css et des gabarits. */
export const SEUILS = { mobile: 600, tablette: 980, compact: 1180 } as const

/** Délais de cascade : 40 ms par carte, plafonnés à 6 cartes (A-09). */
export const CASCADE = { pas: 40, maximum: 6 } as const

/** Durée d'affichage d'une notification, avant retrait automatique (A-06). */
export const TOAST = { duree: 4200 } as const

/** Délai de démonstration des points d'intégration (lib/api.ts). */
export const DEMO = { latence: 600 } as const

export function delaiCascade(index: number): string {
  const rang = Math.min(index, CASCADE.maximum)
  return `${rang * CASCADE.pas}ms`
}
