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

describe('P-05 — Messages', () => {
  it('sends a message in an existing conversation', async () => {
    ouvrir('/messages?fil=cv-01')
    const champ = await screen.findByLabelText('Message')
    fireEvent.change(champ, { target: { value: 'See you on Friday.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findAllByText('See you on Friday.')).toHaveLength(2)
  })

  it('starts a conversation from the New message modal', async () => {
    ouvrir('/messages')
    fireEvent.click(screen.getByRole('button', { name: 'New' }))
    fireEvent.change(screen.getByLabelText(/First message/), {
      target: { value: 'Welcome to the course!' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Start conversation' }))
    await waitFor(() => expect(screen.getAllByText('Welcome to the course!')).toHaveLength(2))
    expect(window.location.search).toContain('fil=')
  })
})
