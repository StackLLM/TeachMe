import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../App'
import { JEU_DE_TEST } from './fixtures/donnees'

function ouvrir(chemin = '/') {
  window.history.replaceState({}, '', chemin)
  return render(<App donneesInitiales={JEU_DE_TEST} />)
}

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

describe('Navigation et recherche', () => {
  it('navigates to Materials from the sidebar', async () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('link', { name: 'Materials' }))
    expect(await screen.findByRole('heading', { name: 'Materials' })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/materials')
  })

  it('filters the material library and shows the empty state', async () => {
    ouvrir('/materials')
    fireEvent.change(screen.getByLabelText('Search materials'), { target: { value: 'zzz' } })
    expect(await screen.findByText('Nothing in this corner yet')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(await screen.findByText('Marketing foundations — deck 4')).toBeInTheDocument()
  })

  it('opens a student from the global search palette', async () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('button', { name: /Search groups, students/ }))
    const champ = await screen.findByRole('combobox')
    fireEvent.change(champ, { target: { value: 'Maya' } })
    fireEvent.keyDown(champ, { key: 'Enter' })
    expect(await screen.findByRole('heading', { name: 'Maya Chen' })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/students')
    expect(window.location.search).toContain('eleve=e-01')
  })

  it('saves the settings in demo mode', async () => {
    ouvrir('/settings')
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(await screen.findByText('Settings saved locally (demo)')).toBeInTheDocument()
  })

  it('renders the 404 for an unknown route', () => {
    ouvrir('/does-not-exist')
    expect(screen.getByText('This page wandered off.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to My course/ })).toHaveAttribute('href', '/')
  })

  it('reviews a submission and moves it to Reviewed', async () => {
    ouvrir('/reviews')
    fireEvent.click(screen.getAllByRole('button', { name: 'Start review' })[0])
    fireEvent.change(screen.getByLabelText(/Grade/), { target: { value: '17' } })
    fireEvent.change(screen.getByLabelText('Feedback'), { target: { value: 'Clear and focused.' } })
    fireEvent.click(screen.getByRole('button', { name: /Publish/ }))
    expect(await screen.findByText('Feedback published (demo)')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /Reviewed/ }))
    expect(await screen.findByText('17/20')).toBeInTheDocument()
  })
})
