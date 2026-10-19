/** cloneme: C-03 — barre haute : recherche, visio, profil, menu mobile. */

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClicExterieur } from '../hooks/useClicExterieur'
import { useEchap } from '../hooks/useEchap'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Avatar } from './Avatar'
import { Icone } from './Icones'
import { Logo } from './Logo'
import { ModaleVisio } from './ModaleVisio'
import './EnTete.css'

type Props = {
  onOuvrirRecherche: () => void
  onOuvrirMenu: () => void
  menuOuvert: boolean
}

export function EnTete({ onOuvrirRecherche, onOuvrirMenu, menuOuvert }: Props) {
  const [profilOuvert, setProfilOuvert] = useState(false)
  const [visioOuverte, setVisioOuverte] = useState(false)
  const zoneProfil = useRef<HTMLDivElement>(null)
  const { notifier } = useNotifications()
  const { profil } = useDonnees()
  const nomComplet = [profil.prenom, profil.nom].filter(Boolean).join(' ') || 'Compte'

  useClicExterieur(zoneProfil, profilOuvert, () => setProfilOuvert(false))
  useEchap(profilOuvert, () => setProfilOuvert(false))

  return (
    <header className="entete" data-ref="entete">
      <div className="entete__mobile">
        <button
          className="entete__bouton-icone entete__menu"
          type="button"
          onClick={onOuvrirMenu}
          aria-label="Open menu"
          aria-expanded={menuOuvert}
          aria-controls="navigation-principale"
        >
          <Icone nom="menu" taille={21} />
        </button>
        <Logo />
      </div>

      <div className="entete__actions">
        <button
          className="entete__recherche"
          type="button"
          onClick={onOuvrirRecherche}
          aria-label="Search groups, students, materials and messages"
          aria-keyshortcuts="Control+K Meta+K"
          data-ref="recherche"
        >
          <Icone nom="search" taille={20} />
          <span className="entete__recherche-texte">Search</span>
          <kbd className="entete__raccourci" aria-hidden="true">
            ⌘K
          </kbd>
        </button>

        <button
          className="entete__bouton-icone entete__visio"
          type="button"
          onClick={() => setVisioOuverte(true)}
          aria-label="Start a live class"
          title="Start a live class"
        >
          <Icone nom="video" taille={24} />
        </button>

        <div className="entete__profil" ref={zoneProfil}>
          <button
            className="entete__avatar"
            type="button"
            onClick={() => setProfilOuvert(ouvert => !ouvert)}
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={profilOuvert}
          >
            <Avatar src={profil.avatar} nom={nomComplet} taille={38} />
          </button>

          {profilOuvert && (
            <div className="menu-profil" role="menu" aria-label="Profile">
              <div className="menu-profil__entete">
                <Avatar src={profil.avatar} nom={nomComplet} taille={42} />
                <div className="menu-profil__identite">
                  <strong>{nomComplet}</strong>
                  {profil.email && <span>{profil.email}</span>}
                </div>
              </div>
              <div className="menu-profil__separateur" />
              <Link className="menu-profil__lien" to="/settings" role="menuitem" onClick={() => setProfilOuvert(false)}>
                <Icone nom="settings" taille={18} /> Settings
              </Link>
              <button
                className="menu-profil__lien"
                type="button"
                role="menuitem"
                onClick={() => {
                  setProfilOuvert(false)
                  notifier({
                    titre: 'Demo account',
                    description: 'Signing out is disabled — there is no authentication in this clone.',
                    ton: 'info',
                  })
                }}
              >
                <Icone nom="logout" taille={18} /> Sign out
              </button>
              <p className="menu-profil__note">Local demo — no account, no password.</p>
            </div>
          )}
        </div>
      </div>

      <ModaleVisio ouverte={visioOuverte} onFermer={() => setVisioOuverte(false)} />
    </header>
  )
}
