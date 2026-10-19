/** cloneme: C-21 — fil de conversation et composeur. */

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/classes'
import type { Conversation, Eleve } from '../lib/types'
import { Avatar } from './Avatar'
import { Icone } from './Icones'
import './FilMessages.css'

type Props = {
  conversation: Conversation
  eleve?: Eleve
  onEnvoyer: (texte: string) => Promise<boolean>
  onRetour: () => void
  nouveau?: boolean
}

export function FilMessages({ conversation, eleve, onEnvoyer, onRetour, nouveau = false }: Props) {
  const [texte, setTexte] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const zoneMessages = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const zone = zoneMessages.current
    if (zone) zone.scrollTop = zone.scrollHeight
  }, [conversation.messages.length])

  async function soumettre(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault()
    if (!texte.trim() || envoi) return
    setEnvoi(true)
    const envoye = await onEnvoyer(texte)
    setEnvoi(false)
    if (envoye) setTexte('')
  }

  const nom = eleve ? `${eleve.prenom} ${eleve.nom}` : 'Student'

  return (
    <div className="fil" aria-label={`Conversation with ${nom}`}>
      <header className="fil__entete">
        <button className="fil__retour" type="button" onClick={onRetour} aria-label="Back to conversations">
          <Icone nom="arrow-left" taille={18} />
        </button>
        <Avatar src={eleve?.avatar} nom={nom} taille={38} />
        <div className="fil__identite">
          <strong>{nom}</strong>
          <span>{conversation.sujet}</span>
        </div>
        {eleve && (
          <Link className="fil__profil" to={`/students?eleve=${eleve.id}`}>
            Profile
          </Link>
        )}
      </header>

      <div className="fil__messages" ref={zoneMessages} aria-live="polite">
        {conversation.messages.length === 0 ? (
          <div className="fil__vide">
            <span className="fil__vide-icone">
              <Icone nom="messages" taille={24} />
            </span>
            <p>{nouveau ? `Say hello to ${eleve?.prenom ?? 'your student'}.` : 'No message yet.'}</p>
            <small>The first message starts the conversation — nothing is sent in this demo.</small>
          </div>
        ) : (
          conversation.messages.map(message => (
            <div key={message.id} className={cx('bulle', `bulle--${message.auteur}`)}>
              <p>{message.texte}</p>
              <span>{message.heure}</span>
            </div>
          ))
        )}
      </div>

      <form className="fil__compose" onSubmit={soumettre}>
        <input
          className="fil__saisie"
          value={texte}
          onChange={evenement => setTexte(evenement.target.value)}
          placeholder={`Write a message to ${eleve?.prenom ?? 'the student'}…`}
          aria-label="Message"
        />
        <button
          className="fil__envoyer"
          type="submit"
          disabled={!texte.trim() || envoi}
          aria-label="Send message"
          aria-busy={envoi || undefined}
        >
          <Icone nom="send" taille={18} />
        </button>
      </form>
    </div>
  )
}
