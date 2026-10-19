/** cloneme: C-16, A-08 — recherche globale et navigation clavier. */

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { cx } from '../lib/classes'
import { useDonnees } from '../state/Donnees'
import { useEchap } from '../hooks/useEchap'
import { usePiegeFocus } from '../hooks/usePiegeFocus'
import { useVerrouDefilement } from '../hooks/useVerrouDefilement'
import { Icone, type NomIcone } from './Icones'
import './PaletteRecherche.css'

type Props = {
  ouverte: boolean
  onFermer: () => void
}

type Resultat = {
  id: string
  categorie: 'Pages' | 'Groups' | 'Students' | 'Materials' | 'Messages'
  titre: string
  sousTitre: string
  to: string
  icone: NomIcone
}

const PAGES: Resultat[] = [
  { id: 'pa-01', categorie: 'Pages', titre: 'My course', sousTitre: 'Groups, schedule and reminders', to: '/', icone: 'course' },
  { id: 'pa-02', categorie: 'Pages', titre: 'Materials', sousTitre: 'Slides, worksheets, videos and exams', to: '/materials', icone: 'materials' },
  { id: 'pa-03', categorie: 'Pages', titre: 'Students', sousTitre: 'Attendance and recent activity', to: '/students', icone: 'students' },
  { id: 'pa-04', categorie: 'Pages', titre: 'Reviews', sousTitre: 'Submissions waiting for you', to: '/reviews', icone: 'reviews' },
  { id: 'pa-05', categorie: 'Pages', titre: 'Messages', sousTitre: 'Conversations with students', to: '/messages', icone: 'messages' },
  { id: 'pa-06', categorie: 'Pages', titre: 'Settings', sousTitre: 'Profile, notifications and motion', to: '/settings', icone: 'settings' },
]

