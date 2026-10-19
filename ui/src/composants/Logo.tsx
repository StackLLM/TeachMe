/** cloneme: C-04 — logo eLarium, toucan géométrique dessiné pour le clone. */

import { Link } from 'react-router-dom'
import './Logo.css'

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="eLarium — My course" data-ref="logo">
      <svg className="logo__marque" viewBox="0 0 48 52" aria-hidden="true" focusable="false">
        <path
          className="logo__tete"
          d="M23.5 4.2c7.2-.4 12.6 4.4 13.2 11.4l.5 7.2-6.6 4.2-10.3-2.1-4.2-8.8c-1-4.9 1.8-10.9 7.4-11.9Z"
        />
        <path
          className="logo__bec"
          d="M8.4 11.6c2.5-3.2 6.9-4.3 10.6-2.6l-2.4 7.6c-3.2.8-6.5-.4-8.2-3.1-.6-1-.5-1.4 0-1.9Z"
        />
        <path
          className="logo__corps"
          d="M26.8 19.8c7.4 2.3 11.3 10.2 8.7 17.4l-2.6 7.2-9.2-2.7-4.9-9.8 8-12.1Z"
        />
        <circle className="logo__oeil" cx="25" cy="12.6" r="3.1" />
        <circle className="logo__pupille" cx="25.8" cy="12.6" r="1.3" />
        <path
          className="logo__socle"
          d="M12.2 41.4h25c2.4 0 3.5 2.3 1.6 3.9-6.8 5.6-22.9 5.6-29.7 0-1.9-1.6-.8-3.9 1.6-3.9h1.5Z"
        />
      </svg>
      <span className="logo__mot">eLarium</span>
    </Link>
  )
}
