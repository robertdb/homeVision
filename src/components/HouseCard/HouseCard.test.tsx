import { render, screen } from '@testing-library/react'
import type { House } from '@/features/house'
import { HouseCard } from './HouseCard'

const sampleHouse: House = {
  id: 0,
  address: '4 Pumpkin Hill Street Antioch, TN 37013',
  homeowner: 'Nicole Bone',
  price: 105124,
  photoURL: 'https://example.com/house.jpg',
}

describe('HouseCard', () => {
  it('renders address, homeowner, formatted price and photo URL', () => {
    const { container } = render(<HouseCard house={sampleHouse} />)

    expect(
      screen.getByText('4 Pumpkin Hill Street Antioch, TN 37013'),
    ).toBeInTheDocument()
    expect(screen.getByText('Nicole Bone')).toBeInTheDocument()

    const expectedPrice = sampleHouse.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    expect(screen.getByText(expectedPrice)).toBeInTheDocument()

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', sampleHouse.photoURL)
  })
})
