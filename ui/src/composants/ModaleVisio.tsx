/** cloneme: C-14 — modale de classe en direct (démo, aucune caméra). */

import { useEffect, useState } from 'react'
import { creerSeanceVisio } from '../lib/api'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Bouton } from './Bouton'
import { Icone } from './Icones'
import { Modale } from './Modale'
import { Selection } from './Champ'
import './ModaleVisio.css'

type Props = {
  ouverte: boolean
  onFermer: () => void
  groupeIdInitial?: string
  groupeLabel?: string
  seance?: string
}

export function ModaleVisio({ ouverte, onFermer, groupeIdInitial, groupeLabel, seance }: Props) {
  const { groupes } = useDonnees()
  const { notifier } = useNotifications()
  const [groupeId, setGroupeId] = useState(groupeIdInitial ?? groupes[0]?.id ?? '')
  const [statut, setStatut] = useState<'formulaire' | 'chargement' | 'pret'>('formulaire')
  const [lien, setLien] = useState('')
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    if (!ouverte) return
    setGroupeId(groupeIdInitial ?? groupes[0]?.id ?? '')
    setStatut('formulaire')
    setLien('')
    setErreur('')
  }, [ouverte, groupeIdInitial, groupes])

  const groupe = groupes.find(item => item.id === groupeId)
  const libelleGroupe = groupeLabel ?? (groupe ? `${groupe.code} · ${groupe.cours}` : '')

  async function creer() {
    setStatut('chargement')
    setErreur('')
    try {
      const reponse = await creerSeanceVisio(groupeIdInitial ?? groupeId)
      setLien(reponse.lien)
      setStatut('pret')
    } catch (cause) {
      setErreur(cause instanceof Error ? cause.message : 'The room could not be created.')
      setStatut('formulaire')
    }
  }

  function copier() {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(lien).catch(() => undefined)
    }
    notifier({ titre: 'Link copied (demo)', description: 'A real room link would open a video call.' })
  }

  return (
    <Modale
      ouverte={ouverte}
      onFermer={onFermer}
      titre={statut === 'pret' ? 'Your room is ready (demo)' : 'Start a live class'}
      sousTitre={
        statut === 'pret'
          ? 'Nothing is streamed: this clone only shows the room handshake.'
          : 'The demo endpoint returns a link instead of opening a camera.'
      }
      icone={<Icone nom="video" taille={20} />}
      pied={
        statut === 'pret' ? (
          <>
            <Bouton variante="fantome" onClick={onFermer}>
              Done
            </Bouton>
            <Bouton onClick={copier} iconeGauche={<Icone nom="file" taille={16} />}>
              Copy link
            </Bouton>
          </>
        ) : (
          <>
            <Bouton variante="fantome" onClick={onFermer}>
              Cancel
            </Bouton>
            <Bouton
              onClick={creer}
              chargement={statut === 'chargement'}
              iconeGauche={statut === 'chargement' ? undefined : <Icone nom="video" taille={16} />}
            >
              {statut === 'chargement' ? 'Creating…' : 'Create room'}
            </Bouton>
          </>
        )
      }
    >
      {statut !== 'pret' ? (
        <div className="visio__formulaire">
          {!groupeLabel && (
            <Selection
              label="Group"
              value={groupeId}
              onChange={evenement => setGroupeId(evenement.target.value)}
              options={groupes.map(item => ({
                valeur: item.id,
                libelle: `${item.code} · ${item.cours}`,
              }))}
              aide={seance ? `${seance} will be attached to this room.` : undefined}
            />
          )}
          <div className="visio__apercu" aria-hidden="true">
            <span className="visio__apercu-rond">
              <Icone nom="video" taille={26} />
            </span>
            <span>
              <strong>{libelleGroupe || 'Choose a group'}</strong>
              <small>{seance ?? `Lecture ${groupe?.prochaineSeance ?? '—'}`}</small>
            </span>
          </div>
          {erreur && (
            <p className="visio__erreur" role="alert">
              <Icone nom="alert" taille={15} /> {erreur}
            </p>
          )}
          <p className="visio__note">
            Demo mode: no camera, microphone or third-party call service is contacted.
          </p>
        </div>
      ) : (
        <div className="visio__pret">
          <div className="visio__salle">
            <span className="visio__salle-icone">
              <Icone nom="video" taille={30} />
            </span>
            <div>
              <p className="visio__salle-titre">{libelleGroupe}</p>
              <p className="visio__salle-seance">{seance ?? `Lecture ${groupe?.prochaineSeance ?? '—'}`}</p>
            </div>
            <span className="visio__badge">DEMO</span>
          </div>
          <code className="visio__lien">{lien}</code>
          <p className="visio__note">
            This is a fake link created locally. Connecting a real provider is the next step.
          </p>
        </div>
      )}
    </Modale>
  )
}
