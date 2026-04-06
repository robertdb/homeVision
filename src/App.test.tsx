import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders placeholder copy', () => {
    render(<App />)
    expect(screen.getByText(/HomeVision WIP/i)).toBeInTheDocument()
  })
})
