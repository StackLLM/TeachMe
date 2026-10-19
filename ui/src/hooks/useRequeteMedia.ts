import { useEffect, useState } from 'react'

/** Suit une requête média. Les points de rupture vivent dans tokens.css. */
export function useRequeteMedia(requete: string): boolean {
  const [correspond, setCorrespond] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(requete).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia(requete)
    const surChangement = () => setCorrespond(media.matches)
    surChangement()
    if (media.addEventListener) {
      media.addEventListener('change', surChangement)
      return () => media.removeEventListener('change', surChangement)
    }
    media.addListener(surChangement)
    return () => media.removeListener(surChangement)
  }, [requete])

  return correspond
}
