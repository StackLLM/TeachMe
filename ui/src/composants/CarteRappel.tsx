/** cloneme: C-10, A-06 — carte de rappel avec retrait animé. */

import { useState } from 'react'
import { cx } from '../lib/classes'
import type { Rappel } from '../lib/types'
import { Icone } from './Icones'
import './CarteRappel.css'

type Props = {
  rappel: Rappel
  onRetirer: (id: string) => void
}

export function CarteRappel({ rappel, onRetirer }: Props) {
  const [sortie, setSortie] = useState(false)

  function retirer() {
    if (sortie) return
    setSortie(true)
    window.setTimeout(() => onRetirer(rappel.id), 220)
  }

  return (
    <li
      className={cx(
        'rappel',
        rappel.prioritaire && 'rappel--prioritaire',
        sortie && 'rappel--sortie',
      )}
    >
      <span className={cx('rappel__puce', `rappel__puce--${rappel.teinte}`)} aria-hidden="true">
        <strong>{rappel.jour}</strong>
        <span>{rappel.jourLabel}</span>
      </span>
      <div className="rappel__carte" data-ref="carte-rappel">
        <div className="rappel__texte">
          <p className="rappel__titre">{rappel.titre}</p>
          <p className="rappel__heure">{rappel.heure}</p>
        </div>
        <button
          className="rappel__retirer"
          type="button"
          onClick={retirer}
          aria-label={`Dismiss reminder: ${rappel.titre}`}
        >
          <Icone nom="close" taille={16} />
        </button>
      </div>
    </li>
  )
}
