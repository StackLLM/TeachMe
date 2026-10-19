/** cloneme: P-07 — détail d'un groupe : séances, présence, classe. */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { planifierSeance } from '../lib/api'
import { seancesDuGroupe } from '../lib/seances'
import type { LectureGroupe } from '../lib/types'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Avatar } from '../composants/Avatar'
import { Bouton } from '../composants/Bouton'
import { Champ } from '../composants/Champ'
import { Icone } from '../composants/Icones'
import { Modale } from '../composants/Modale'
import { ModaleVisio } from '../composants/ModaleVisio'
import { Pastille } from '../composants/Pastille'
import { useTitrePage } from '../hooks/useTitrePage'
import { Page404 } from './Page404'
import './PageGroupe.css'

export function PageGroupe() {
  const { id } = useParams()
  const { groupeParId, eleves, conversations } = useDonnees()
  const groupe = id ? groupeParId(id) : undefined
  useTitrePage(groupe ? `${groupe.code} · ${groupe.cours}` : 'Group')

  const [seances, setSeances] = useState<LectureGroupe[]>([])
  const [visioOuverte, setVisioOuverte] = useState(false)
  const [ajoutOuvert, setAjoutOuvert] = useState(false)
  const [date, setDate] = useState('')
  const [heure, setHeure] = useState('11:00 am')
  const [erreurs, setErreurs] = useState<{ date?: string; heure?: string }>({})
  const [chargement, setChargement] = useState(false)
  const { notifier } = useNotifications()

  useEffect(() => {
    if (groupe) {
      setSeances(seancesDuGroupe(groupe))
      setDate('')
      setHeure(groupe.heure)
    }
  }, [groupe])

  if (!groupe) return <Page404 />

  const membres = eleves.filter(eleve => eleve.groupeId === groupe.id)
  const seancesTerminees = seances.filter(seance => seance.statut === 'termine')
  const assiduite = seancesTerminees.length
    ? Math.round(
        (seancesTerminees.reduce((total, seance) => total + seance.presence, 0) /
          (seancesTerminees.length * groupe.effectif)) *
          100,
      )
    : 0
  const prochaine = seances.find(seance => seance.statut === 'a-venir')
  const salle = groupe.salle ? ` · ${groupe.salle}` : ''

  async function ajouterSeance() {
    const prochaines: { date?: string; heure?: string } = {}
    if (!date.trim()) prochaines.date = 'Add a date.'
    if (!heure.trim()) prochaines.heure = 'Add a time.'
    setErreurs(prochaines)
    if (Object.keys(prochaines).length > 0) return

    setChargement(true)
    try {
      await planifierSeance({ groupeId: groupe!.id, date, heure })
      const numero = Math.max(0, ...seances.map(seance => seance.numero)) + 1
      setSeances(actuelles => [
        ...actuelles,
        {
          id: `${groupe!.id}-le-${numero}`,
          numero,
          date,
          heure,
          statut: 'a-venir',
          presence: 0,
          effectif: groupe!.effectif,
        },
      ])
      setAjoutOuvert(false)
      notifier({
        titre: 'Lecture scheduled locally (demo)',
        description: `${date} at ${heure} — nothing was sent to a server.`,
      })
    } catch (cause) {
      notifier({
        titre: 'The lecture could not be scheduled',
        description: cause instanceof Error ? cause.message : 'Unknown error.',
        ton: 'erreur',
      })
    } finally {
      setChargement(false)
    }
  }

  return (
    <section className="panneau-page page-groupe" aria-labelledby="titre-groupe">
      <Link className="page-groupe__retour" to="/">
        <Icone nom="arrow-left" taille={16} /> All groups
      </Link>

      <header className="page-groupe__entete">
        <div className="page-groupe__identite">
          <p className="page-groupe__surtitre">Group</p>
          <h1 className="page-groupe__titre" id="titre-groupe">
            {groupe.code} <span>({groupe.cours})</span>
          </h1>
          <p className="page-groupe__sous-titre">
            {prochaine
              ? `Next lecture ${prochaine.date} at ${prochaine.heure}${salle}`
              : `Next lecture ${groupe.date} at ${groupe.heure}${salle}`}
          </p>
        </div>
        <div className="page-groupe__actions">
          <Bouton
            variante="fantome"
            onClick={() => setAjoutOuvert(true)}
            iconeGauche={<Icone nom="plus" taille={16} />}
          >
            Add lecture
          </Bouton>
          <Bouton
            onClick={() => setVisioOuverte(true)}
            iconeGauche={<Icone nom="video" taille={17} />}
          >
            Start live class
          </Bouton>
        </div>
      </header>

      <div className="page-groupe__stats">
        <div className="stat">
          <span className="stat__icone">
            <Icone nom="users" taille={19} />
          </span>
          <div>
            <p className="stat__valeur">{groupe.effectif}</p>
            <p className="stat__libelle">students</p>
          </div>
        </div>
        <div className="stat">
          <span className="stat__icone">
            <Icone nom="check" taille={19} />
          </span>
          <div>
            <p className="stat__valeur">{assiduite}%</p>
            <p className="stat__libelle">average attendance</p>
          </div>
        </div>
        <div className="stat">
          <span className="stat__icone">
            <Icone nom="calendar" taille={19} />
          </span>
          <div>
            <p className="stat__valeur">#{groupe.prochaineSeance}</p>
            <p className="stat__libelle">next lecture</p>
          </div>
        </div>
      </div>

      <div className="page-groupe__contenu">
        <section className="carte-panneau" aria-labelledby="titre-seances">
          <header className="carte-panneau__entete">
            <h2 id="titre-seances">Lectures</h2>
            <span>{seances.length} recent</span>
          </header>
          <ul className="liste-seances">
            {seances.map(seance => (
              <li className="seance" key={seance.id}>
                <span className="seance__numero">{seance.numero}</span>
                <div className="seance__infos">
                  <strong>{seance.date}</strong>
                  <span>
                    {seance.heure}
                    {salle}
                  </span>
                </div>
                {seance.statut === 'termine' ? (
                  <div className="seance__presence">
                    <span className="seance__barre">
                      <span
                        className="seance__barre-remplie"
                        style={{ width: `${Math.round((seance.presence / seance.effectif) * 100)}%` }}
                      />
                    </span>
                    <span className="seance__presence-texte">
                      {seance.presence}/{seance.effectif}
                    </span>
                  </div>
                ) : (
                  <span className="seance__presence-vide">—</span>
                )}
                <Pastille teinte={seance.statut === 'a-venir' ? 'peche' : 'neutre'}>
                  {seance.statut === 'a-venir' ? 'Next' : 'Done'}
                </Pastille>
              </li>
            ))}
          </ul>
        </section>

        <aside className="carte-panneau" aria-labelledby="titre-classe">
          <header className="carte-panneau__entete">
            <h2 id="titre-classe">Students</h2>
            <span>{groupe.effectif} enrolled</span>
          </header>
          <ul className="liste-classe">
            {membres.map(eleve => {
              const conversation = conversations.find(fil => fil.eleveId === eleve.id)
              return (
                <li className="membre" key={eleve.id}>
                  <Avatar src={eleve.avatar} nom={`${eleve.prenom} ${eleve.nom}`} taille={38} />
                  <div className="membre__texte">
                    <strong>
                      {eleve.prenom} {eleve.nom}
                    </strong>
                    <span>{eleve.assiduite}% attendance</span>
                  </div>
                  {conversation && (
                    <Link className="membre__lien" to={`/messages?fil=${conversation.id}`}>
                      Message
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="liste-classe__note">
            Showing {membres.length} of {groupe.effectif} students — the demo roster is partial.
          </p>
        </aside>
      </div>

      <ModaleVisio
        ouverte={visioOuverte}
        onFermer={() => setVisioOuverte(false)}
        groupeIdInitial={groupe.id}
        seance={prochaine ? `Lecture ${prochaine.numero} · ${prochaine.date} at ${prochaine.heure}` : undefined}
      />

      <Modale
        ouverte={ajoutOuvert}
        onFermer={() => setAjoutOuvert(false)}
        titre="Add a lecture"
        sousTitre={`Scheduled for ${groupe.code} · ${groupe.cours}.`}
        icone={<Icone nom="calendar" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={() => setAjoutOuvert(false)}>
              Cancel
            </Bouton>
            <Bouton onClick={ajouterSeance} chargement={chargement}>
              {chargement ? 'Adding…' : 'Add lecture'}
            </Bouton>
          </>
        }
      >
        <div className="page-groupe__formulaire">
          <Champ
            label="Date"
            value={date}
            onChange={evenement => setDate(evenement.target.value)}
            erreur={erreurs.date}
            requis
          />
          <Champ
            label="Time"
            value={heure}
            onChange={evenement => setHeure(evenement.target.value)}
            erreur={erreurs.heure}
            requis
          />
          <p className="page-groupe__note">
            Demo: the lecture is appended to this page only and disappears on reload.
          </p>
        </div>
      </Modale>
    </section>
  )
}
