/**
 * cloneme: C-15 — notifications éphémères. Un seul fournisseur pour toute
 * l'application ; les toasts se ferment seuls, sauf survol.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type TonNotification = 'succes' | 'info' | 'erreur'

export type Notification = {
  id: string
  titre: string
  description?: string
  ton: TonNotification
  action?: { libelle: string; executer: () => void }
}

type ContexteNotifications = {
  notifications: Notification[]
  notifier: (notification: Omit<Notification, 'id' | 'ton'> & { ton?: TonNotification }) => string
  fermer: (id: string) => void
}

const Contexte = createContext<ContexteNotifications | null>(null)

let sequence = 0

export function FournisseurNotifications({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const fermer = useCallback((id: string) => {
    setNotifications(actuelles => actuelles.filter(notification => notification.id !== id))
  }, [])

  const notifier = useCallback<ContexteNotifications['notifier']>(entree => {
    const id = `toast-${++sequence}`
    setNotifications(actuelles => [...actuelles, { ...entree, ton: entree.ton ?? 'succes', id }])
    return id
  }, [])

  const valeur = useMemo(() => ({ notifications, notifier, fermer }), [notifications, notifier, fermer])

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>
}

export function useNotifications(): ContexteNotifications {
  const contexte = useContext(Contexte)
  if (!contexte) throw new Error('useNotifications doit être utilisé dans FournisseurNotifications')
  return contexte
}
