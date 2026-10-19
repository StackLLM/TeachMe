/** cloneme: C-01 — application : fournisseurs, routeur, coque, toasts. */

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toasts } from './composants/Toast'
import { GabaritPrincipal } from './gabarits/GabaritPrincipal'
import { ROUTES, ROUTE_404 } from './routes'
import { FournisseurAnimations } from './state/Animations'
import { FournisseurDonnees, type DonneesInitiales } from './state/Donnees'
import { FournisseurNotifications } from './state/Notifications'
import { Page404 } from './pages/Page404'

export function App({ donneesInitiales }: { donneesInitiales?: DonneesInitiales } = {}) {
  return (
    <FournisseurAnimations>
      <FournisseurDonnees donneesInitiales={donneesInitiales}>
        <FournisseurNotifications>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <GabaritPrincipal>
              <Routes>
                {ROUTES.map(route => {
                  const Page = route.page
                  return <Route key={route.id} path={route.chemin} element={<Page />} />
                })}
                <Route path={ROUTE_404.chemin} element={<Page404 />} />
              </Routes>
            </GabaritPrincipal>
            <Toasts />
          </BrowserRouter>
        </FournisseurNotifications>
      </FournisseurDonnees>
    </FournisseurAnimations>
  )
}
