/** cloneme: C-15, A-06 — notifications éphémères. */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { TOAST } from '../lib/animations'
import { useNotifications, type Notification } from '../state/Notifications'
import { Icone } from './Icones'
import './Toast.css'

function IconeTon({ ton }: { ton: Notification['ton'] }) {
  if (ton === 'erreur') return <Icone nom="alert" taille={17} />
  if (ton === 'info') return <Icone nom="sparkle" taille={17} />
  return <Icone nom="check" taille={17} />
}

function ElementToast({ notification, fermer }: { notification: Notification; fermer: (id: string) => void }) {
  const [suspendu, setSuspendu] = useState(false)

  useEffect(() => {
    if (suspendu) return
    const minuterie = window.setTimeout(() => fermer(notification.id), TOAST.duree)
    return () => window.clearTimeout(minuterie)
  }, [suspendu, notification.id, fermer])

  return (
    <div
      className={`toast toast--${notification.ton} toast-entree`}
      role="status"
      onMouseEnter={() => setSuspendu(true)}
      onMouseLeave={() => setSuspendu(false)}
      onFocus={() => setSuspendu(true)}
      onBlur={() => setSuspendu(false)}
    >
      <span className="toast__icone" aria-hidden="true">
        <IconeTon ton={notification.ton} />
      </span>
      <div className="toast__texte">
        <p className="toast__titre">{notification.titre}</p>
        {notification.description && <p className="toast__description">{notification.description}</p>}
        {notification.action && (
          <button
            className="toast__action"
            type="button"
            onClick={() => {
              notification.action?.executer()
              fermer(notification.id)
            }}
          >
            {notification.action.libelle}
          </button>
        )}
      </div>
      <button
        className="toast__fermer"
        type="button"
        onClick={() => fermer(notification.id)}
        aria-label="Dismiss notification"
      >
        <Icone nom="close" taille={15} />
      </button>
    </div>
  )
}

export function Toasts() {
  const { notifications, fermer } = useNotifications()

  if (notifications.length === 0) return null

  return createPortal(
    <div className="toasts" aria-label="Notifications" role="region">
      {notifications.map(notification => (
        <ElementToast key={notification.id} notification={notification} fermer={fermer} />
      ))}
    </div>,
    document.body,
  )
}
