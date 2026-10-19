/** cloneme: C-20, C-25 — carte d'évaluation d'une copie. */

import type { Eleve, Evaluation, Groupe } from '../lib/types'
import { Avatar } from './Avatar'
import { Bouton } from './Bouton'
import { Pastille } from './Pastille'
import './CarteEvaluation.css'

type Props = {
  evaluation: Evaluation
  eleve?: Eleve
  groupe?: Groupe
  onOuvrir: (evaluation: Evaluation) => void
}

export function CarteEvaluation({ evaluation, eleve, groupe, onOuvrir }: Props) {
  const corrigee = evaluation.statut === 'corrigee'

  return (
    <article className="carte-evaluation">
      <header className="carte-evaluation__entete">
        <Avatar src={eleve?.avatar} nom={eleve ? `${eleve.prenom} ${eleve.nom}` : 'Student'} taille={34} />
        <div className="carte-evaluation__identite">
          <strong>{eleve ? `${eleve.prenom} ${eleve.nom}` : 'Student'}</strong>
          <span>
            {groupe?.code} · {evaluation.date}
          </span>
        </div>
        <Pastille teinte={corrigee ? 'sarcelle' : 'corail'}>
          {corrigee ? 'Reviewed' : 'To review'}
        </Pastille>
      </header>

      <h3 className="carte-evaluation__titre">{evaluation.titre}</h3>
      <p className="carte-evaluation__extrait">{evaluation.extrait}</p>

      {corrigee && (
        <div className="carte-evaluation__retour">
          <span className="carte-evaluation__note">{evaluation.note}/20</span>
          <p>{evaluation.commentaire}</p>
        </div>
      )}

      <footer className="carte-evaluation__pied">
        <span className="carte-evaluation__meta">{groupe?.cours ?? 'Course'}</span>
        <Bouton
          variante={corrigee ? 'fantome' : 'primaire'}
          taille="petit"
          onClick={() => onOuvrir(evaluation)}
        >
          {corrigee ? 'Read feedback' : 'Start review'}
        </Bouton>
      </footer>
    </article>
  )
}
