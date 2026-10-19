import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

const stockage = new Map<string, string>()
const fauxStockage = {
  getItem: (cle: string) => stockage.get(cle) ?? null,
  setItem: (cle: string, valeur: string) => void stockage.set(cle, String(valeur)),
  removeItem: (cle: string) => void stockage.delete(cle),
  clear: () => stockage.clear(),
  key: (index: number) => [...stockage.keys()][index] ?? null,
  get length() {
    return stockage.size
  },
}

try {
  if (!window.localStorage) {
    Object.defineProperty(window, 'localStorage', { configurable: true, value: fauxStockage })
  }
} catch {
  Object.defineProperty(window, 'localStorage', { configurable: true, value: fauxStockage })
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (requete: string) => ({
    matches: false,
    media: requete,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})

Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() })

afterEach(() => {
  cleanup()
  try {
    window.localStorage.clear()
  } catch {
    /* stockage absent sous jsdom */
  }
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.documentElement.removeAttribute('data-animations')
  window.history.replaceState({}, '', '/')
})
