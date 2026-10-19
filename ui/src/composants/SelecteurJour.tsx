/** cloneme: C-08, A-05 — sélecteur de jour du planning. */

import { cx } from '../lib/classes'
import './SelecteurJour.css'

type Jour = { jour: number; label: string }

type Props = {
  jours: readonly Jour[]
  valeur: number
  onChange: (jour: number) => void
}

export function SelecteurJour({ jours, valeur, onChange }: Props) {
  return (
    <div className="selecteur-jour" role="group" aria-label="Choose a day" data-ref="selecteur-jour">
      {jours.map(item => {
        const actif = item.jour === valeur
        return (
          <button
            key={item.jour}
            type="button"
            className={cx('jour', actif && 'jour--actif')}
            onClick={() => onChange(item.jour)}
            aria-pressed={actif}
            aria-label={`${item.label} ${item.jour} June`}
          >
            {actif ? (
              <>
                <span className="jour__libelle">{item.label}</span>
                <span className="jour__numero">{item.jour}</span>
                <span className="jour__points" aria-hidden="true">
                  <span className="jour__point jour__point--sarcelle" />
                  <span className="jour__point jour__point--corail" />
                </span>
              </>
            ) : (
              <>
                <span className="jour__numero">{item.jour}</span>
                <span className="jour__libelle">{item.label}</span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
