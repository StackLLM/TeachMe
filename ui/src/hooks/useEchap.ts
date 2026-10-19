import { useEffect, useRef } from 'react'

/** Ferme une couche (modale, menu, tiroir) avec Échap. */
export function useEchap(actif: boolean, action: () => void): void {
  const actionRef = useRef(action)
  actionRef.current = action

  useEffect(() => {
    if (!actif) return
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key !== 'Escape') return
      evenement.stopPropagation()
      actionRef.current()
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [actif])
}
