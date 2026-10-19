import { useEffect, type RefObject } from 'react'

const SELECTEUR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Piège le focus dans une couche et le rend à l'élément d'origine à la fermeture. */
export function usePiegeFocus(ref: RefObject<HTMLElement | null>, actif: boolean): void {
  useEffect(() => {
    if (!actif || !ref.current) return
    const conteneur = ref.current
    const origine = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const elements = Array.from(conteneur.querySelectorAll<HTMLElement>(SELECTEUR)).filter(
      el => !el.hasAttribute('aria-hidden'),
    )
    const champ = conteneur.querySelector<HTMLElement>('[autofocus], input:not([type="hidden"]), textarea, select')
    const premier = champ ?? elements[0] ?? conteneur
    premier.focus({ preventScroll: true })

    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key !== 'Tab') return
      const focusables = Array.from(conteneur.querySelectorAll<HTMLElement>(SELECTEUR)).filter(
        el => !el.hasAttribute('aria-hidden') && el.offsetParent !== null,
      )
      if (focusables.length === 0) {
        evenement.preventDefault()
        conteneur.focus()
        return
      }
      const premierElement = focusables[0]
      const dernierElement = focusables[focusables.length - 1]
      if (evenement.shiftKey && document.activeElement === premierElement) {
        evenement.preventDefault()
        dernierElement.focus()
      } else if (!evenement.shiftKey && document.activeElement === dernierElement) {
        evenement.preventDefault()
        premierElement.focus()
      }
    }

    document.addEventListener('keydown', surTouche)
    return () => {
      document.removeEventListener('keydown', surTouche)
      origine?.focus({ preventScroll: true })
    }
  }, [ref, actif])
}
