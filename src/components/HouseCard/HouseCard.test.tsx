import { fireEvent, render, screen } from '@testing-library/react';
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

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', sampleHouse.photoURL);
  });

  it('shows photo unavailable placeholder when the image fails to load', () => {
    const { container } = render(<HouseCard house={sampleHouse} />);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    fireEvent.error(img!);

    expect(screen.getByText('No photo')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Photo unavailable' }),
    ).toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
