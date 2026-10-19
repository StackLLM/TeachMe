import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/controles.css'
import { App } from './App'

const racine = document.getElementById('root')
if (!racine) throw new Error('Élément #root introuvable')

createRoot(racine).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
