import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders feed inside main', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText(/Wojciech Sanders/)).toBeInTheDocument()
  })
})
