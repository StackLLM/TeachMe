/** cloneme: C-09 — carte de séance du planning, avec orbe géométrique. */

import { useId, type CSSProperties } from 'react'
import { delaiCascade } from '../lib/animations'
import type { Evenement } from '../lib/types'
import { Icone } from './Icones'
import './CarteEvenement.css'

type Props = {
  evenement: Evenement
  index: number
  onOuvrir: (evenement: Evenement) => void
}

function Orbe({ variante }: { variante: number }) {
  const identifiant = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const v = ((Math.abs(variante) - 1) % 5) + 1

  return (
    <svg className={`orbe orbe--${v}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={identifiant}>
          <circle cx="24" cy="24" r="23" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${identifiant})`}>
        <circle className="orbe__fond" cx="24" cy="24" r="23" />
        {v === 1 && (
          <>
            <circle className="orbe__blanc" cx="16" cy="15" r="11" />
            <circle className="orbe__sarcelle" cx="33" cy="18" r="3" />
            <rect className="orbe__corail" x="14" y="36" width="22" height="5" rx="2.5" transform="rotate(-8 14 36)" />
          </>
        )}
        {v === 2 && (
          <>
            <path className="orbe__sarcelle" d="M28 0c16 4 22 22 14 40l-12 8H0V26C0 12 12 0 28 0Z" />
            <circle className="orbe__blanc" cx="35" cy="35" r="4" />
            <circle className="orbe__corail" cx="14" cy="16" r="3" />
            <path className="orbe__rose" d="M0 40c8-6 18-6 24 0v8H0v-8Z" />
          </>
        )}
        {v === 3 && (
          <>
            <path className="orbe__rose" d="M0 0h48v18c-14 0-24-8-28-18H0Z" />
            <path className="orbe__sarcelle" d="M0 26c14 0 26 12 26 22H0V26Z" />
            <circle className="orbe__corail" cx="33" cy="32" r="4" />
            <circle className="orbe__peche" cx="40" cy="11" r="3" />
          </>
        )}
        {v === 4 && (
          <>
            <circle className="orbe__sarcelle" cx="14" cy="34" r="14" />
            <circle className="orbe__rose" cx="34" cy="14" r="9" />
            <rect className="orbe__corail" x="26" y="24" width="17" height="4" rx="2" transform="rotate(-33 26 24)" />
            <circle className="orbe__blanc" cx="35" cy="35" r="3" />
          </>
        )}
        {v === 5 && (
          <>
            <path className="orbe__peche" d="M48 0v48H22C22 28 32 8 48 0Z" />
            <circle className="orbe__corail" cx="16" cy="16" r="4" />
            <rect className="orbe__blanc" x="8" y="27" width="18" height="4" rx="2" />
            <circle className="orbe__sarcelle" cx="36" cy="40" r="3" />
          </>
        )}
      </g>
    </svg>
  )
}

export function CarteEvenement({ evenement, index, onOuvrir }: Props) {
  return (
    <button
      type="button"
      className="carte-evenement survol-carte cascade"
      style={{ '--cascade-delai': delaiCascade(index) } as CSSProperties}
      onClick={() => onOuvrir(evenement)}
      aria-label={`Join ${evenement.groupe}, lecture ${evenement.seance}, ${evenement.heure}`}
      data-ref="carte-evenement"
    >
      <Orbe variante={evenement.orbe} />
      <span className="carte-evenement__texte">
        <span className="carte-evenement__titre">
          <strong>{evenement.groupe}</strong> <em>(Lecture {evenement.seance})</em>
        </span>
        <span className="carte-evenement__heure">{evenement.heure}</span>
      </span>
      <span className="carte-evenement__action" aria-hidden="true">
        <Icone nom="play" taille={13} />
      </span>
    </button>
  )
}
