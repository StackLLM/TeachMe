/** cloneme: C-01, A-02, A-04 — coque : ornements, barre latérale, entête, page. */

import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { BarreLaterale } from '../composants/BarreLaterale'
import { EnTete } from '../composants/EnTete'
import { OrnementsFond } from '../composants/OrnementsFond'
import { PaletteRecherche } from '../composants/PaletteRecherche'
import { useRequeteMedia } from '../hooks/useRequeteMedia'
import './GabaritPrincipal.css'

export function GabaritPrincipal({ children }: { children: ReactNode }) {
  const [rechercheOuverte, setRechercheOuverte] = useState(false)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const location = useLocation()
  const estMobile = useRequeteMedia('(max-width: 980px)')

  useEffect(() => {
    if (!estMobile) setMenuOuvert(false)
  }, [estMobile])

  useEffect(() => {
    setMenuOuvert(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const surTouche = (evenement: KeyboardEvent) => {
      const cible = evenement.target as HTMLElement | null
      const dansChamp =
        !!cible &&
        (cible.tagName === 'INPUT' ||
          cible.tagName === 'TEXTAREA' ||
          cible.tagName === 'SELECT' ||
          cible.isContentEditable)

      if ((evenement.metaKey || evenement.ctrlKey) && evenement.key.toLowerCase() === 'k') {
        evenement.preventDefault()
        setRechercheOuverte(true)
        return
      }
      if (evenement.key === '/' && !dansChamp && !rechercheOuverte) {
        evenement.preventDefault()
        setRechercheOuverte(true)
      }
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [rechercheOuverte])

  return (
    <>
      <OrnementsFond />
      <a className="lien-evitement" href="#contenu">
        Skip to content
      </a>

      <div className="coque" data-ref="coque">
        <BarreLaterale ouverte={menuOuvert} onFermer={() => setMenuOuvert(false)} />

        <div className="coque__contenu">
          <EnTete
            onOuvrirRecherche={() => setRechercheOuverte(true)}
            onOuvrirMenu={() => setMenuOuvert(true)}
            menuOuvert={menuOuvert}
          />
          <main className="coque__principal" id="contenu">
            <div className="page-entree" key={location.pathname}>
              {children}
            </div>
          </main>
        </div>
      </div>

      <PaletteRecherche ouverte={rechercheOuverte} onFermer={() => setRechercheOuverte(false)} />
    </>
  )
}
