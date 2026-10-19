import type { Groupe, LectureGroupe } from './types'

/**
 * Séances connues d'un groupe : uniquement la prochaine, tirée du groupe
 * lui-même. Aucun historique n'est fabriqué ; il viendra de l'API (Lot 8).
 */
export function seancesDuGroupe(groupe: Groupe): LectureGroupe[] {
  return [
    {
      id: `${groupe.id}-le-${groupe.prochaineSeance}`,
      numero: groupe.prochaineSeance,
      date: groupe.date,
      heure: groupe.heure,
      statut: 'a-venir',
      presence: 0,
      effectif: groupe.effectif,
    },
  ]
}
