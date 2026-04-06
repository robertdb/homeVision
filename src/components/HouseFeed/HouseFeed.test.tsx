import { render, screen } from '@testing-library/react'
import { HouseFeed } from './HouseFeed'

jest.mock('../HouseCard', () => ({
  HouseCard: ({ house }: { house: { id: number; homeowner: string } }) => (
    <div data-testid={`house-card-${house.id}`}>{house.homeowner}</div>
  ),
}))

describe('HouseFeed', () => {
  it('renders a list with one item per mock house', () => {
    render(<HouseFeed />)

    expect(screen.getByRole('list')).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(10)

    expect(screen.getByTestId('house-card-10')).toHaveTextContent(
      'Wojciech Sanders',
    )
    expect(screen.getByTestId('house-card-19')).toHaveTextContent('Una Herman')
  })
})
