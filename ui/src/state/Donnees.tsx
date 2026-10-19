/**
 * État applicatif du prototype. Aucune donnée pédagogique n'est fournie par
 * défaut : les tests injectent leurs fixtures via `donneesInitiales`, et le
 * futur backend remplira ce fournisseur (Lot 3).
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { NouveauGroupe, NouveauMateriau } from '../lib/api'
import { PROFIL_INITIAL, REGLAGES_INITIAUX } from '../lib/etatInitial'
import type {
  Conversation,
  Eleve,
  Evaluation,
  Evenement,
  Groupe,
  Materiau,
  Profil,
  Rappel,
  Reglages,
} from '../lib/types'

const AVATARS_GROUPE: string[] = []
const AUCUN_ELEVE: Eleve[] = []
const AUCUN_EVENEMENT: Evenement[] = []

export type DonneesInitiales = {
  profil?: Profil
  groupes?: Groupe[]
  eleves?: Eleve[]
  evenements?: Evenement[]
  rappels?: Rappel[]
  materiaux?: Materiau[]
  evaluations?: Evaluation[]
  conversations?: Conversation[]
  reglages?: Reglages
}

type ContexteDonnees = {
  groupes: Groupe[]
  eleves: Eleve[]
  evenements: Evenement[]
  rappels: Rappel[]
  materiaux: Materiau[]
  evaluations: Evaluation[]
  conversations: Conversation[]
  profil: Profil
  reglages: Reglages
  nonLus: number
  ajouterGroupe: (donnees: NouveauGroupe) => Groupe
  retirerRappel: (id: string) => { rappel: Rappel; index: number } | null
  restaurerRappel: (rappel: Rappel, index: number) => void
  ajouterMessage: (filId: string, texte: string) => void
  creerConversation: (eleveId: string, premierMessage: string) => Conversation
  marquerConversationLue: (filId: string) => void
  ajouterMateriau: (donnees: NouveauMateriau) => Materiau
  enregistrerEvaluation: (id: string, note: number, commentaire: string, publier: boolean) => void
  appliquerReglages: (reglages: Reglages) => void
  eleveParId: (id: string) => Eleve | undefined
  groupeParId: (id: string) => Groupe | undefined
}

const Contexte = createContext<ContexteDonnees | null>(null)

let compteur = 0
const nouvelId = (prefixe: string) => `${prefixe}-${Date.now()}-${++compteur}`

function heureActuelle(): string {
  return new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
    .format(new Date())
    .toLowerCase()
    .replace(' ', ' ')
}

function dateDuJour(): string {
  const parties = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .formatToParts(new Date())
  const valeur = (type: string) => parties.find(partie => partie.type === type)?.value ?? ''
  return `${valeur('day')} ${valeur('month')}, ${valeur('year')}`
}

export function FournisseurDonnees({
  children,
  donneesInitiales,
}: {
  children: ReactNode
  donneesInitiales?: DonneesInitiales
}) {
  const [groupes, setGroupes] = useState<Groupe[]>(() => donneesInitiales?.groupes ?? [])
  const [rappels, setRappels] = useState<Rappel[]>(() => donneesInitiales?.rappels ?? [])
  const [materiaux, setMateriaux] = useState<Materiau[]>(() => donneesInitiales?.materiaux ?? [])
  const [evaluations, setEvaluations] = useState<Evaluation[]>(
    () => donneesInitiales?.evaluations ?? [],
  )
  const [conversations, setConversations] = useState<Conversation[]>(
    () => donneesInitiales?.conversations ?? [],
  )
  const [reglages, setReglages] = useState<Reglages>(
    () => donneesInitiales?.reglages ?? REGLAGES_INITIAUX,
  )
  const profil = donneesInitiales?.profil ?? PROFIL_INITIAL

  const eleves = donneesInitiales?.eleves ?? AUCUN_ELEVE
  const evenements = donneesInitiales?.evenements ?? AUCUN_EVENEMENT

  const ajouterGroupe = useCallback((donnees: NouveauGroupe): Groupe => {
    const groupe: Groupe = {
      id: nouvelId('g'),
      code: donnees.code.trim(),
      cours: donnees.cours.trim(),
      date: donnees.date,
      heure: donnees.heure,
      avatars: AVATARS_GROUPE,
      effectif: 0,
      prochaineSeance: 1,
      progression: 0,
      salle: '',
    }
    setGroupes(actuels => [groupe, ...actuels])
    return groupe
  }, [])

  const retirerRappel = useCallback(
    (id: string) => {
      const index = rappels.findIndex(rappel => rappel.id === id)
      if (index < 0) return null
      const rappel = rappels[index]
      setRappels(actuels => actuels.filter(item => item.id !== id))
      return { rappel, index }
    },
    [rappels],
  )

  const restaurerRappel = useCallback((rappel: Rappel, index: number) => {
    setRappels(actuels => {
      if (actuels.some(item => item.id === rappel.id)) return actuels
      const copie = [...actuels]
      copie.splice(Math.max(0, Math.min(index, copie.length)), 0, rappel)
      return copie
    })
  }, [])

  const ajouterMessage = useCallback((filId: string, texte: string) => {
    const propre = texte.trim()
    if (!propre) return
    setConversations(actuelles =>
      actuelles.map(fil =>
        fil.id === filId
          ? {
              ...fil,
              nonLus: 0,
              messages: [
                ...fil.messages,
                { id: nouvelId('ms'), auteur: 'moi', texte: propre, heure: heureActuelle() },
              ],
            }
          : fil,
      ),
    )
  }, [])

  const creerConversation = useCallback((eleveId: string, premierMessage: string): Conversation => {
    const fil: Conversation = {
      id: nouvelId('cv'),
      eleveId,
      sujet: 'New conversation',
      nonLus: 0,
      messages: [
        { id: nouvelId('ms'), auteur: 'moi', texte: premierMessage.trim(), heure: heureActuelle() },
      ],
    }
    setConversations(actuelles => [fil, ...actuelles])
    return fil
  }, [])

  const marquerConversationLue = useCallback((filId: string) => {
    setConversations(actuelles =>
      actuelles.map(fil => (fil.id === filId ? { ...fil, nonLus: 0 } : fil)),
    )
  }, [])

  const ajouterMateriau = useCallback((donnees: NouveauMateriau): Materiau => {
    const materiau: Materiau = {
      id: nouvelId('ma'),
      titre: donnees.titre.trim(),
      type: donnees.type as Materiau['type'],
      groupeId: donnees.groupeId,
      date: dateDuJour(),
      poids: '—',
      description: 'Added locally in demo mode. The file itself is not uploaded.',
    }
    setMateriaux(actuels => [materiau, ...actuels])
    return materiau
  }, [])

  const enregistrerEvaluation = useCallback(
    (id: string, note: number, commentaire: string, publier: boolean) => {
      setEvaluations(actuelles =>
        actuelles.map(copie =>
          copie.id === id
            ? {
                ...copie,
                note,
                commentaire,
                statut: publier ? 'corrigee' : copie.statut,
              }
            : copie,
        ),
      )
    },
    [],
  )

  const appliquerReglages = useCallback((nouveaux: Reglages) => {
    setReglages(nouveaux)
  }, [])

  const eleveParId = useCallback((id: string) => eleves.find(eleve => eleve.id === id), [eleves])
  const groupeParId = useCallback(
    (id: string) => groupes.find(groupe => groupe.id === id),
    [groupes],
  )

  const nonLus = conversations.reduce((total, fil) => total + fil.nonLus, 0)

  const valeur = useMemo<ContexteDonnees>(
    () => ({
      groupes,
      eleves,
      evenements,
      rappels,
      materiaux,
      evaluations,
      conversations,
      profil,
      reglages,
      nonLus,
      ajouterGroupe,
      retirerRappel,
      restaurerRappel,
      ajouterMessage,
      creerConversation,
      marquerConversationLue,
      ajouterMateriau,
      enregistrerEvaluation,
      appliquerReglages,
      eleveParId,
      groupeParId,
    }),
    [
      groupes,
      eleves,
      evenements,
      rappels,
      materiaux,
      evaluations,
      conversations,
      profil,
      reglages,
      nonLus,
      ajouterGroupe,
      retirerRappel,
      restaurerRappel,
      ajouterMessage,
      creerConversation,
      marquerConversationLue,
      ajouterMateriau,
      enregistrerEvaluation,
      appliquerReglages,
      eleveParId,
      groupeParId,
    ],
  )

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>
}

export function useDonnees(): ContexteDonnees {
  const contexte = useContext(Contexte)
  if (!contexte) throw new Error('useDonnees doit être utilisé dans FournisseurDonnees')
  return contexte
}
