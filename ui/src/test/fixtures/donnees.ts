/**
 * FIXTURES DE TEST — NE JAMAIS IMPORTER DEPUIS LE CODE DE PRODUCTION.
 *
 * Ces données reprennent le jeu de démonstration du prototype eLarium
 * (capture Dribbble + contenus inventés) uniquement pour faire tourner les
 * tests de parcours de l'ancienne interface. Elles sont isolées sous
 * `src/test/fixtures/` et ne sont pas incluses dans le bundle de production.
 *
 * Le nouveau produit ne doit contenir aucun de ces contenus : les programmes
 * et ressources pédagogiques seront importés depuis des sources vérifiées.
 */

import type {
  Conversation,
  Eleve,
  Evaluation,
  Evenement,
  Groupe,
  Materiau,
  Rappel,
  Reglages,
} from '../../lib/types'

const avatar = (n: number) => `/ressources/avatars/avatar-${String(n).padStart(2, '0')}.jpg`

/** Relevé sur la capture : le prof et les cinq groupes visibles. */
export const PROFIL_FIXTURE = {
  prenom: 'Elena',
  nom: 'Marsh',
  role: 'Senior teacher · Marketing',
  email: 'elena.marsh@elarium.app',
  avatar: avatar(10),
}

export const GROUPES_FIXTURE: Groupe[] = [
  {
    id: 'g-42b',
    code: '42 B',
    cours: 'Marketing Basic',
    date: '19 June, 2020',
    heure: '11:00 am',
    avatars: [avatar(1), avatar(2), avatar(3)],
    effectif: 10,
    prochaineSeance: 12,
    progression: 68,
    salle: 'Studio 2',
  },
  {
    id: 'g-23',
    code: '23',
    cours: 'Practice guide',
    date: '19 June, 2020',
    heure: '11:00 am',
    avatars: [avatar(4), avatar(5), avatar(6)],
    effectif: 10,
    prochaineSeance: 5,
    progression: 42,
    salle: 'Studio 1',
  },
  {
    id: 'g-56a',
    code: '56 A',
    cours: 'Methods and tips',
    date: '19 June, 2020',
    heure: '11:00 am',
    avatars: [avatar(2), avatar(7), avatar(8)],
    effectif: 10,
    prochaineSeance: 17,
    progression: 81,
    salle: 'Atelier',
  },
  {
    id: 'g-301',
    code: '301',
    cours: 'Marketing Basic',
    date: '19 June, 2020',
    heure: '11:00 am',
    avatars: [avatar(3), avatar(5), avatar(9)],
    effectif: 10,
    prochaineSeance: 3,
    progression: 24,
    salle: 'Studio 2',
  },
  {
    id: 'g-402',
    code: '402',
    cours: 'JTB method',
    date: '19 June, 2020',
    heure: '11:00 am',
    avatars: [avatar(1), avatar(4), avatar(6)],
    effectif: 10,
    prochaineSeance: 1,
    progression: 12,
    salle: 'Amphi B',
  },
]

