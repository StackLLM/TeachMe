/** cloneme: C-05, A-07 — carte de groupe cliquable. */

import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/classes'
import { delaiCascade } from '../lib/animations'
import type { Groupe } from '../lib/types'
import { Avatar } from './Avatar'
import { Icone } from './Icones'
import { Pastille } from './Pastille'
import './CarteGroupe.css'

type Props = {
  groupe: Groupe
  index: number
  nouvelle?: boolean
}

export function CarteGroupe({ groupe, index, nouvelle = false }: Props) {
  const supplement = Math.max(0, groupe.effectif - groupe.avatars.length)

  return (
    <Link
      to={`/groups/${groupe.id}`}
      className={cx('carte-groupe', 'survol-carte', 'cascade', nouvelle && 'carte-groupe--nouvelle')}
      style={{ '--cascade-delai': delaiCascade(index) } as CSSProperties}
      data-ref="carte-groupe"
      aria-label={`${groupe.code} — ${groupe.cours}, next lecture ${groupe.prochaineSeance}`}
    >
      <div className="carte-groupe__principal">
        <h3 className="carte-groupe__titre">
          {groupe.code} <span>({groupe.cours})</span>
        </h3>
        <ul className="carte-groupe__meta">
          <li>
            <Icone nom="calendar" taille={13} />
            {groupe.date}
          </li>
          <li>
            <Icone nom="clock" taille={13} />
            {groupe.heure}
          </li>
        </ul>
      </div>

      <div className="carte-groupe__droite">
        <div className="carte-groupe__avatars" aria-label={`${groupe.effectif} students`}>
          {groupe.avatars.map((src, rang) => (
            <Avatar key={`${groupe.id}-${rang}`} src={src} nom="Student" taille={34} />
          ))}
          {supplement > 0 && (
            <Pastille teinte="corail" ronde ariaLabel={`${supplement} more students`}>
              +{supplement}
            </Pastille>
          )}
        </div>
        <p className="carte-groupe__seance">
          <strong>Lecture {groupe.prochaineSeance}</strong> <span>(next)</span>
        </p>
      </div>
    </Link>
  )
}