export function PaletteRecherche({ ouverte, onFermer }: Props) {
  const { groupes, eleves, materiaux, conversations } = useDonnees()
  const navigate = useNavigate()
  const [requete, setRequete] = useState('')
  const [actif, setActif] = useState(0)
  const panneau = useRef<HTMLDivElement>(null)
  const champ = useRef<HTMLInputElement>(null)

  useEchap(ouverte, onFermer)
  useVerrouDefilement(ouverte)
  usePiegeFocus(panneau, ouverte)

  useEffect(() => {
    if (!ouverte) return
    setRequete('')
    setActif(0)
    const minuterie = window.setTimeout(() => champ.current?.focus(), 30)
    return () => window.clearTimeout(minuterie)
  }, [ouverte])

  const tous = useMemo<Resultat[]>(
    () => [
      ...PAGES,
      ...groupes.map(groupe => ({
        id: `gr-${groupe.id}`,
        categorie: 'Groups' as const,
        titre: `${groupe.code} (${groupe.cours})`,
        sousTitre: `Lecture ${groupe.prochaineSeance} · ${groupe.date} · ${groupe.heure}`,
        to: `/groups/${groupe.id}`,
        icone: 'course' as const,
      })),
      ...eleves.map(eleve => ({
        id: `el-${eleve.id}`,
        categorie: 'Students' as const,
        titre: `${eleve.prenom} ${eleve.nom}`,
        sousTitre: `${groupes.find(groupe => groupe.id === eleve.groupeId)?.code ?? 'Group'} · ${eleve.assiduite}% attendance`,
        to: `/students?eleve=${eleve.id}`,
        icone: 'students' as const,
      })),
      ...materiaux.map(materiau => ({
        id: `ma-${materiau.id}`,
        categorie: 'Materials' as const,
        titre: materiau.titre,
        sousTitre: `${materiau.date} · ${materiau.poids}`,
        to: `/materials?materiau=${materiau.id}`,
        icone: 'file' as const,
      })),
      ...conversations.map(fil => {
        const eleve = eleves.find(item => item.id === fil.eleveId)
        return {
          id: `cv-${fil.id}`,
          categorie: 'Messages' as const,
          titre: fil.sujet,
          sousTitre: `${eleve?.prenom ?? 'Student'} ${eleve?.nom ?? ''}`.trim(),
          to: `/messages?fil=${fil.id}`,
          icone: 'messages' as const,
        }
      }),
    ],
    [groupes, eleves, materiaux, conversations],
  )

  const resultats = useMemo<Resultat[]>(() => {
    const propre = requete.trim().toLowerCase()
    if (!propre) return tous.slice(0, 9)
    return tous
      .filter(resultat => `${resultat.titre} ${resultat.sousTitre} ${resultat.categorie}`.toLowerCase().includes(propre))
      .slice(0, 12)
  }, [requete, tous])

  useEffect(() => {
    setActif(0)
  }, [requete])

  useEffect(() => {
    if (actif >= resultats.length) setActif(Math.max(0, resultats.length - 1))
  }, [actif, resultats.length])

  function ouvrir(resultat: Resultat) {
    navigate(resultat.to)
    onFermer()
  }

  function surTouche(evenement: KeyboardEvent<HTMLInputElement>) {
    if (evenement.key === 'ArrowDown') {
      evenement.preventDefault()
      setActif(index => (resultats.length ? (index + 1) % resultats.length : 0))
    } else if (evenement.key === 'ArrowUp') {
      evenement.preventDefault()
      setActif(index => (resultats.length ? (index - 1 + resultats.length) % resultats.length : 0))
    } else if (evenement.key === 'Enter') {
      evenement.preventDefault()
      const resultat = resultats[actif]
      if (resultat) ouvrir(resultat)
    }
  }

  if (!ouverte) return null

  let categoriePrecedente = ''

  return createPortal(
    <div
      className="palette-voile voile-entree"
      onMouseDown={evenement => {
        if (evenement.target === evenement.currentTarget) onFermer()
      }}
    >
      <div
        className="palette palette-entree"
        ref={panneau}
        role="dialog"
        aria-modal="true"
        aria-label="Search eLarium"
        tabIndex={-1}
      >
        <div className="palette__champ">
          <Icone nom="search" taille={21} className="palette__loupe" />
          <input
            ref={champ}
            value={requete}
            onChange={evenement => setRequete(evenement.target.value)}
            onKeyDown={surTouche}
            className="palette__saisie"
            placeholder="Search groups, students, materials, messages…"
            aria-label="Search"
            role="combobox"
            aria-expanded={resultats.length > 0}
            aria-controls="resultats-recherche"
            aria-autocomplete="list"
            aria-activedescendant={resultats[actif] ? `resultat-${resultats[actif].id}` : undefined}
          />
          <button className="palette__fermer" type="button" onClick={onFermer} aria-label="Close search">
            <Icone nom="close" taille={17} />
          </button>
        </div>

        <div className="palette__resultats" id="resultats-recherche" role="listbox" aria-label="Results">
          {resultats.length === 0 ? (
            <div className="palette__vide">
              <span className="palette__vide-icone">
                <Icone nom="search" taille={22} />
              </span>
              <p>No result for “{requete}”.</p>
              <small>Try a group code, a student name or a material title.</small>
            </div>
          ) : (
            resultats.map((resultat, index) => {
              const afficherCategorie = resultat.categorie !== categoriePrecedente
              categoriePrecedente = resultat.categorie
              return (
                <div key={resultat.id}>
                  {afficherCategorie && <p className="palette__categorie">{resultat.categorie}</p>}
                  <button
                    id={`resultat-${resultat.id}`}
                    type="button"
                    role="option"
                    aria-selected={index === actif}
                    className={cx('palette__resultat', 'resultat-entree', index === actif && 'palette__resultat--actif')}
                    style={{ '--resultat-delai': `${Math.min(index, 8) * 25}ms` } as CSSProperties}
                    onMouseEnter={() => setActif(index)}
                    onClick={() => ouvrir(resultat)}
                  >
                    <span className="palette__resultat-icone">
                      <Icone nom={resultat.icone} taille={18} />
                    </span>
                    <span className="palette__resultat-texte">
                      <strong>{resultat.titre}</strong>
                      <small>{resultat.sousTitre}</small>
                    </span>
                    <span className="palette__entree" aria-hidden="true">
                      ↵
                    </span>
                  </button>
                </div>
              )
            })
          )}
        </div>

        <footer className="palette__pied">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to open
          </span>
          <span>
            <kbd>esc</kbd> to close
          </span>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
