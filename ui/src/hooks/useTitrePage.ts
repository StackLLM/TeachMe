import { useEffect } from 'react'

/** Titre du document, aligné sur la route. */
export function useTitrePage(titre: string): void {
  useEffect(() => {
    document.title = `${titre} · eLarium`
  }, [titre])
}
