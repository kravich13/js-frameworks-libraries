import React from 'react'
import { act, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders to the text', () => {
    render(<App />)

    expect(screen.getByText(/hello/i)).toBeInTheDocument()
    expect(screen.getByText(/Какая-то инфа/i)).toBeInTheDocument()
  })

  it('renders to search types', () => {
    render(<App />)

    // expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Текст...')).toBeInTheDocument()
    expect(screen.getByAltText('нет картинки')).toBeInTheDocument()
    expect(screen.getByDisplayValue('13')).toBeInTheDocument()
  })

  it('renders to search variants', () => {
    render(<App />)

    expect(screen.queryByText(/Max Kravich/i)).toBeNull()
  })

  it('renders async elem', async () => {
    render(<App />)

    // Изначательно строки нет
    expect(screen.queryByText(/Logged in as/i)).toBeNull()
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument()
    screen.debug()
  })
})
