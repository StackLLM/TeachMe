/** cloneme: C-07, C-08, C-09, A-05 — planning du jour et mini-calendrier. */

import { useRef, useState } from 'react'
import { JOURS_SEMAINE } from '../lib/calendrier'
import { useDonnees } from '../state/Donnees'
import { useClicExterieur } from '../hooks/useClicExterieur'
import { useEchap } from '../hooks/useEchap'
import { CarteEvenement } from './CarteEvenement'
import { Icone } from './Icones'
import { ModaleVisio } from './ModaleVisio'
import { SelecteurJour } from './SelecteurJour'
import type { Evenement } from '../lib/types'
import './PanneauPlanning.css'

const JOURS_DISPONIBLES = [16, 17, 18, 19, 20]
const JOURS_SEMAINE_COURT = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const TOUS_LES_JOURS = Array.from({ length: 30 }, (_, index) => index + 1)

export function PanneauPlanning() {
  const { evenements } = useDonnees()
  const [jour, setJour] = useState(17)
  const [calendrierOuvert, setCalendrierOuvert] = useState(false)
  const [seanceChoisie, setSeanceChoisie] = useState<Evenement | null>(null)
  const zoneCalendrier = useRef<HTMLDivElement>(null)

  useClicExterieur(zoneCalendrier, calendrierOuvert, () => setCalendrierOuvert(false))
  useEchap(calendrierOuvert, () => setCalendrierOuvert(false))

  const evenementsDuJour = evenements.filter(evenement => evenement.jour === jour)
  const dateCourante = `${jour} June, 2020`

  function choisirJour(nouveau: number) {
    setJour(nouveau)
    setCalendrierOuvert(false)
  }

  return (
    <section className="panneau-planning" aria-labelledby="titre-planning">
      <header className="planning__entete">
        <h2 className="titre-section" id="titre-planning">
          Schedule
        </h2>
        <div className="planning__date-ligne" ref={zoneCalendrier}>
          <p className="planning__date" aria-live="polite">
            {dateCourante}
          </p>
          <button
            className="planning__calendrier"
            type="button"
            onClick={() => setCalendrierOuvert(ouvert => !ouvert)}
            aria-label="Choose a date"
            aria-expanded={calendrierOuvert}
          >
            <Icone nom="calendar" taille={19} />
          </button>

          {calendrierOuvert && (
            <div className="mini-calendrier" role="dialog" aria-label="June 2020">
              <div className="mini-calendrier__entete">
                <strong>June 2020</strong>
                <button
                  type="button"
                  className="mini-calendrier__fermer"
                  onClick={() => setCalendrierOuvert(false)}
                  aria-label="Close calendar"
                >
                  <Icone nom="close" taille={14} />
                </button>
              </div>
              <div className="mini-calendrier__grille" role="grid">
                {JOURS_SEMAINE_COURT.map((libelle, index) => (
                  <span className="mini-calendrier__jour-semaine" key={`${libelle}-${index}`} aria-hidden="true">
                    {libelle}
                  </span>
                ))}
                {TOUS_LES_JOURS.map(numero => {
                  const disponible = JOURS_DISPONIBLES.includes(numero)
                  const actif = numero === jour
                  return (
                    <button
                      key={numero}
                      type="button"
                      className={[
                        'mini-calendrier__jour',
                        disponible && 'mini-calendrier__jour--plage',
                        actif && 'mini-calendrier__jour--actif',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={!disponible}
                      aria-pressed={actif}
                      aria-label={`${numero} June 2020${disponible ? '' : ' — not available in this demo'}`}
                      onClick={() => choisirJour(numero)}
                    >
                      {numero}
                    </button>
                  )
                })}
              </div>
              <p className="mini-calendrier__note">Only the week of 16–20 June is available in this demo.</p>
            </div>
          )}
        </div>
      </header>

      <SelecteurJour jours={JOURS_SEMAINE} valeur={jour} onChange={choisirJour} />

      <div className="planning__liste" key={jour}>
        {evenementsDuJour.length === 0 && (
          <p className="planning__vide">No lecture scheduled for this day.</p>
        )}
        {evenementsDuJour.map((evenement, index) => (
          <CarteEvenement
            key={evenement.id}
            evenement={evenement}
            index={index}
            onOuvrir={setSeanceChoisie}
          />
        ))}
      </div>

      <ModaleVisio
        ouverte={seanceChoisie !== null}
        onFermer={() => setSeanceChoisie(null)}
        groupeIdInitial={seanceChoisie?.groupeId}
        groupeLabel={
          seanceChoisie ? `${seanceChoisie.groupe} (Lecture ${seanceChoisie.seance})` : undefined
        }
        seance={seanceChoisie ? `${seanceChoisie.heure} · ${dateCourante}` : undefined}
      />
    </section>
  )
}
