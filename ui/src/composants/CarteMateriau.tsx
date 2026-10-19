/** cloneme: C-18, C-25, A-09 — carte de support de cours. */

import type { CSSProperties } from 'react'
import { delaiCascade } from '../lib/animations'
import type { Groupe, Materiau, TypeMateriau } from '../lib/types'
import { Icone, type NomIcone } from './Icones'
import { Pastille } from './Pastille'
import './CarteMateriau.css'

const APPARENCE: Record<TypeMateriau, { libelle: string; icone: NomIcone; teinte: 'sarcelle' | 'peche' | 'corail' | 'neutre' }> = {
  slides: { libelle: 'Slides', icone: 'materials', teinte: 'sarcelle' },
  fiche: { libelle: 'Worksheet', icone: 'file', teinte: 'peche' },
  video: { libelle: 'Video', icone: 'play', teinte: 'corail' },
  examen: { libelle: 'Exam', icone: 'check', teinte: 'neutre' },
}

type Props = {
  materiau: Materiau
  groupe?: Groupe
  index: number
  onOuvrir: (materiau: Materiau) => void
}

export function CarteMateriau({ materiau, groupe, index, onOuvrir }: Props) {
  const apparence = APPARENCE[materiau.type]

  return (
    <button
      type="button"
      className="carte-materiau survol-carte cascade"
      style={{ '--cascade-delai': delaiCascade(index) } as CSSProperties}
      onClick={() => onOuvrir(materiau)}
      aria-label={`Open ${materiau.titre} — ${apparence.libelle}`}
    >
      <span className={`carte-materiau__vignette carte-materiau__vignette--${materiau.type}`}>
        <span className="carte-materiau__vignette-icone">
          <Icone nom={apparence.icone} taille={22} />
        </span>
        <span className="carte-materiau__vignette-forme carte-materiau__vignette-forme--a" />
        <span className="carte-materiau__vignette-forme carte-materiau__vignette-forme--b" />
      </span>
      <span className="carte-materiau__corps">
        <span className="carte-materiau__titre">{materiau.titre}</span>
        <span className="carte-materiau__meta">
          {groupe ? `${groupe.code} · ${groupe.cours}` : 'Unassigned'}
        </span>
        <span className="carte-materiau__bas">
          <Pastille teinte={apparence.teinte}>{apparence.libelle}</Pastille>
          <span className="carte-materiau__details">
            {materiau.date} · {materiau.poids}
          </span>
        </span>
      </span>
    </button>
  )
}
