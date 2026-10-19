/** cloneme: C-02, A-04 — navigation principale et tiroir mobile. */

import { NavLink } from 'react-router-dom'
import { cx } from '../lib/classes'
import { useDonnees } from '../state/Donnees'
import { useEchap } from '../hooks/useEchap'
import { useVerrouDefilement } from '../hooks/useVerrouDefilement'
import { CarteOffre } from './CarteOffre'
import { Icone, type NomIcone } from './Icones'
import { Logo } from './Logo'
import './BarreLaterale.css'

type Props = {
  ouverte: boolean
  onFermer: () => void
}

const LIENS: Array<{ to: string; libelle: string; icone: NomIcone; fin?: boolean }> = [
  { to: '/materials', libelle: 'Materials', icone: 'materials' },
  { to: '/', libelle: 'My course', icone: 'course', fin: true },
  { to: '/students', libelle: 'Students', icone: 'students' },
  { to: '/reviews', libelle: 'Reviews', icone: 'reviews' },
  { to: '/messages', libelle: 'Messages', icone: 'messages' },
]

export function BarreLaterale({ ouverte, onFermer }: Props) {
  const { nonLus } = useDonnees()
  useEchap(ouverte, onFermer)
  useVerrouDefilement(ouverte)

  return (
    <>
      {ouverte && (
        <div className="barre-laterale__voile voile-entree" onClick={onFermer} aria-hidden="true" />
      )}
      <aside
        id="navigation-principale"
        className={cx('barre-laterale', ouverte && 'barre-laterale--ouverte')}
        data-ref="barre-laterale"
      >
        <div className="barre-laterale__entete">
          <Logo />
          <button className="barre-laterale__fermer" type="button" onClick={onFermer} aria-label="Close menu">
            <Icone nom="close" taille={18} />
          </button>
        </div>

        <nav className="barre-laterale__nav" aria-label="Main navigation">
          {LIENS.map(lien => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end={lien.fin}
              onClick={onFermer}
              className={({ isActive }) =>
                cx('lien-nav', isActive && 'lien-nav--actif', lien.to === '/' && 'lien-nav--accueil')
              }
            >
              <span className="lien-nav__icone">
                <Icone nom={lien.icone} taille={21} />
                {lien.to === '/messages' && nonLus > 0 && (
                  <span className="lien-nav__point" aria-label={`${nonLus} unread messages`} />
                )}
              </span>
              <span className="lien-nav__libelle">{lien.libelle}</span>
            </NavLink>
          ))}
        </nav>

        <div className="barre-laterale__bas">
          <CarteOffre />
          <NavLink
            to="/settings"
            onClick={onFermer}
            className={({ isActive }) => cx('lien-nav', 'lien-nav--reglages', isActive && 'lien-nav--actif-simple')}
          >
            <span className="lien-nav__icone">
              <Icone nom="settings" taille={21} />
            </span>
            <span className="lien-nav__libelle">Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}
