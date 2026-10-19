/** cloneme: P-02 — bibliothèque de supports. */

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { deposerMateriau } from '../lib/api'
import type { Materiau, TypeMateriau } from '../lib/types'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Bouton } from '../composants/Bouton'
import { CarteMateriau } from '../composants/CarteMateriau'
import { Champ, Selection } from '../composants/Champ'
import { EntetePage } from '../composants/EntetePage'
import { EtatVide } from '../composants/EtatVide'
import { Icone } from '../composants/Icones'
import { Modale } from '../composants/Modale'
import { useTitrePage } from '../hooks/useTitrePage'
import './PageMateriaux.css'

type Filtre = 'tous' | TypeMateriau

const FILTRES: Array<{ id: Filtre; libelle: string }> = [
  { id: 'tous', libelle: 'All' },
  { id: 'slides', libelle: 'Slides' },
  { id: 'fiche', libelle: 'Worksheets' },
  { id: 'video', libelle: 'Video' },
  { id: 'examen', libelle: 'Exams' },
]

const TYPES: Array<{ valeur: TypeMateriau; libelle: string }> = [
  { valeur: 'slides', libelle: 'Slides' },
  { valeur: 'fiche', libelle: 'Worksheet' },
  { valeur: 'video', libelle: 'Video' },
  { valeur: 'examen', libelle: 'Exam' },
]

