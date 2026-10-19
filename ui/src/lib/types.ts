/** Modèles du prototype UI. Le modèle de production est défini dans Plan.md. */

export type Profil = {
  prenom: string
  nom: string
  email: string
  avatar?: string
}

export type Teinte = 'blanc' | 'rose' | 'peche' | 'sarcelle' | 'corail'

export type Groupe = {
  id: string
  code: string
  cours: string
  date: string
  heure: string
  avatars: string[]
  effectif: number
  prochaineSeance: number
  progression: number
  salle: string
}

export type Eleve = {
  id: string
  prenom: string
  nom: string
  email: string
  groupeId: string
  avatar: string
  assiduite: number
  derniereActivite: string
  statut: 'actif' | 'absent' | 'en-retard'
}

export type Evenement = {
  id: string
  jour: number
  groupeId: string
  groupe: string
  seance: number
  heure: string
  orbe: number
  statut: 'a-venir' | 'en-cours' | 'termine'
}

export type Rappel = {
  id: string
  jour: number
  jourLabel: string
  titre: string
  heure: string
  prioritaire: boolean
  teinte: Teinte
  fait: boolean
}

export type TypeMateriau = 'slides' | 'fiche' | 'video' | 'examen'

export type Materiau = {
  id: string
  titre: string
  type: TypeMateriau
  groupeId: string
  date: string
  poids: string
  description: string
}

export type Evaluation = {
  id: string
  eleveId: string
  titre: string
  groupeId: string
  date: string
  extrait: string
  copie: string
  statut: 'a-corriger' | 'corrigee'
  note?: number
  commentaire?: string
}

export type Message = {
  id: string
  auteur: 'moi' | 'eleve'
  texte: string
  heure: string
}

export type Conversation = {
  id: string
  eleveId: string
  sujet: string
  nonLus: number
  messages: Message[]
}

export type Reglages = {
  nom: string
  email: string
  role: string
  langue: string
  fuseau: string
  notifications: {
    rappels: boolean
    copies: boolean
    messages: boolean
  }
  animationsReduites: boolean
}

export type LectureGroupe = {
  id: string
  numero: number
  date: string
  heure: string
  statut: 'termine' | 'a-venir'
  presence: number
  effectif: number
}
