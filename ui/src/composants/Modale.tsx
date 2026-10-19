/**
 * cloneme: C-14, A-03 — modale accessible (voile, Échap, clic extérieur, focus
 * piégé, verrou de défilement, animation d'entrée et de sortie).
 */

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../lib/classes'
import { useEchap } from '../hooks/useEchap'
import { usePiegeFocus } from '../hooks/usePiegeFocus'
import { useVerrouDefilement } from '../hooks/useVerrouDefilement'
import { Icone } from './Icones'
import './Modale.css'

type Props = {
  ouverte: boolean
  onFermer: () => void
  titre: string
  sousTitre?: string
  taille?: 'petite' | 'normale' | 'large'
  children: ReactNode
  pied?: ReactNode
  icone?: ReactNode
}

export function Modale({ ouverte, onFermer, titre, sousTitre, taille = 'normale', children, pied, icone }: Props) {
  const idTitre = useId()
  const idSousTitre = useId()
  const panneau = useRef<HTMLDivElement>(null)
  const [presente, setPresente] = useState(ouverte)
  const [sortie, setSortie] = useState(false)

  useEffect(() => {
    if (ouverte) {
      setPresente(true)
      setSortie(false)
      return
    }
    if (!presente) return
    setSortie(true)
    const minuterie = window.setTimeout(() => {
      setPresente(false)
      setSortie(false)
    }, 160)
    return () => window.clearTimeout(minuterie)
  }, [ouverte, presente])

  useEchap(ouverte, onFermer)
  useVerrouDefilement(presente)
  usePiegeFocus(panneau, presente)

  if (!presente) return null

  return createPortal(
    <div
      className={cx('modale-voile', sortie ? 'modale-voile--sortie' : 'voile-entree')}
      onMouseDown={evenement => {
        if (evenement.target === evenement.currentTarget) onFermer()
      }}
    >
      <div
        ref={panneau}
        className={cx('modale', `modale--${taille}`, sortie ? 'modale--sortie' : 'modale-entree')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitre}
        aria-describedby={sousTitre ? idSousTitre : undefined}
        tabIndex={-1}
      >
        <header className="modale__entete">
          {icone && <span className="modale__icone">{icone}</span>}
          <div className="modale__titres">
            <h2 className="modale__titre" id={idTitre}>
              {titre}
            </h2>
            {sousTitre && (
              <p className="modale__sous-titre" id={idSousTitre}>
                {sousTitre}
              </p>
            )}
          </div>
          <button className="modale__fermer" type="button" onClick={onFermer} aria-label="Close">
            <Icone nom="close" taille={18} />
          </button>
        </header>
        <div className="modale__corps">{children}</div>
        {pied && <footer className="modale__pied">{pied}</footer>}
      </div>
    </div>,
    document.body,
  )
}
