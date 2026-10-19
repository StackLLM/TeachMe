/** cloneme: C-13 — champs de formulaire accessibles. */

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cx } from '../lib/classes'
import { Icone } from './Icones'
import './Champ.css'

type Base = {
  label: string
  erreur?: string
  aide?: string
  requis?: boolean
  className?: string
}

function Enveloppe({
  label,
  erreur,
  aide,
  requis,
  htmlFor,
  idErreur,
  idAide,
  className,
  children,
}: Base & {
  htmlFor: string
  idErreur: string
  idAide: string
  children: ReactNode
}) {
  return (
    <div className={cx('champ', erreur && 'champ--erreur', className)}>
      <label className="champ__label" htmlFor={htmlFor}>
        {label}
        {requis && <span className="champ__requis" aria-hidden="true"> *</span>}
      </label>
      {children}
      {aide && !erreur && (
        <p className="champ__aide" id={idAide}>
          {aide}
        </p>
      )}
      {erreur && (
        <p className="champ__erreur" id={idErreur} role="alert">
          <Icone nom="alert" taille={14} />
          {erreur}
        </p>
      )}
    </div>
  )
}

type PropsChamp = Base & InputHTMLAttributes<HTMLInputElement>

export function Champ({ label, erreur, aide, requis, className, id, ...reste }: PropsChamp) {
  const auto = useId()
  const identifiant = id ?? auto
  const idErreur = `${identifiant}-erreur`
  const idAide = `${identifiant}-aide`

  return (
    <Enveloppe
      label={label}
      erreur={erreur}
      aide={aide}
      requis={requis}
      htmlFor={identifiant}
      idErreur={idErreur}
      idAide={idAide}
      className={className}
    >
      <input
        {...reste}
        id={identifiant}
        className="champ__saisie"
        required={requis}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? idErreur : aide ? idAide : undefined}
      />
    </Enveloppe>
  )
}

type PropsZone = Base & TextareaHTMLAttributes<HTMLTextAreaElement>

export function ZoneTexte({ label, erreur, aide, requis, className, id, ...reste }: PropsZone) {
  const auto = useId()
  const identifiant = id ?? auto
  const idErreur = `${identifiant}-erreur`
  const idAide = `${identifiant}-aide`

  return (
    <Enveloppe
      label={label}
      erreur={erreur}
      aide={aide}
      requis={requis}
      htmlFor={identifiant}
      idErreur={idErreur}
      idAide={idAide}
      className={className}
    >
      <textarea
        {...reste}
        id={identifiant}
        className="champ__saisie champ__saisie--zone"
        required={requis}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? idErreur : aide ? idAide : undefined}
      />
    </Enveloppe>
  )
}

type PropsSelection = Base &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<{ valeur: string; libelle: string }>
  }

export function Selection({ label, erreur, aide, requis, className, id, options, ...reste }: PropsSelection) {
  const auto = useId()
  const identifiant = id ?? auto
  const idErreur = `${identifiant}-erreur`
  const idAide = `${identifiant}-aide`

  return (
    <Enveloppe
      label={label}
      erreur={erreur}
      aide={aide}
      requis={requis}
      htmlFor={identifiant}
      idErreur={idErreur}
      idAide={idAide}
      className={className}
    >
      <span className="champ__selection">
        <select
          {...reste}
          id={identifiant}
          className="champ__saisie champ__saisie--selection"
          required={requis}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? idErreur : aide ? idAide : undefined}
        >
          {options.map(option => (
            <option key={option.valeur} value={option.valeur}>
              {option.libelle}
            </option>
          ))}
        </select>
        <Icone nom="chevron-down" taille={16} className="champ__chevron" />
      </span>
    </Enveloppe>
  )
}
