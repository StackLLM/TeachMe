/** cloneme: P-99 — page 404 de la coque. */

import { useLocation } from 'react-router-dom'
import { LienBouton } from '../composants/Bouton'
import { Logo } from '../composants/Logo'
import { useTitrePage } from '../hooks/useTitrePage'
import './Page404.css'

export function Page404() {
  useTitrePage('Page not found')
  const location = useLocation()

  return (
    <section className="panneau-page page-404" aria-labelledby="titre-404">
      <div className="page-404__illustration" aria-hidden="true">
        <span className="page-404__code">404</span>
        <span className="page-404__logo">
          <Logo />
        </span>
      </div>
      <h1 className="page-404__titre" id="titre-404">
        This page wandered off.
      </h1>
      <p className="page-404__texte">
        The address <code>{location.pathname}</code> is not part of this clone. Everything that was
        reproduced is reachable from the menu.
      </p>
      <LienBouton to="/" iconeGauche={<span aria-hidden="true">←</span>}>
        Back to My course
      </LienBouton>
    </section>
  )
}
