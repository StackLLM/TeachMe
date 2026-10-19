/** cloneme: P-06 — réglages du profil, des notifications et des animations. */

import { useState } from 'react'
import { enregistrerReglages } from '../lib/api'
import type { Reglages } from '../lib/types'
import { useAnimations } from '../state/Animations'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Avatar } from '../composants/Avatar'
import { Bouton } from '../composants/Bouton'
import { Champ, Selection } from '../composants/Champ'
import { EntetePage } from '../composants/EntetePage'
import { Icone } from '../composants/Icones'
import { useTitrePage } from '../hooks/useTitrePage'
import './PageReglages.css'

function Interrupteur({
  actif,
  onChange,
  label,
  description,
}: {
  actif: boolean
  onChange: () => void
  label: string
  description: string
}) {
  return (
    <div className="interrupteur-ligne">
      <div className="interrupteur-ligne__texte">
        <p className="interrupteur-ligne__titre">{label}</p>
        <p className="interrupteur-ligne__description">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={actif}
        aria-label={label}
        className={['interrupteur', actif && 'interrupteur--actif'].filter(Boolean).join(' ')}
        onClick={onChange}
      >
        <span className="interrupteur__pastille" />
      </button>
    </div>
  )
}

export function PageReglages() {
  useTitrePage('Settings')
  const { reglages, appliquerReglages } = useDonnees()
  const { animationsReduites, basculerAnimations, preferenceSysteme } = useAnimations()
  const { notifier } = useNotifications()

  const [formulaire, setFormulaire] = useState<Reglages>(reglages)
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  function changer<K extends keyof Reglages>(champ: K, valeur: Reglages[K]) {
    setFormulaire(actuel => ({ ...actuel, [champ]: valeur }))
  }

  async function enregistrer() {
    setChargement(true)
    setErreur('')
    const finaux: Reglages = { ...formulaire, animationsReduites }
    try {
      await enregistrerReglages(finaux)
      appliquerReglages(finaux)
      notifier({
        titre: 'Settings saved locally (demo)',
        description: 'Nothing was sent to a server. The values stay in this tab.',
      })
    } catch (cause) {
      setErreur(cause instanceof Error ? cause.message : 'The settings could not be saved.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <section className="panneau-page page-reglages" aria-labelledby="titre-reglages">
      <EntetePage
        surtitre="Your space"
        titre="Settings"
        sousTitre="Profile, notifications and motion. In this clone everything is local."
      />

      <div className="reglages__grille">
        <form
          className="reglages__formulaire"
          onSubmit={evenement => {
            evenement.preventDefault()
            void enregistrer()
          }}
        >
          <section className="reglages__section" aria-labelledby="reglages-profil">
            <header className="reglages__section-entete">
              <h2 id="reglages-profil">Profile</h2>
              <p>How your name appears to students and co-teachers.</p>
            </header>
            <div className="reglages__grille-champs">
              <Champ
                label="Full name"
                value={formulaire.nom}
                onChange={evenement => changer('nom', evenement.target.value)}
              />
              <Champ
                label="Email"
                type="email"
                value={formulaire.email}
                onChange={evenement => changer('email', evenement.target.value)}
              />
              <Champ
                className="reglages__pleine"
                label="Role"
                value={formulaire.role}
                onChange={evenement => changer('role', evenement.target.value)}
              />
            </div>
          </section>

          <section className="reglages__section" aria-labelledby="reglages-preferences">
            <header className="reglages__section-entete">
              <h2 id="reglages-preferences">Preferences</h2>
              <p>Used for dates, reminders and the lecture schedule.</p>
            </header>
            <div className="reglages__grille-champs">
              <Selection
                label="Language"
                value={formulaire.langue}
                onChange={evenement => changer('langue', evenement.target.value)}
                options={[
                  { valeur: 'English (UK)', libelle: 'English (UK)' },
                  { valeur: 'English (US)', libelle: 'English (US)' },
                  { valeur: 'Français', libelle: 'Français' },
                ]}
              />
              <Selection
                label="Time zone"
                value={formulaire.fuseau}
                onChange={evenement => changer('fuseau', evenement.target.value)}
                options={[
                  { valeur: 'Africa/Casablanca (GMT+1)', libelle: 'Africa/Casablanca (GMT+1)' },
                  { valeur: 'Europe/Paris (GMT+2)', libelle: 'Europe/Paris (GMT+2)' },
                  { valeur: 'Europe/London (GMT+1)', libelle: 'Europe/London (GMT+1)' },
                  { valeur: 'America/New_York (GMT-4)', libelle: 'America/New_York (GMT-4)' },
                ]}
              />
            </div>
          </section>

          <section className="reglages__section" aria-labelledby="reglages-notifications">
            <header className="reglages__section-entete">
              <h2 id="reglages-notifications">Notifications</h2>
              <p>Choose what should reach you outside the app.</p>
            </header>
            <div className="reglages__interrupteurs">
              <Interrupteur
                actif={formulaire.notifications.rappels}
                onChange={() =>
                  changer('notifications', {
                    ...formulaire.notifications,
                    rappels: !formulaire.notifications.rappels,
                  })
                }
                label="Schedule reminders"
                description="A quiet nudge twenty minutes before each lecture."
              />
              <Interrupteur
                actif={formulaire.notifications.copies}
                onChange={() =>
                  changer('notifications', {
                    ...formulaire.notifications,
                    copies: !formulaire.notifications.copies,
                  })
                }
                label="New submissions"
                description="Tell me when a student hands in a copy."
              />
              <Interrupteur
                actif={formulaire.notifications.messages}
                onChange={() =>
                  changer('notifications', {
                    ...formulaire.notifications,
                    messages: !formulaire.notifications.messages,
                  })
                }
                label="Messages"
                description="Email me when a conversation receives a reply."
              />
            </div>
          </section>

          <section className="reglages__section" aria-labelledby="reglages-motion">
            <header className="reglages__section-entete">
              <h2 id="reglages-motion">Motion</h2>
              <p>Motion is already reduced when your system asks for it.</p>
            </header>
            <Interrupteur
              actif={animationsReduites}
              onChange={basculerAnimations}
              label="Reduce animations"
              description="Neutralise page transitions, modal springs and card lifts."
            />
            {preferenceSysteme && (
              <p className="reglages__avertissement">
                <Icone nom="alert" taille={14} />
                Your operating system asks for reduced motion, so transitions will stay minimal even if this is off.
              </p>
            )}
          </section>

          {erreur && (
            <p className="reglages__erreur" role="alert">
              <Icone nom="alert" taille={15} /> {erreur}
            </p>
          )}

          <footer className="reglages__pied">
            <p className="reglages__pied-note">Demo — no request leaves the browser.</p>
            <Bouton type="submit" chargement={chargement}>
              {chargement ? 'Saving…' : 'Save changes'}
            </Bouton>
          </footer>
        </form>

        <aside className="reglages__cote" aria-label="Account summary">
          <div className="reglages__profil">
            <Avatar nom={formulaire.nom || 'Compte'} taille={64} />
            <h2>{formulaire.nom || 'Your name'}</h2>
            <p>{formulaire.role}</p>
          </div>

          <dl className="reglages__resume">
            <div>
              <dt>Email</dt>
              <dd>{formulaire.email}</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>{formulaire.langue}</dd>
            </div>
            <div>
              <dt>Time zone</dt>
              <dd>{formulaire.fuseau}</dd>
            </div>
            <div>
              <dt>Motion</dt>
              <dd>{animationsReduites ? 'Reduced' : 'Full'}</dd>
            </div>
          </dl>

        </aside>
      </div>
    </section>
  )
}
