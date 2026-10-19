import { useEffect, type RefObject } from 'react'

/** Déclenche une action quand le pointeur se pose hors de la zone. */
export function useClicExterieur(
  ref: RefObject<HTMLElement | null>,
  actif: boolean,
  action: () => void,
): void {
  useEffect(() => {
    if (!actif) return
    const surPointeur = (evenement: PointerEvent) => {
      if (ref.current && !ref.current.contains(evenement.target as Node)) action()
    }
    document.addEventListener('pointerdown', surPointeur)
    return () => document.removeEventListener('pointerdown', surPointeur)
  }, [ref, actif, action])
}
