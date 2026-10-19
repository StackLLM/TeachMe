/** cloneme: P-01 — tableau de bord « My course ». */

import { ListeRappels } from '../composants/ListeRappels'
import { PanneauGroupes } from '../composants/PanneauGroupes'
import { PanneauPlanning } from '../composants/PanneauPlanning'
import { useTitrePage } from '../hooks/useTitrePage'
import './PageTableauDeBord.css'

export function PageTableauDeBord() {
  useTitrePage('My course')

  return (
    <>
      <h1 className="sr-only">My course</h1>
      <div className="tableau" data-ref="tableau">
        <div className="tableau__panneau" data-ref="panneau-groupes">
          <PanneauGroupes />
        </div>
        <div className="tableau__colonne" data-ref="colonne-droite">
          <PanneauPlanning />
          <ListeRappels />
        </div>
      </div>
    </>
  )
}
