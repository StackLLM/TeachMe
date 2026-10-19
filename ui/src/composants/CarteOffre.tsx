/** cloneme: C-11 — carte d'offre + modale (démo, aucun paiement). */

import { useState } from 'react'
import { Bouton } from './Bouton'
import { Icone } from './Icones'
import { Modale } from './Modale'
import { useNotifications } from '../state/Notifications'
import './CarteOffre.css'

export function CarteOffre() {
  const [ouverte, setOuverte] = useState(false)
  const { notifier } = useNotifications()

  return (
    <>
      <button
        className="carte-offre"
        type="button"
        onClick={() => setOuverte(true)}
        aria-haspopup="dialog"
        data-ref="carte-offre"
      >
        <span className="carte-offre__formes" aria-hidden="true">
          <span className="carte-offre__rose" />
          <span className="carte-offre__point-corail" />
          <span className="carte-offre__point-sarcelle" />
          <span className="carte-offre__peche" />
          <span className="carte-offre__barre carte-offre__barre--sarcelle" />
          <span className="carte-offre__barre carte-offre__barre--corail" />
        </span>
        <span className="carte-offre__texte">
          Upgrade
          <br />
          your
          <br />
          schedule
        </span>
        <span className="carte-offre__fleche" aria-hidden="true">
          <Icone nom="arrow-right" taille={22} />
        </span>
      </button>

      <Modale
        ouverte={ouverte}
        onFermer={() => setOuverte(false)}
        titre="eLarium Plus"
        sousTitre="More room for a calmer teaching week."
        icone={<Icone nom="sparkle" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={() => setOuverte(false)}>
              Not now
            </Bouton>
            <Bouton
              onClick={() => {
                setOuverte(false)
                notifier({
                  titre: 'Demo — billing is not connected',
                  description: 'The Plus plan cannot be activated in this clone.',
                  ton: 'info',
                })
              }}
            >
              Try Plus (demo)
            </Bouton>
          </>
        }
      >
        <ul className="offre__liste">
          <li>
            <Icone nom="check" taille={16} /> Unlimited groups, materials and reminders
          </li>
          <li>
            <Icone nom="check" taille={16} /> Weekly schedule suggestions based on your lectures
          </li>
          <li>
            <Icone nom="check" taille={16} /> Shared libraries with co-teachers
          </li>
          <li>
            <Icone nom="check" taille={16} /> Priority support on weekday mornings
          </li>
        </ul>
        <p className="offre__prix">
          €8 <span>/ month, billed yearly</span>
        </p>
        <p className="offre__note">
          This is a demonstration. No account is created and no payment is requested.
        </p>
      </Modale>
    </>
  )
}
