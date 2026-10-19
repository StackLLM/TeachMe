/** cloneme: C-25 — petites pastilles (compteur, statut, type). */

import type { ReactNode } from 'react'
import { cx } from '../lib/classes'
import './Pastille.css'

export type TeintePastille = 'corail' | 'rose' | 'peche' | 'sarcelle' | 'succes' | 'neutre'

type Props = {
  children: ReactNode
  teinte?: TeintePastille
  ronde?: boolean
  className?: string
  ariaLabel?: string
}

export function Pastille({ children, teinte = 'neutre', ronde = false, className, ariaLabel }: Props) {
  return (
    <span
      className={cx('pastille', `pastille--${teinte}`, ronde && 'pastille--ronde', className)}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  )
}
