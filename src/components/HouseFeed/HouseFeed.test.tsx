import type { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HouseFeed } from './HouseFeed';
import { createHousesFetchMock } from '@/test-utils/housesApiMock';

jest.mock('../HouseCard', () => ({
  HouseCard: ({ house }: { house: { id: number; homeowner: string } }) => (
    <div data-testid={`house-card-${house.id}`}>{house.homeowner}</div>
  ),
}));

function renderWithQuery(ui: ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('HouseFeed', () => {
  beforeEach(() => {
    globalThis.fetch = createHousesFetchMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a list with one item per house from the API', async () => {
    renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(10);

    expect(screen.getByTestId('house-card-10')).toHaveTextContent(
      'Wojciech Sanders',
    );
    expect(screen.getByTestId('house-card-19')).toHaveTextContent('Una Herman');
  });
});
