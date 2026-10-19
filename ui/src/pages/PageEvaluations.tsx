/** cloneme: P-04 — copies à corriger et retour aux élèves. */

import { useState } from 'react'
import { enregistrerEvaluation as envoyerEvaluation } from '../lib/api'
import type { Evaluation } from '../lib/types'
import { useDonnees } from '../state/Donnees'
import { useNotifications } from '../state/Notifications'
import { Bouton } from '../composants/Bouton'
import { CarteEvaluation } from '../composants/CarteEvaluation'
import { Champ, ZoneTexte } from '../composants/Champ'
import { EntetePage } from '../composants/EntetePage'
import { EtatVide } from '../composants/EtatVide'
import { Icone } from '../composants/Icones'
import { Modale } from '../composants/Modale'
import { Pastille } from '../composants/Pastille'
import { useTitrePage } from '../hooks/useTitrePage'
import './PageEvaluations.css'

type Onglet = 'a-corriger' | 'corrigee'

export function PageEvaluations() {
  useTitrePage('Reviews')
  const { evaluations, eleveParId, groupeParId, enregistrerEvaluation } = useDonnees()
  const { notifier } = useNotifications()

  const [onglet, setOnglet] = useState<Onglet>('a-corriger')
  const [selectionId, setSelectionId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [commentaire, setCommentaire] = useState('')
  const [erreurNote, setErreurNote] = useState('')
  const [erreurGenerale, setErreurGenerale] = useState('')
  const [chargement, setChargement] = useState<'brouillon' | 'publication' | null>(null)

  const aCorriger = evaluations.filter(evaluation => evaluation.statut === 'a-corriger')
  const corrigees = evaluations.filter(evaluation => evaluation.statut === 'corrigee')
  const liste = onglet === 'a-corriger' ? aCorriger : corrigees
  const selection = selectionId ? evaluations.find(evaluation => evaluation.id === selectionId) : undefined
  const eleveSelection = selection ? eleveParId(selection.eleveId) : undefined
  const groupeSelection = selection ? groupeParId(selection.groupeId) : undefined

  function ouvrir(evaluation: Evaluation) {
    setSelectionId(evaluation.id)
    setNote(evaluation.note?.toString() ?? '')
    setCommentaire(evaluation.commentaire ?? '')
    setErreurNote('')
    setErreurGenerale('')
  }

  function fermer() {
    if (chargement) return
    setSelectionId(null)
  }

  async function enregistrer(publier: boolean) {
    if (!selection) return
    const nombre = Number(note.replace(',', '.'))
    if (!note.trim() || Number.isNaN(nombre) || nombre < 0 || nombre > 20) {
      setErreurNote('Enter a grade between 0 and 20.')
      return
    }
    setErreurNote('')
    setErreurGenerale('')
    setChargement(publier ? 'publication' : 'brouillon')
    try {
      await envoyerEvaluation({ id: selection.id, note: nombre, commentaire, publier })
      enregistrerEvaluation(selection.id, nombre, commentaire, publier)
      setSelectionId(null)
      notifier({
        titre: publier ? 'Feedback published (demo)' : 'Draft saved locally (demo)',
        description: publier
          ? 'The student would be notified by the backend. Nothing was sent.'
          : 'Stored in this tab only.',
        ton: publier ? 'succes' : 'info',
      })
    } catch (cause) {
      setErreurGenerale(cause instanceof Error ? cause.message : 'The review could not be saved.')
    } finally {
      setChargement(null)
    }
  }

  return (
    <section className="panneau-page page-evaluations" aria-labelledby="titre-evaluations">
      <EntetePage
        surtitre="Feedback"
        titre="Reviews"
        sousTitre="Read submissions, leave a grade and a short note. Everything stays local in this clone."
      />

      <div className="evaluations__onglets" role="tablist" aria-label="Review status">
        <button
          type="button"
          role="tab"
          aria-selected={onglet === 'a-corriger'}
          className={['evaluations__onglet', onglet === 'a-corriger' && 'evaluations__onglet--actif']
            .filter(Boolean)
            .join(' ')}
          onClick={() => setOnglet('a-corriger')}
        >
          To review
          <span className="evaluations__compteur">{aCorriger.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={onglet === 'corrigee'}
          className={['evaluations__onglet', onglet === 'corrigee' && 'evaluations__onglet--actif']
            .filter(Boolean)
            .join(' ')}
          onClick={() => setOnglet('corrigee')}
        >
          Reviewed
          <span className="evaluations__compteur">{corrigees.length}</span>
        </button>
      </div>

      {liste.length > 0 ? (
        <div className="evaluations__grille" role="tabpanel">
          {liste.map(evaluation => (
            <CarteEvaluation
              key={evaluation.id}
              evaluation={evaluation}
              eleve={eleveParId(evaluation.eleveId)}
              groupe={groupeParId(evaluation.groupeId)}
              onOuvrir={ouvrir}
            />
          ))}
        </div>
      ) : (
        <div className="evaluations__vide">
          <EtatVide
            titre={onglet === 'a-corriger' ? 'Nothing left to review' : 'No feedback yet'}
            texte={
              onglet === 'a-corriger'
                ? 'Every submission has been read. The reviewed tab keeps the feedback you already published.'
                : 'Publish feedback on a submission and it will appear here.'
            }
            icone="check"
            action={{
              libelle: onglet === 'a-corriger' ? 'See reviewed copies' : 'See copies to review',
              executer: () => setOnglet(onglet === 'a-corriger' ? 'corrigee' : 'a-corriger'),
            }}
          />
        </div>
      )}

      <Modale
        ouverte={Boolean(selection)}
        onFermer={fermer}
        taille="large"
        titre={selection?.titre ?? 'Review'}
        sousTitre={
          selection
            ? `${eleveSelection?.prenom ?? ''} ${eleveSelection?.nom ?? ''} · ${groupeSelection?.code ?? ''} · ${selection.date}`
            : undefined
        }
        icone={<Icone nom="reviews" taille={20} />}
        pied={
          <>
            <Bouton
              variante="fantome"
              onClick={() => enregistrer(false)}
              chargement={chargement === 'brouillon'}
              disabled={chargement !== null}
            >
              {chargement === 'brouillon' ? 'Saving…' : 'Save draft'}
            </Bouton>
            <Bouton
              onClick={() => enregistrer(true)}
              chargement={chargement === 'publication'}
              disabled={chargement !== null}
              iconeGauche={
                chargement === 'publication' ? undefined : <Icone nom="check" taille={16} />
              }
            >
              {chargement === 'publication' ? 'Publishing…' : 'Publish (demo)'}
            </Bouton>
          </>
        }
      >
        {selection && (
          <div className="evaluation">
            <div className="evaluation__meta">
              <Pastille teinte={selection.statut === 'corrigee' ? 'sarcelle' : 'corail'}>
                {selection.statut === 'corrigee' ? 'Reviewed' : 'Awaiting review'}
              </Pastille>
              {selection.note !== undefined && <span>Current grade: {selection.note}/20</span>}
            </div>

            <blockquote className="evaluation__copie">{selection.copie}</blockquote>

            <div className="evaluation__formulaire">
              <Champ
                label="Grade (out of 20)"
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={note}
                onChange={evenement => setNote(evenement.target.value)}
                erreur={erreurNote}
                placeholder="16"
                requis
              />
              <ZoneTexte
                label="Feedback"
                value={commentaire}
                onChange={evenement => setCommentaire(evenement.target.value)}
                placeholder="What worked, what to tighten before the final project…"
                aide="Visible to the student once published."
              />
            </div>

            {erreurGenerale && (
              <p className="evaluation__erreur" role="alert">
                <Icone nom="alert" taille={15} /> {erreurGenerale}
              </p>
            )}

            <p className="evaluation__note">
              Demo: the grade stays in this tab. Publishing does not notify the student.
            </p>
          </div>
        )}
      </Modale>
    </section>
  )
}
