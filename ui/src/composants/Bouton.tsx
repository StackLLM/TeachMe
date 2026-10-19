/** cloneme: C-12 — bouton à variantes. */

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/classes'
import './Bouton.css'

export type VarianteBouton = 'primaire' | 'secondaire' | 'fantome' | 'danger'
export type TailleBouton = 'normal' | 'petit' | 'large'

type Commun = {
  variante?: VarianteBouton
  taille?: TailleBouton
  pleineLargeur?: boolean
  iconeGauche?: ReactNode
  iconeDroite?: ReactNode
  children: ReactNode
  className?: string
}

type Props = Commun & ButtonHTMLAttributes<HTMLButtonElement> & { chargement?: boolean; 'data-ref'?: string }

export function Bouton({
  variante = 'primaire',
  taille = 'normal',
  pleineLargeur = false,
  iconeGauche,
  iconeDroite,
  chargement = false,
  className,
  children,
  disabled,
  type = 'button',
  ...reste
}: Props) {
  return (
    <button
      {...reste}
      type={type}
      className={cx(
        'bouton',
        `bouton--${variante}`,
        `bouton--${taille}`,
        pleineLargeur && 'bouton--pleine',
        chargement && 'bouton--chargement',
        className,
      )}
      disabled={disabled || chargement}
      aria-busy={chargement || undefined}
    >
      {chargement ? <span className="bouton__spinner" aria-hidden="true" /> : iconeGauche}
      <span className="bouton__libelle">{children}</span>
      {!chargement && iconeDroite}
    </button>
  )
}

type PropsLien = Commun & {
  to: string
  'aria-label'?: string
  onClick?: () => void
}

export function LienBouton({
  to,
  variante = 'primaire',
  taille = 'normal',
  pleineLargeur = false,
  iconeGauche,
  iconeDroite,
  className,
  children,
  onClick,
  ...reste
}: PropsLien) {
  return (
    <Link
      {...reste}
      to={to}
      onClick={onClick}
      className={cx(
        'bouton',
        `bouton--${variante}`,
        `bouton--${taille}`,
        pleineLargeur && 'bouton--pleine',
        className,
      )}
    >
      {iconeGauche}
      <span className="bouton__libelle">{children}</span>
      {iconeDroite}
    </Link>
  )
}
