/** cloneme: C-26 — en-tête commun aux pages secondaires. */

import type { ReactNode } from 'react'
import './EntetePage.css'

type Props = {
  surtitre?: string
  titre: string
  sousTitre?: string
  actions?: ReactNode
}

export function EntetePage({ surtitre, titre, sousTitre, actions }: Props) {
  return (
    <header className="entete-page">
      <div className="entete-page__textes">
        {surtitre && <p className="entete-page__surtitre">{surtitre}</p>}
        <h1 className="entete-page__titre">{titre}</h1>
        {sousTitre && <p className="entete-page__sous-titre">{sousTitre}</p>}
      </div>
      {actions && <div className="entete-page__actions">{actions}</div>}
    </header>
  )
}
