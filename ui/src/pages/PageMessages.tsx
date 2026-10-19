/** cloneme: P-05 — messagerie : liste des fils, conversation et nouveau message. */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { envoyerMessage } from '../lib/api'
import { cx } from '../lib/classes'
import type { Conversation } from '../lib/types'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Avatar } from '../composants/Avatar'
import { Bouton } from '../composants/Bouton'
import { ZoneTexte, Selection } from '../composants/Champ'
import { EntetePage } from '../composants/EntetePage'
import { FilMessages } from '../composants/FilMessages'
import { Icone } from '../composants/Icones'
import { Modale } from '../composants/Modale'
import { useTitrePage } from '../hooks/useTitrePage'
import './PageMessages.css'

export function PageMessages() {
  useTitrePage('Messages')
  const { conversations, eleves, eleveParId, ajouterMessage, creerConversation, marquerConversationLue } =
    useDonnees()
  const { notifier } = useNotifications()
  const [params, setParams] = useSearchParams()

  const filParam = params.get('fil')
  const eleveParam = params.get('eleve')
  const [requete, setRequete] = useState('')

  const conversation =
    conversations.find(fil => fil.id === filParam) ??
    (eleveParam ? conversations.find(fil => fil.eleveId === eleveParam) : undefined)
  const eleveCible = conversation ? eleveParId(conversation.eleveId) : eleveParam ? eleveParId(eleveParam) : undefined

  const virtuelle: Conversation | null =
    !conversation && eleveCible
      ? { id: 'nouveau', eleveId: eleveCible.id, sujet: 'New conversation', nonLus: 0, messages: [] }
      : null
  const affichee = conversation ?? virtuelle

  useEffect(() => {
    if (conversation && conversation.nonLus > 0) marquerConversationLue(conversation.id)
  }, [conversation, marquerConversationLue])

  const [nouveauOuvert, setNouveauOuvert] = useState(false)
  const [eleveChoisi, setEleveChoisi] = useState(eleves[0]?.id ?? '')
  const [premierTexte, setPremierTexte] = useState('')
  const [erreurPremier, setErreurPremier] = useState('')
  const [chargement, setChargement] = useState(false)

  const fils = conversations.filter(fil => {
    const eleve = eleveParId(fil.eleveId)
    const texte = `${eleve?.prenom ?? ''} ${eleve?.nom ?? ''} ${fil.sujet}`.toLowerCase()
    return !requete.trim() || texte.includes(requete.trim().toLowerCase())
  })

  function choisir(fil: Conversation) {
    const suivant = new URLSearchParams(params)
    suivant.set('fil', fil.id)
    suivant.delete('eleve')
    setParams(suivant, { replace: true })
  }

  function retour() {
    const suivant = new URLSearchParams(params)
    suivant.delete('fil')
    suivant.delete('eleve')
    setParams(suivant, { replace: true })
  }

  async function envoyer(texte: string): Promise<boolean> {
    if (!affichee) return false
    try {
      await envoyerMessage(affichee.id, texte)
      if (affichee.id === 'nouveau' && eleveCible) {
        const fil = creerConversation(eleveCible.id, texte)
        const suivant = new URLSearchParams(params)
        suivant.set('fil', fil.id)
        suivant.delete('eleve')
        setParams(suivant, { replace: true })
      } else {
        ajouterMessage(affichee.id, texte)
      }
      return true
    } catch (cause) {
      notifier({
        titre: 'The message could not be sent',
        description: cause instanceof Error ? cause.message : 'Unknown error.',
        ton: 'erreur',
      })
      return false
    }
  }

  async function creerDepuisModale() {
    if (!premierTexte.trim()) {
      setErreurPremier('Write a first message so the conversation has a purpose.')
      return
    }
    setErreurPremier('')
    setChargement(true)
    try {
      await envoyerMessage('nouveau', premierTexte)
      const fil = creerConversation(eleveChoisi, premierTexte)
      const suivant = new URLSearchParams(params)
      suivant.set('fil', fil.id)
      suivant.delete('eleve')
      setParams(suivant, { replace: true })
      setNouveauOuvert(false)
      setPremierTexte('')
      notifier({ titre: 'Conversation started locally (demo)', description: 'No message left your browser.' })
    } catch (cause) {
      notifier({
        titre: 'The conversation could not be started',
        description: cause instanceof Error ? cause.message : 'Unknown error.',
        ton: 'erreur',
      })
    } finally {
      setChargement(false)
    }
  }

  return (
    <section className="panneau-page page-messages" aria-labelledby="titre-messages">
      <EntetePage
        surtitre="Inbox"
        titre="Messages"
        sousTitre="A direct line to every student, grouped by conversation."
      />

      <div className={cx('page-messages__chat', affichee && 'page-messages__chat--fil-ouvert')}>
        <div className="liste-fils">
          <div className="liste-fils__entete">
            <h2>Inbox</h2>
            <Bouton
              variante="fantome"
              taille="petit"
              onClick={() => setNouveauOuvert(true)}
              iconeGauche={<Icone nom="plus" taille={14} />}
            >
              New
            </Bouton>
          </div>

          <div className="recherche-locale liste-fils__recherche">
            <Icone nom="search" taille={16} />
            <input
              value={requete}
              onChange={evenement => setRequete(evenement.target.value)}
              placeholder="Search conversations"
              aria-label="Search conversations"
            />
          </div>

          <ul className="liste-fils__liste">
            {fils.length === 0 && <li className="liste-fils__vide">No conversation matches this search.</li>}
            {fils.map(fil => {
              const eleve = eleveParId(fil.eleveId)
              const dernier = fil.messages[fil.messages.length - 1]
              const actif = affichee?.id === fil.id
              return (
                <li key={fil.id}>
                  <button
                    type="button"
                    className={cx('fil-item', actif && 'fil-item--actif')}
                    onClick={() => choisir(fil)}
                    aria-current={actif || undefined}
                  >
                    <Avatar
                      src={eleve?.avatar}
                      nom={eleve ? `${eleve.prenom} ${eleve.nom}` : 'Student'}
                      taille={38}
                    />
                    <span className="fil-item__texte">
                      <span className="fil-item__ligne">
                        <strong>{eleve ? `${eleve.prenom} ${eleve.nom}` : 'Student'}</strong>
                        <span className="fil-item__heure">{dernier?.heure ?? ''}</span>
                      </span>
                      <span className="fil-item__sujet">{fil.sujet}</span>
                      <span className="fil-item__apercu">{dernier?.texte ?? 'No message yet.'}</span>
                    </span>
                    {fil.nonLus > 0 && (
                      <span className="fil-item__badge" aria-label={`${fil.nonLus} unread`}>
                        {fil.nonLus}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="page-messages__fil">
          {affichee && eleveCible ? (
            <FilMessages
              conversation={affichee}
              eleve={eleveCible}
              onEnvoyer={envoyer}
              onRetour={retour}
              nouveau={affichee.id === 'nouveau'}
            />
          ) : (
            <div className="page-messages__attente">
              <span className="page-messages__attente-icone">
                <Icone nom="messages" taille={28} />
              </span>
              <h2>Pick a conversation</h2>
              <p>Choose a student on the left, or start a new thread.</p>
            </div>
          )}
        </div>
      </div>

      <Modale
        ouverte={nouveauOuvert}
        onFermer={() => setNouveauOuvert(false)}
        titre="New message"
        sousTitre="Start a thread with one of your students."
        icone={<Icone nom="messages" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={() => setNouveauOuvert(false)}>
              Cancel
            </Bouton>
            <Bouton onClick={creerDepuisModale} chargement={chargement}>
              {chargement ? 'Starting…' : 'Start conversation'}
            </Bouton>
          </>
        }
      >
        <div className="message-nouveau">
          <Selection
            label="Student"
            value={eleveChoisi}
            onChange={evenement => setEleveChoisi(evenement.target.value)}
            options={eleves.map(eleve => ({
              valeur: eleve.id,
              libelle: `${eleve.prenom} ${eleve.nom}`,
            }))}
          />
          <ZoneTexte
            label="First message"
            value={premierTexte}
            onChange={evenement => setPremierTexte(evenement.target.value)}
            placeholder="Hi! A quick note about tomorrow's lecture…"
            erreur={erreurPremier}
            requis
          />
          <p className="message-nouveau__note">
            Demo: the thread is added in memory. Reopening the page resets it.
          </p>
        </div>
      </Modale>
    </section>
  )
}
