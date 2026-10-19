/** cloneme: table des routes — miroir de design.md §1. */

import type { ComponentType } from 'react'
import { PageTableauDeBord } from './pages/PageTableauDeBord'
import { PageMateriaux } from './pages/PageMateriaux'
import { PageEleves } from './pages/PageEleves'
import { PageEvaluations } from './pages/PageEvaluations'
import { PageMessages } from './pages/PageMessages'
import { PageReglages } from './pages/PageReglages'
import { PageGroupe } from './pages/PageGroupe'
import { Page404 } from './pages/Page404'

export type RouteApplication = {
  id: string
  chemin: string
  page: ComponentType
  titre: string
}

export const ROUTES: RouteApplication[] = [
  { id: 'P-01', chemin: '/', page: PageTableauDeBord, titre: 'My course' },
  { id: 'P-02', chemin: '/materials', page: PageMateriaux, titre: 'Materials' },
  { id: 'P-03', chemin: '/students', page: PageEleves, titre: 'Students' },
  { id: 'P-04', chemin: '/reviews', page: PageEvaluations, titre: 'Reviews' },
  { id: 'P-05', chemin: '/messages', page: PageMessages, titre: 'Messages' },
  { id: 'P-06', chemin: '/settings', page: PageReglages, titre: 'Settings' },
  { id: 'P-07', chemin: '/groups/:id', page: PageGroupe, titre: 'Group' },
]

export const ROUTE_404: RouteApplication = {
  id: 'P-99',
  chemin: '*',
  page: Page404,
  titre: 'Page not found',
}