export const ELEVES_FIXTURE: Eleve[] = [
  { id: 'e-01', prenom: 'Maya', nom: 'Chen', email: 'maya.chen@elarium.app', groupeId: 'g-42b', avatar: avatar(1), assiduite: 96, derniereActivite: 'Today, 9:12 am', statut: 'actif' },
  { id: 'e-02', prenom: 'Lucas', nom: 'Martin', email: 'lucas.martin@elarium.app', groupeId: 'g-42b', avatar: avatar(2), assiduite: 88, derniereActivite: 'Today, 8:40 am', statut: 'actif' },
  { id: 'e-03', prenom: 'Aisha', nom: 'Bello', email: 'aisha.bello@elarium.app', groupeId: 'g-42b', avatar: avatar(3), assiduite: 74, derniereActivite: 'Yesterday', statut: 'en-retard' },
  { id: 'e-04', prenom: 'Noah', nom: 'Williams', email: 'noah.williams@elarium.app', groupeId: 'g-23', avatar: avatar(4), assiduite: 92, derniereActivite: 'Today, 10:05 am', statut: 'actif' },
  { id: 'e-05', prenom: 'Sofia', nom: 'Rossi', email: 'sofia.rossi@elarium.app', groupeId: 'g-23', avatar: avatar(5), assiduite: 81, derniereActivite: '2 days ago', statut: 'absent' },
  { id: 'e-06', prenom: 'Yuki', nom: 'Tanaka', email: 'yuki.tanaka@elarium.app', groupeId: 'g-56a', avatar: avatar(6), assiduite: 98, derniereActivite: 'Today, 7:55 am', statut: 'actif' },
  { id: 'e-07', prenom: 'Daniel', nom: 'Okafor', email: 'daniel.okafor@elarium.app', groupeId: 'g-56a', avatar: avatar(7), assiduite: 85, derniereActivite: 'Today, 9:31 am', statut: 'actif' },
  { id: 'e-08', prenom: 'Emma', nom: 'Laurent', email: 'emma.laurent@elarium.app', groupeId: 'g-301', avatar: avatar(8), assiduite: 70, derniereActivite: '3 days ago', statut: 'en-retard' },
  { id: 'e-09', prenom: 'Gabriel', nom: 'Silva', email: 'gabriel.silva@elarium.app', groupeId: 'g-402', avatar: avatar(9), assiduite: 91, derniereActivite: 'Today, 11:20 am', statut: 'actif' },
]

export const JOURS_SEMAINE = [
  { jour: 16, label: 'mon' },
  { jour: 17, label: 'tue' },
  { jour: 18, label: 'wed' },
  { jour: 19, label: 'thur' },
  { jour: 20, label: 'fri' },
] as const

/** Relevé sur la capture pour le 17 juin ; inventé pour les autres jours. */
export const EVENEMENTS_FIXTURE: Evenement[] = [
  { id: 'ev-01', jour: 17, groupeId: 'g-431', groupe: '431 group', seance: 1, heure: '9:00 am', orbe: 1, statut: 'a-venir' },
  { id: 'ev-02', jour: 17, groupeId: 'g-56a', groupe: '56A group', seance: 23, heure: '11:00 am', orbe: 2, statut: 'a-venir' },
  { id: 'ev-03', jour: 17, groupeId: 'g-23', groupe: '23 group', seance: 5, heure: '1:20 pm', orbe: 3, statut: 'a-venir' },
  { id: 'ev-04', jour: 17, groupeId: 'g-402', groupe: '402 group', seance: 12, heure: '4:00 pm', orbe: 4, statut: 'a-venir' },

  { id: 'ev-05', jour: 16, groupeId: 'g-42b', groupe: '42 B group', seance: 11, heure: '10:00 am', orbe: 5, statut: 'termine' },
  { id: 'ev-06', jour: 16, groupeId: 'g-301', groupe: '301 group', seance: 2, heure: '2:00 pm', orbe: 1, statut: 'termine' },
  { id: 'ev-07', jour: 18, groupeId: 'g-56a', groupe: '56A group', seance: 24, heure: '9:30 am', orbe: 2, statut: 'a-venir' },
  { id: 'ev-08', jour: 18, groupeId: 'g-402', groupe: '402 group', seance: 13, heure: '1:00 pm', orbe: 4, statut: 'a-venir' },
  { id: 'ev-09', jour: 19, groupeId: 'g-42b', groupe: '42 B group', seance: 12, heure: '11:00 am', orbe: 1, statut: 'a-venir' },
  { id: 'ev-10', jour: 19, groupeId: 'g-23', groupe: '23 group', seance: 6, heure: '3:00 pm', orbe: 3, statut: 'a-venir' },
  { id: 'ev-11', jour: 20, groupeId: 'g-301', groupe: '301 group', seance: 4, heure: '10:00 am', orbe: 5, statut: 'a-venir' },
  { id: 'ev-12', jour: 20, groupeId: 'g-431', groupe: '431 group', seance: 2, heure: '12:30 pm', orbe: 2, statut: 'a-venir' },
]

