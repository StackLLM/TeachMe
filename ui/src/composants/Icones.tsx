/** cloneme: C-23 — jeu d'icônes maison. Trait 1,8, bouts arrondis, currentColor. */

export type NomIcone =
  | 'materials'
  | 'course'
  | 'students'
  | 'reviews'
  | 'messages'
  | 'settings'
  | 'search'
  | 'video'
  | 'close'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'calendar'
  | 'clock'
  | 'plus'
  | 'check'
  | 'menu'
  | 'send'
  | 'file'
  | 'play'
  | 'logout'
  | 'undo'
  | 'alert'
  | 'users'
  | 'filter'
  | 'more'
  | 'sparkle'

type Props = {
  nom: NomIcone
  taille?: number
  className?: string
}

export function Icone({ nom, taille = 20, className }: Props) {
  const commun = {
    width: taille,
    height: taille,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (nom) {
    case 'materials':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <rect x="3" y="4.6" width="18" height="3.4" rx="1.7" />
          <rect x="3" y="10.3" width="18" height="3.4" rx="1.7" />
          <rect x="3" y="16" width="14" height="3.4" rx="1.7" />
        </svg>
      )
    case 'course':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <rect x="7.5" y="3.5" width="13" height="13" rx="3" opacity="0.45" />
          <rect x="3.5" y="7.5" width="13" height="13" rx="3" />
        </svg>
      )
    case 'students':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <circle cx="12" cy="7.2" r="4" />
          <path d="M3.6 20.4c.5-4.1 4.1-6.6 8.4-6.6s7.9 2.5 8.4 6.6c.1.6-.4 1.1-1 1.1H4.6c-.6 0-1.1-.5-1-1.1Z" />
        </svg>
      )
    case 'reviews':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <path d="M16.6 2.9a2.1 2.1 0 0 1 3 3L8.4 17.1a2 2 0 0 1-.9.5l-3.6 1c-.6.2-1.1-.3-.9-.9l1-3.6c.1-.3.3-.6.5-.9L16.6 2.9Z" />
          <path d="m14.9 4.7 4.4 4.4" stroke="var(--couleur-surface)" strokeWidth="1.4" />
        </svg>
      )
    case 'messages':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <path d="M3 7.2A3.2 3.2 0 0 1 6.2 4h11.6A3.2 3.2 0 0 1 21 7.2v7.6a3.2 3.2 0 0 1-3.2 3.2H9.4l-4 3.2A1 1 0 0 1 3.8 20v-3.4A3.2 3.2 0 0 1 3 14.8V7.2Z" />
          <path d="m4.4 7.8 7.6 5.4 7.6-5.4" stroke="var(--couleur-surface)" strokeWidth="1.6" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <path d="M10.4 2.6h3.2l.5 2.1c.5.2 1 .4 1.4.8l2-.8 1.6 2.8-1.6 1.5c.1.6.1 1.1 0 1.7l1.6 1.5-1.6 2.8-2-.8c-.4.4-.9.6-1.4.8l-.5 2.1h-3.2l-.5-2.1c-.5-.2-1-.4-1.4-.8l-2 .8-1.6-2.8L4.5 9.9a6 6 0 0 1 0-1.7L2.9 6.7l1.6-2.8 2 .8c.4-.4.9-.6 1.4-.8l.5-2.1Z" />
          <circle cx="12" cy="9" r="2.7" fill="var(--couleur-surface)" />
        </svg>
      )
    case 'search':
      return (
        <svg {...commun}>
          <circle cx="10.8" cy="10.8" r="6.4" />
          <path d="m15.5 15.5 4.2 4.2" />
        </svg>
      )
    case 'video':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <rect x="2.8" y="6" width="12.4" height="12" rx="3" />
          <path d="M16.6 10.4 20.4 8a.8.8 0 0 1 1.2.7v6.6a.8.8 0 0 1-1.2.7l-3.8-2.4v-3.2Z" />
        </svg>
      )
    case 'close':
      return (
        <svg {...commun}>
          <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...commun}>
          <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg {...commun}>
          <path d="M20 12H5M10.5 6.5 4 12l6.5 5.5" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...commun}>
          <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <rect x="3" y="4.8" width="18" height="16.2" rx="3.2" />
          <path d="M6.5 2.2v3.4M17.5 2.2v3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 9.6h12v1.8H6zM6 13.4h7v1.8H6z" fill="var(--couleur-surface)" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...commun}>
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 7.2V12l3.1 1.9" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...commun}>
          <path d="M12 4.5v15M4.5 12h15" />
        </svg>
      )
    case 'check':
      return (
        <svg {...commun}>
          <path d="m4.8 12.4 4.7 4.7 9.7-10.2" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...commun}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      )
    case 'send':
      return (
        <svg {...commun}>
          <path d="M21 3 3.5 10.2l7.2 3.1L21 3ZM10.7 13.3l3.1 7.2L21 3" />
        </svg>
      )
    case 'file':
      return (
        <svg {...commun}>
          <path d="M13.5 3H6.8A2.8 2.8 0 0 0 4 5.8v12.4A2.8 2.8 0 0 0 6.8 21h10.4a2.8 2.8 0 0 0 2.8-2.8V9.5L13.5 3Z" />
          <path d="M13.5 3v6.5H20" />
        </svg>
      )
    case 'play':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <path d="M8 5.4a1 1 0 0 1 1.5-.9l9 6.6a1 1 0 0 1 0 1.8l-9 6.6a1 1 0 0 1-1.5-.9V5.4Z" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...commun}>
          <path d="M14 4h3.5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14M10 8l-4 4 4 4M6 12h9" />
        </svg>
      )
    case 'undo':
      return (
        <svg {...commun}>
          <path d="M4.5 9.5h9a5.5 5.5 0 0 1 0 11H9M4.5 9.5 8.5 5.5M4.5 9.5l4 4" />
        </svg>
      )
    case 'alert':
      return (
        <svg {...commun}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5M12 16.6v.2" />
        </svg>
      )
    case 'users':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <circle cx="9" cy="7.6" r="3.6" />
          <path d="M2.6 19c.5-3.6 3.2-5.8 6.4-5.8s5.9 2.2 6.4 5.8c.1.6-.4 1.2-1 1.2H3.6c-.6 0-1.1-.6-1-1.2Z" />
          <circle cx="17.2" cy="8.6" r="2.8" opacity="0.55" />
          <path d="M17 13.4c2.5 0 4.2 1.8 4.4 4.4.1.7-.5 1.2-1.1 1.2h-3.1c.1-2.2-.6-4-2-5.2.5-.3 1.1-.4 1.8-.4Z" opacity="0.55" />
        </svg>
      )
    case 'filter':
      return (
        <svg {...commun}>
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      )
    case 'more':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <circle cx="5" cy="12" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="19" cy="12" r="1.7" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...commun} fill="currentColor" stroke="none">
          <path d="M12 2.8c.3 4.3 2.9 6.9 7.2 7.2-4.3.3-6.9 2.9-7.2 7.2-.3-4.3-2.9-6.9-7.2-7.2 4.3-.3 6.9-2.9 7.2-7.2Z" />
          <path d="M18.6 15.4c.2 2.2 1.5 3.5 3.7 3.7-2.2.2-3.5 1.5-3.7 3.7-.2-2.2-1.5-3.5-3.7-3.7 2.2-.2 3.5-1.5 3.7-3.7Z" opacity="0.55" />
        </svg>
      )
  }
}
