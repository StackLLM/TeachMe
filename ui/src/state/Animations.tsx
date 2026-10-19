/**
 * cloneme: A-10 — préférence d'animations.
 *
 * Par défaut on suit `prefers-reduced-motion`. Une bascule manuelle (Réglages)
 * écrit un choix explicite et pose `data-animations` sur `<html>` ; le CSS
 * neutralise alors toutes les transitions. Le choix est conservé localement.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

const CLE = 'elarium:animations-reduites'

type ContexteAnimations = {
  animationsReduites: boolean
  definirAnimationsReduites: (valeur: boolean) => void
  basculerAnimations: () => void
  preferenceSysteme: boolean
}

const Contexte = createContext<ContexteAnimations | null>(null)

function lirePreferenceSysteme(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function lireChoix(): boolean | null {
  try {
    const brut = window.localStorage.getItem(CLE)
    if (brut === '1') return true
    if (brut === '0') return false
  } catch {
    /* stockage indisponible : on retombe sur le système */
  }
  return null
}

export function FournisseurAnimations({ children }: { children: ReactNode }) {
  const [preferenceSysteme, setPreferenceSysteme] = useState(lirePreferenceSysteme)
  const [choix, setChoix] = useState<boolean | null>(lireChoix)
  const choixRef = useRef(choix)
  choixRef.current = choix

  const animationsReduites = choix ?? preferenceSysteme

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const surChangement = () => {
      setPreferenceSysteme(media.matches)
      if (choixRef.current === null) {
        document.documentElement.dataset.animations = media.matches ? 'reduites' : 'actives'
      }
    }
    media.addEventListener?.('change', surChangement)
    return () => media.removeEventListener?.('change', surChangement)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.animations = animationsReduites ? 'reduites' : 'actives'
  }, [animationsReduites])

  const definirAnimationsReduites = useCallback((valeur: boolean) => {
    setChoix(valeur)
    try {
      window.localStorage.setItem(CLE, valeur ? '1' : '0')
    } catch {
      /* pas de persistance possible */
    }
  }, [])

  const basculerAnimations = useCallback(() => {
    setChoix(actuel => {
      const base = actuel ?? lirePreferenceSysteme()
      const suivant = !base
      try {
        window.localStorage.setItem(CLE, suivant ? '1' : '0')
      } catch {
        /* pas de persistance possible */
      }
      return suivant
    })
  }, [])

  const valeur = useMemo(
    () => ({ animationsReduites, definirAnimationsReduites, basculerAnimations, preferenceSysteme }),
    [animationsReduites, definirAnimationsReduites, basculerAnimations, preferenceSysteme],
  )

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>
}

export function useAnimations(): ContexteAnimations {
  const contexte = useContext(Contexte)
  if (!contexte) throw new Error('useAnimations doit être utilisé dans FournisseurAnimations')
  return contexte
}
