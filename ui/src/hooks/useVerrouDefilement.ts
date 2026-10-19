import { useEffect } from 'react'

/** Empêche le défilement de l'arrière-plan tant qu'une couche est ouverte. */
export function useVerrouDefilement(actif: boolean): void {
  useEffect(() => {
    if (!actif) return
    const corps = document.body
    const avant = { overflow: corps.style.overflow, paddingRight: corps.style.paddingRight }
    const largeurBarre = window.innerWidth - document.documentElement.clientWidth
    corps.style.overflow = 'hidden'
    if (largeurBarre > 0) corps.style.paddingRight = `${largeurBarre}px`
    return () => {
      corps.style.overflow = avant.overflow
      corps.style.paddingRight = avant.paddingRight
    }
  }, [actif])
}
