/** cloneme: C-10, A-06 — liste des rappels, retrait et annulation. */

import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { CarteRappel } from './CarteRappel'
import { EtatVide } from './EtatVide'
import './ListeRappels.css'

export function ListeRappels() {
  const { rappels, retirerRappel, restaurerRappel } = useDonnees()
  const { notifier } = useNotifications()

  function retirer(id: string) {
    const retrait = retirerRappel(id)
    if (!retrait) return
    const { rappel, index } = retrait
    notifier({
      titre: `“${rappel.titre}” dismissed`,
      description: 'Demo only — the reminder stays in this tab until the toast closes.',
      ton: 'info',
      action: {
        libelle: 'Undo',
        executer: () => restaurerRappel(rappel, index),
      },
    })
  }

  return (
    <section className="liste-rappels" aria-labelledby="titre-rappels">
      <h2 className="titre-section liste-rappels__titre" id="titre-rappels">
        Reminder
      </h2>

      {rappels.length > 0 ? (
        <ul className="liste-rappels__liste">
          {rappels.map(rappel => (
            <CarteRappel key={rappel.id} rappel={rappel} onRetirer={retirer} />
          ))}
        </ul>
      ) : (
        <EtatVide
          titre="All caught up"
          texte="Every reminder is done. New ones will appear here when you create a lecture."
          icone="check"
        />
      )}
    </section>
  )
}
