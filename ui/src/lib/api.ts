/**
 * cloneme: points d'intégration backend.
 *
 * Tant que MODE_DEMO vaut true, aucune requête ne part vers un serveur : chaque
 * fonction attend un court délai puis rend une réponse de démonstration
 * explicitement marquée `demo: true`. Le chemin `/api/...` indiqué en
 * commentaire est un exemple à définir au moment du branchement.
 *
 * `?demo-erreur=1` dans l'URL fait échouer les fonctions : c'est le moyen de
 * vérifier les états d'erreur sans backend.
 */

import { DEMO } from './animations'
import type { Reglages } from './types'

export const MODE_DEMO = true

export type ReponseDemo = { ok: true; demo: true }

const attendre = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

function doitEchouer(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('demo-erreur') === '1'
}

async function repondre<T extends Record<string, unknown>>(valeur?: T): Promise<ReponseDemo & T> {
  await attendre(DEMO.latence)
  if (doitEchouer()) throw new Error('The demo endpoint is set to fail (?demo-erreur=1).')
  return { ok: true, demo: true, ...(valeur ?? ({} as T)) }
}

export type NouveauGroupe = {
  code: string
  cours: string
  date: string
  heure: string
}

/** POST /api/groups — à définir. */
export async function creerGroupe(_donnees: NouveauGroupe): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(_donnees),
  })
  if (!r.ok) throw new Error(`Creating the group failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

/** POST /api/messages — à définir. */
export async function envoyerMessage(_filId: string, _texte: string): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filId: _filId, texte: _texte }),
  })
  if (!r.ok) throw new Error(`Sending the message failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

/** PUT /api/settings — à définir. */
export async function enregistrerReglages(_reglages: Reglages): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(_reglages),
  })
  if (!r.ok) throw new Error(`Saving the settings failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

export type NouveauMateriau = {
  titre: string
  type: string
  groupeId: string
}

/** POST /api/materials — à définir. */
export async function deposerMateriau(_donnees: NouveauMateriau): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch('/api/materials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(_donnees),
  })
  if (!r.ok) throw new Error(`Uploading the material failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

export type EvaluationEnregistree = {
  id: string
  note: number
  commentaire: string
  publier: boolean
}

/** POST /api/reviews — à définir. */
export async function enregistrerEvaluation(_donnees: EvaluationEnregistree): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(_donnees),
  })
  if (!r.ok) throw new Error(`Saving the review failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

/** POST /api/groups/:id/lectures — à définir. */
export async function planifierSeance(_donnees: {
  groupeId: string
  date: string
  heure: string
}): Promise<ReponseDemo> {
  if (MODE_DEMO) return repondre()
  const r = await fetch(`/api/groups/${_donnees.groupeId}/lectures`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: _donnees.date, heure: _donnees.heure }),
  })
  if (!r.ok) throw new Error(`Scheduling the lecture failed (${r.status}).`)
  return (await r.json()) as ReponseDemo
}

export type SeanceVisio = ReponseDemo & { lien: string }

/** POST /api/live — à définir. */
export async function creerSeanceVisio(groupeId: string): Promise<SeanceVisio> {
  if (MODE_DEMO) {
    return repondre({ lien: `demo://elarium/live/${groupeId}` })
  }
  const r = await fetch('/api/live', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupeId }),
  })
  if (!r.ok) throw new Error(`Creating the live room failed (${r.status}).`)
  return (await r.json()) as SeanceVisio
}