/** Relevé sur la capture : trois rappels, le premier prioritaire. */
export const RAPPELS_FIXTURE: Rappel[] = [
  { id: 'ra-01', jour: 16, jourLabel: 'mon', titre: 'Homework review', heure: '11:00 am', prioritaire: true, teinte: 'blanc', fait: false },
  { id: 'ra-02', jour: 17, jourLabel: 'tue', titre: 'Send lesson materials', heure: '4:00 pm', prioritaire: false, teinte: 'rose', fait: false },
  { id: 'ra-03', jour: 18, jourLabel: 'wed', titre: 'Send classes plan', heure: '10:00 am', prioritaire: false, teinte: 'peche', fait: false },
]

/** DEMO_INVENTE — les supports ne sont pas visibles sur la capture. */
export const MATERIAUX_FIXTURE: Materiau[] = [
  { id: 'ma-01', titre: 'Marketing foundations — deck 4', type: 'slides', groupeId: 'g-42b', date: '12 June, 2020', poids: '4.2 MB', description: 'Segmentation, positioning and the four Ps. 28 slides, updated after the last lecture.' },
  { id: 'ma-02', titre: 'Practice guide — worksheet', type: 'fiche', groupeId: 'g-23', date: '11 June, 2020', poids: '380 KB', description: 'Three exercises to run in pairs, with a short self-assessment grid.' },
  { id: 'ma-03', titre: 'Methods and tips — video recap', type: 'video', groupeId: 'g-56a', date: '10 June, 2020', poids: '128 MB', description: 'A twelve-minute recap of the JTB method, recorded for students who missed lecture 16.' },
  { id: 'ma-04', titre: 'Mid-term exam — version A', type: 'examen', groupeId: 'g-301', date: '08 June, 2020', poids: '240 KB', description: 'Closed-book exam, 90 minutes. Version A for the Monday cohort.' },
  { id: 'ma-05', titre: 'JTB method — case study', type: 'fiche', groupeId: 'g-402', date: '05 June, 2020', poids: '1.1 MB', description: 'A four-page case study on a local brand, with the teacher notes in the margin.' },
  { id: 'ma-06', titre: 'Segmentation — slide deck', type: 'slides', groupeId: 'g-42b', date: '03 June, 2020', poids: '3.8 MB', description: 'Workshop deck: from raw personas to three usable segments.' },
  { id: 'ma-07', titre: 'Brand voice — checklist', type: 'fiche', groupeId: 'g-23', date: '01 June, 2020', poids: '210 KB', description: 'A one-page checklist students can reuse for every written assignment.' },
  { id: 'ma-08', titre: 'Customer interviews — playlist', type: 'video', groupeId: 'g-56a', date: '28 May, 2020', poids: '96 MB', description: 'Six short interviews to analyse before the next practice guide.' },
  { id: 'ma-09', titre: 'Final project — brief', type: 'examen', groupeId: 'g-301', date: '25 May, 2020', poids: '180 KB', description: 'The brief, the evaluation grid and the submission checklist.' },
]

const copie = (sujet: string) =>
  `The first part of the audit focuses on ${sujet}. I compared the three competitors on price, tone and channel, then mapped each one against our positioning statement. The main gap I found is consistency: the same promise is told in three different voices. My recommendation is to keep the calm, editorial tone from the launch campaign and retire the promotional copy used in spring. I would also simplify the call to action to a single sentence. In the appendix I included the screenshots used for the comparison, plus a short table of the criteria.`