export function PageMateriaux() {
  useTitrePage('Materials')
  const { materiaux, groupes, groupeParId, ajouterMateriau } = useDonnees()
  const { notifier } = useNotifications()
  const [params, setParams] = useSearchParams()
  const paramMateriau = params.get('materiau')

  const [filtre, setFiltre] = useState<Filtre>('tous')
  const [requete, setRequete] = useState('')
  const [selection, setSelection] = useState<string | null>(paramMateriau)
  const [ajoutOuvert, setAjoutOuvert] = useState(false)
  const [titre, setTitre] = useState('')
  const [type, setType] = useState<TypeMateriau>('slides')
  const [groupeId, setGroupeId] = useState(groupes[0]?.id ?? '')
  const [erreurs, setErreurs] = useState<{ titre?: string }>({})
  const [chargement, setChargement] = useState(false)

  useEffect(() => {
    setSelection(paramMateriau)
  }, [paramMateriau])

  const filtres = useMemo(
    () =>
      FILTRES.map(item => ({
        ...item,
        nombre:
          item.id === 'tous'
            ? materiaux.length
            : materiaux.filter(materiau => materiau.type === item.id).length,
      })),
    [materiaux],
  )

  const resultats = materiaux.filter(materiau => {
    const bonType = filtre === 'tous' || materiau.type === filtre
    const texte = `${materiau.titre} ${materiau.description} ${groupeParId(materiau.groupeId)?.code ?? ''}`.toLowerCase()
    const bonneRecherche = !requete.trim() || texte.includes(requete.trim().toLowerCase())
    return bonType && bonneRecherche
  })

  const materiauOuvert = selection ? materiaux.find(materiau => materiau.id === selection) : undefined

  function ouvrir(materiau: Materiau) {
    setSelection(materiau.id)
    const suivant = new URLSearchParams(params)
    suivant.set('materiau', materiau.id)
    setParams(suivant, { replace: true })
  }

  function fermerApercu() {
    setSelection(null)
    if (paramMateriau) {
      const suivant = new URLSearchParams(params)
      suivant.delete('materiau')
      setParams(suivant, { replace: true })
    }
  }

  function reinitialiser() {
    setFiltre('tous')
    setRequete('')
  }

  async function ajouter() {
    if (!titre.trim()) {
      setErreurs({ titre: 'Give the material a title.' })
      return
    }
    setErreurs({})
    setChargement(true)
    try {
      await deposerMateriau({ titre, type, groupeId })
      const materiau = ajouterMateriau({ titre, type, groupeId })
      setAjoutOuvert(false)
      setTitre('')
      notifier({
        titre: 'Material added locally (demo)',
        description: `${materiau.titre} — no file was uploaded.`,
      })
    } catch (cause) {
      notifier({
        titre: 'The material could not be added',
        description: cause instanceof Error ? cause.message : 'Unknown error.',
        ton: 'erreur',
      })
    } finally {
      setChargement(false)
    }
  }

  return (
    <section className="panneau-page page-materiaux" aria-labelledby="titre-materiaux">
      <EntetePage
        surtitre="Library"
        titre="Materials"
        sousTitre="Every deck, worksheet, recording and exam shared with your groups."
        actions={
          <Bouton onClick={() => setAjoutOuvert(true)} iconeGauche={<Icone nom="plus" taille={16} />}>
            Add material
          </Bouton>
        }
      />

      <div className="materiaux__barre">
        <div className="recherche-locale">
          <Icone nom="search" taille={18} />
          <input
            value={requete}
            onChange={evenement => setRequete(evenement.target.value)}
            placeholder="Search the library"
            aria-label="Search materials"
          />
          {requete && (
            <button type="button" onClick={() => setRequete('')} aria-label="Clear search">
              <Icone nom="close" taille={14} />
            </button>
          )}
        </div>

        <div className="filtres" role="group" aria-label="Filter by type">
          {filtres.map(item => (
            <button
              key={item.id}
              type="button"
              className={['filtre', filtre === item.id && 'filtre--actif'].filter(Boolean).join(' ')}
              onClick={() => setFiltre(item.id)}
              aria-pressed={filtre === item.id}
            >
              {item.libelle}
              <span className="filtre__nombre">{item.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {resultats.length > 0 ? (
        <div className="materiaux__grille">
          {resultats.map((materiau, index) => (
            <CarteMateriau
              key={materiau.id}
              materiau={materiau}
              groupe={groupeParId(materiau.groupeId)}
              index={index}
              onOuvrir={ouvrir}
            />
          ))}
        </div>
      ) : (
        <div className="materiaux__vide">
          <EtatVide
            titre="Nothing in this corner yet"
            texte="No material matches this search and filter. Clear both to see the whole library."
            icone="file"
            action={{ libelle: 'Clear filters', executer: reinitialiser }}
          />
        </div>
      )}

      <Modale
        ouverte={Boolean(materiauOuvert)}
        onFermer={fermerApercu}
        titre={materiauOuvert?.titre ?? 'Material'}
        sousTitre={
          materiauOuvert
            ? `${groupeParId(materiauOuvert.groupeId)?.code ?? 'Group'} · ${materiauOuvert.date} · ${materiauOuvert.poids}`
            : undefined
        }
        icone={<Icone nom="file" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={fermerApercu}>
              Close
            </Bouton>
            <Bouton
              onClick={() =>
                notifier({
                  titre: 'Demo file',
                  description: 'The original file is not included in this clone, so nothing was downloaded.',
                  ton: 'info',
                })
              }
              iconeGauche={<Icone nom="file" taille={16} />}
            >
              Download (demo)
            </Bouton>
          </>
        }
      >
        {materiauOuvert && (
          <div className="apercu-materiau">
            <div className={`apercu-materiau__vignette apercu-materiau__vignette--${materiauOuvert.type}`}>
              <Icone nom="file" taille={30} />
            </div>
            <p className="apercu-materiau__description">{materiauOuvert.description}</p>
            <dl className="apercu-materiau__details">
              <div>
                <dt>Group</dt>
                <dd>{groupeParId(materiauOuvert.groupeId)?.code ?? 'Unassigned'}</dd>
              </div>
              <div>
                <dt>Added</dt>
                <dd>{materiauOuvert.date}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{materiauOuvert.poids}</dd>
              </div>
            </dl>
            <p className="apercu-materiau__note">
              Demo record — the file itself is not part of the clone.
            </p>
          </div>
        )}
      </Modale>

      <Modale
        ouverte={ajoutOuvert}
        onFermer={() => setAjoutOuvert(false)}
        titre="Add material"
        sousTitre="A record is added locally; no file leaves your browser."
        icone={<Icone nom="file" taille={20} />}
        pied={
          <>
            <Bouton variante="fantome" onClick={() => setAjoutOuvert(false)}>
              Cancel
            </Bouton>
            <Bouton onClick={ajouter} chargement={chargement}>
              {chargement ? 'Adding…' : 'Add material'}
            </Bouton>
          </>
        }
      >
        <div className="materiaux__formulaire">
          <Champ
            label="Title"
            value={titre}
            onChange={evenement => setTitre(evenement.target.value)}
            placeholder="Segmentation — workshop deck"
            erreur={erreurs.titre}
            requis
            autoFocus
          />
          <Selection
            label="Type"
            value={type}
            onChange={evenement => setType(evenement.target.value as TypeMateriau)}
            options={TYPES}
          />
          <Selection
            label="Group"
            value={groupeId}
            onChange={evenement => setGroupeId(evenement.target.value)}
            options={groupes.map(groupe => ({
              valeur: groupe.id,
              libelle: `${groupe.code} · ${groupe.cours}`,
            }))}
          />
          <p className="materiaux__note">
            Demo: the record is added in memory and disappears when the page is reloaded.
          </p>
        </div>
      </Modale>
    </section>
  )
}
