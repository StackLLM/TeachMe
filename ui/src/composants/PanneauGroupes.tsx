/** cloneme: C-06, C-14, A-07 — panneau Groups et création d'un groupe. */

import { useState } from 'react'
import { creerGroupe, type NouveauGroupe } from '../lib/api'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Bouton } from './Bouton'
import { CarteGroupe } from './CarteGroupe'
import { Champ } from './Champ'
import { Icone } from './Icones'
import { Modale } from './Modale'
import './PanneauGroupes.css'

const FORMULAIRE_VIDE: NouveauGroupe = {
  code: '',
  cours: '',
  date: '',
  heure: '',
}

type Erreurs = Partial<Record<keyof NouveauGroupe, string>>

export function PanneauGroupes() {
  const { groupes, ajouterGroupe } = useDonnees()
  const { notifier } = useNotifications()
  const [modaleOuverte, setModaleOuverte] = useState(false)
  const [formulaire, setFormulaire] = useState<NouveauGroupe>(FORMULAIRE_VIDE)
  const [erreurs, setErreurs] = useState<Erreurs>({})
  const [erreurGenerale, setErreurGenerale] = useState('')
  const [chargement, setChargement] = useState(false)
  const [dernierGroupe, setDernierGroupe] = useState<string | null>(null)

  function ouvrir() {
    setFormulaire(FORMULAIRE_VIDE)
    setErreurs({})
    setErreurGenerale('')
    setModaleOuverte(true)
  }

  function changer(champ: keyof NouveauGroupe, valeur: string) {
    setFormulaire(actuel => ({ ...actuel, [champ]: valeur }))
    setErreurs(actuelles => ({ ...actuelles, [champ]: undefined }))
  }

  async function envoyer() {
    const prochaines: Erreurs = {}
    if (!formulaire.code.trim()) prochaines.code = 'Give the group a code, for example “42 B”.'
    if (!formulaire.cours.trim()) prochaines.cours = 'Name the course this group follows.'
    if (!formulaire.date.trim()) prochaines.date = 'Add the next lecture date.'
    if (!formulaire.heure.trim()) prochaines.heure = 'Add the next lecture time.'
    setErreurs(prochaines)
    if (Object.keys(prochaines).length > 0) return

    setChargement(true)
    setErreurGenerale('')
    try {
      await creerGroupe(formulaire)
      const groupe = ajouterGroupe(formulaire)
      setDernierGroupe(groupe.id)
      setModaleOuverte(false)
      notifier({
        titre: 'Group created locally (demo)',
        description: `${groupe.code} · ${groupe.cours} — nothing was sent to a server.`,
        ton: 'succes',
      })
    } catch (cause) {
      setErreurGenerale(cause instanceof Error ? cause.message : 'The group could not be created.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <section className="panneau-groupes" aria-labelledby="titre-groupes">
      <h2 className="panneau-groupes__titre" id="titre-groupes">
        Groups
      </h2>

      {groupes.length === 0 ? (
        <p className="panneau-groupes__vide">
          No group yet. Create the first one to start planning lectures.
        </p>
      ) : (
        <ul className="panneau-groupes__liste">
          {groupes.map((groupe, index) => (
            <li key={groupe.id}>
              <CarteGroupe groupe={groupe} index={index} nouvelle={groupe.id === dernierGroupe} />
            </li>
          ))}
        </ul>
      )}

      <Bouton
        className="panneau-groupes__nouveau"
        taille="large"
        onClick={ouvrir}
        data-ref="bouton-nouveau-groupe"
      >
        New group
      </Bouton>

      <Modale
        ouverte={modaleOuverte}
        onFermer={() => setModaleOuverte(false)}
        titre="New group"
        sousTitre="Create a group and its first lecture. Stored in this tab only."
        icone={<Icone nom="course" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={() => setModaleOuverte(false)}>
              Cancel
            </Bouton>
            <Bouton
              onClick={envoyer}
              chargement={chargement}
              iconeGauche={chargement ? undefined : <Icone nom="plus" taille={16} />}
            >
              {chargement ? 'Creating…' : 'Create group'}
            </Bouton>
          </>
        }
      >
        <div className="modale-groupe">
          <div className="modale-groupe__grille">
            <Champ
              label="Group code"
              value={formulaire.code}
              onChange={evenement => changer('code', evenement.target.value)}
              placeholder="42 B"
              erreur={erreurs.code}
              requis
              autoFocus
            />
            <Champ
              label="Course"
              value={formulaire.cours}
              onChange={evenement => changer('cours', evenement.target.value)}
              placeholder="Course name"
              erreur={erreurs.cours}
              requis
            />
            <Champ
              label="Next lecture date"
              value={formulaire.date}
              onChange={evenement => changer('date', evenement.target.value)}
              erreur={erreurs.date}
              requis
            />
            <Champ
              label="Next lecture time"
              value={formulaire.heure}
              onChange={evenement => changer('heure', evenement.target.value)}
              erreur={erreurs.heure}
              requis
            />
          </div>
          {erreurGenerale && (
            <p className="modale-groupe__erreur" role="alert">
              <Icone nom="alert" taille={15} /> {erreurGenerale}
            </p>
          )}
          <p className="modale-groupe__note">
            Demo: the group is added to the in-memory list. It disappears when you reload the page.
          </p>
        </div>
      </Modale>
    </section>
  )
}