/** DEMO_INVENTE — copies à corriger. */
export const EVALUATIONS_FIXTURE: Evaluation[] = [
  { id: 'rv-01', eleveId: 'e-01', titre: 'Marketing audit', groupeId: 'g-42b', date: 'Submitted 16 June, 9:40 pm', extrait: 'The main gap I found is consistency: the same promise is told in three different voices…', copie: copie('the launch campaign and its two closest competitors'), statut: 'a-corriger' },
  { id: 'rv-02', eleveId: 'e-04', titre: 'Practice case #3', groupeId: 'g-23', date: 'Submitted 16 June, 6:12 pm', extrait: 'I would simplify the call to action to a single sentence, because…', copie: copie('a small retail brand entering a crowded market'), statut: 'a-corriger' },
  { id: 'rv-03', eleveId: 'e-06', titre: 'Positioning memo', groupeId: 'g-56a', date: 'Submitted 15 June, 11:03 am', extrait: 'The same promise is told in three different voices…', copie: copie('a B2B service that is trying to sound warmer'), statut: 'a-corriger' },
  { id: 'rv-04', eleveId: 'e-08', titre: 'JTB reflection', groupeId: 'g-301', date: 'Submitted 14 June, 4:27 pm', extrait: 'Mapping each competitor against our positioning statement changed the brief…', copie: copie('the JTB workshop and the way it reframed our brief'), statut: 'corrigee', note: 16, commentaire: 'Clear structure. Tighten the appendix and cite the interviews.' },
  { id: 'rv-05', eleveId: 'e-09', titre: 'Campaign critique', groupeId: 'g-402', date: 'Submitted 12 June, 8:55 am', extrait: 'The promotional copy used in spring weakens the editorial tone…', copie: copie('the spring campaign and its paid social variants'), statut: 'corrigee', note: 14, commentaire: 'Good observations, but the recommendation needs a budget line.' },
]

/** DEMO_INVENTE — messagerie. */
export const CONVERSATIONS_FIXTURE: Conversation[] = [
  {
    id: 'cv-01', eleveId: 'e-01', sujet: 'Question about the audit', nonLus: 2,
    messages: [
      { id: 'ms-01', auteur: 'eleve', texte: 'Hi Elena! Should the audit include the competitor table, or keep it in the appendix?', heure: '9:12 am' },
      { id: 'ms-02', auteur: 'moi', texte: 'Yes — add it as an appendix, and mention the three criteria you used in the intro.', heure: '9:25 am' },
      { id: 'ms-03', auteur: 'eleve', texte: 'Perfect, thank you! I will send the revised version before Friday.', heure: '9:31 am' },
    ],
  },
  {
    id: 'cv-02', eleveId: 'e-04', sujet: 'Lecture 5 recording', nonLus: 1,
    messages: [
      { id: 'ms-04', auteur: 'eleve', texte: 'I missed the beginning of lecture 5. Is the recording on Materials?', heure: 'Yesterday' },
      { id: 'ms-05', auteur: 'moi', texte: 'It is — look for “Methods and tips — video recap”. The first ten minutes cover the framework.', heure: 'Yesterday' },
    ],
  },
  {
    id: 'cv-03', eleveId: 'e-05', sujet: 'Group project', nonLus: 0,
    messages: [
      { id: 'ms-06', auteur: 'eleve', texte: 'Our group would like to switch to the retail case. Is that still possible?', heure: 'Monday' },
      { id: 'ms-07', auteur: 'moi', texte: 'Yes, as long as you keep the same evaluation grid. Send me the new brief outline.', heure: 'Monday' },
    ],
  },
  {
    id: 'cv-04', eleveId: 'e-08', sujet: 'Office hours', nonLus: 0,
    messages: [
      { id: 'ms-08', auteur: 'eleve', texte: 'Are office hours still on Thursday at 4 pm?', heure: 'Monday' },
      { id: 'ms-09', auteur: 'moi', texte: 'They are. Bring the draft you mentioned in class and we will go through it together.', heure: 'Monday' },
    ],
  },
]

export const REGLAGES_FIXTURE: Reglages = {
  nom: 'Elena Marsh',
  email: 'elena.marsh@elarium.app',
  role: 'Senior teacher · Marketing',
  langue: 'English (UK)',
  fuseau: 'Europe/Paris (GMT+2)',
  notifications: { rappels: true, copies: true, messages: true },
  animationsReduites: false,
}


/** Jeu complet injecté dans `<App donneesInitiales={...} />` par les tests. */
export const JEU_DE_TEST = {
  profil: PROFIL_FIXTURE,
  groupes: GROUPES_FIXTURE,
  eleves: ELEVES_FIXTURE,
  evenements: EVENEMENTS_FIXTURE,
  rappels: RAPPELS_FIXTURE,
  materiaux: MATERIAUX_FIXTURE,
  evaluations: EVALUATIONS_FIXTURE,
  conversations: CONVERSATIONS_FIXTURE,
  reglages: REGLAGES_FIXTURE,
}
