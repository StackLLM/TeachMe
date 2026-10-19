/** cloneme: C-19, C-17, C-25 — tableau des élèves (cartes en mobile). */

import { cx } from '../lib/classes'
import type { Eleve, Groupe } from '../lib/types'
import { Avatar } from './Avatar'
import { Pastille } from './Pastille'
import './TableauEleves.css'

type Props = {
  eleves: Eleve[]
  groupeParId: (id: string) => Groupe | undefined
  onVoir: (eleve: Eleve) => void
  onMessage: (eleve: Eleve) => void
}

export function TableauEleves({ eleves, groupeParId, onVoir, onMessage }: Props) {
  return (
    <div className="tableau-eleves">
      <div className="tableau-eleves__entete" aria-hidden="true">
        <span>Student</span>
        <span>Group</span>
        <span>Attendance</span>
        <span>Last active</span>
        <span className="sr-only">Actions</span>
      </div>

      <ul className="tableau-eleves__liste">
        {eleves.map(eleve => {
          const groupe = groupeParId(eleve.groupeId)
          return (
            <li className="ligne-eleve" key={eleve.id}>
              <div className="ligne-eleve__eleve">
                <Avatar src={eleve.avatar} nom={`${eleve.prenom} ${eleve.nom}`} taille={38} />
                <div className="ligne-eleve__identite">
                  <strong>
                    {eleve.prenom} {eleve.nom}
                  </strong>
                  <span>{eleve.email}</span>
                </div>
              </div>

              <div className="ligne-eleve__cellule" data-label="Group">
                {groupe ? <Pastille teinte="sarcelle">{groupe.code}</Pastille> : '—'}
              </div>

              <div className="ligne-eleve__cellule ligne-eleve__assiduite" data-label="Attendance">
                <span className="jauge" aria-hidden="true">
                  <span
                    className={cx('jauge__remplie', eleve.assiduite < 80 && 'jauge__remplie--alerte')}
                    style={{ width: `${eleve.assiduite}%` }}
                  />
                </span>
                <span className="ligne-eleve__valeur">{eleve.assiduite}%</span>
              </div>

              <div className="ligne-eleve__cellule ligne-eleve__activite" data-label="Last active">
                <span className={cx('etat', `etat--${eleve.statut}`)} aria-hidden="true" />
                {eleve.derniereActivite}
              </div>

              <div className="ligne-eleve__actions">
                <button className="ligne-eleve__lien" type="button" onClick={() => onVoir(eleve)}>
                  View
                </button>
                <button
                  className="ligne-eleve__lien ligne-eleve__lien--accent"
                  type="button"
                  onClick={() => onMessage(eleve)}
                >
                  Message
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
