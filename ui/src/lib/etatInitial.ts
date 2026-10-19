import type { Profil, Reglages } from './types'

/** Réglages neutres tant qu'aucun compte n'est chargé depuis l'API. */
export const REGLAGES_INITIAUX: Reglages = {
  nom: '',
  email: '',
  role: '',
  langue: 'Français',
  fuseau: 'Africa/Casablanca (GMT+1)',
  notifications: { rappels: false, copies: false, messages: false },
  animationsReduites: false,
}

/** Profil neutre : rempli par l'API d'authentification (Lot 1). */
export const PROFIL_INITIAL: Profil = { prenom: '', nom: '', email: '' }
