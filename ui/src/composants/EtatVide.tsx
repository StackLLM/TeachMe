/** cloneme: C-22 — état vide réutilisable. */

import type { NomIcone } from './Icones'
import { Icone } from './Icones'
import { Bouton } from './Bouton'
import './EtatVide.css'

type Props = {
  titre: string
  texte: string
  icone?: NomIcone
  action?: { libelle: string; executer: () => void }
}

export function EtatVide({ titre, texte, icone = 'search', action }: Props) {
  return (
    <div className="etat-vide">
      <span className="etat-vide__icone" aria-hidden="true">
        <Icone nom={icone} taille={26} />
      </span>
      <h3 className="etat-vide__titre">{titre}</h3>
      <p className="etat-vide__texte">{texte}</p>
      {action && (
        <Bouton variante="fantome" taille="petit" onClick={action.executer}>
          {action.libelle}
        </Bouton>
      )}
    </div>
  )
}
