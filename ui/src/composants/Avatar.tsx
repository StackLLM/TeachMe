/** cloneme: C-17 — avatar avec initiale de secours. */

import { useState, type CSSProperties } from 'react'
import { cx } from '../lib/classes'
import './Avatar.css'

type Props = {
  src?: string
  nom: string
  taille?: number
  anneau?: boolean
  className?: string
}

function initiales(nom: string): string {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(mot => mot[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ src, nom, taille = 34, anneau = true, className }: Props) {
  const [erreur, setErreur] = useState(false)
  const style = { '--taille-avatar': `${taille}px` } as CSSProperties
  const afficherImage = src && !erreur

  return (
    <span className={cx('avatar', anneau && 'avatar--anneau', className)} style={style} title={nom}>
      {afficherImage ? (
        <img src={src} alt={nom} loading="lazy" onError={() => setErreur(true)} />
      ) : (
        <span className="avatar__initiales" aria-hidden="true">
          {initiales(nom)}
        </span>
      )}
      {!afficherImage && <span className="sr-only">{nom}</span>}
    </span>
  )
}
