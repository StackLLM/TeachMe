import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

describe('P-01 — My course', () => {
  it('renders the groups, the schedule and the reminders', () => {
    ouvrir('/')
    expect(screen.getByRole('heading', { name: 'Groups' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Schedule' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Reminder' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /42 B/ })).toHaveAttribute('href', '/groups/g-42b')
    expect(screen.getByText('17 June, 2020')).toBeInTheDocument()
  })

  it('changes the schedule when another day is selected', () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('button', { name: 'wed 18 June' }))
    expect(screen.getByText('18 June, 2020')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Join 56A group, lecture 24/ })).toBeInTheDocument()
  })

  it('creates a group through the modal', async () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('button', { name: /New group/ }))
    fireEvent.change(screen.getByLabelText(/Group code/), { target: { value: '99 Z' } })
    fireEvent.change(screen.getByLabelText(/Course/), { target: { value: 'Brand lab' } })
    fireEvent.change(screen.getByLabelText(/Next lecture date/), { target: { value: '19 June, 2020' } })
    fireEvent.change(screen.getByLabelText(/Next lecture time/), { target: { value: '11:00 am' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create group' }))

    expect(await screen.findByText('Group created locally (demo)')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /99 Z/ })).toBeInTheDocument()
  })

  it('dismisses a reminder and brings it back with Undo', async () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss reminder: Homework review' }))
    await waitFor(() => expect(screen.queryByText('Homework review')).not.toBeInTheDocument())

    fireEvent.click(await screen.findByRole('button', { name: 'Undo' }))
    await waitFor(() => expect(screen.getByText('Homework review')).toBeInTheDocument())
  })

  it('opens the review modal from a group card', async () => {
    ouvrir('/')
    fireEvent.click(screen.getByRole('link', { name: /42 B/ }))
    expect(await screen.findByRole('heading', { name: /42 B/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Lectures' })).toBeInTheDocument()
  })
})
