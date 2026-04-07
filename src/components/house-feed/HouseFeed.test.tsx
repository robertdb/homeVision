import type { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HouseFeed } from './HouseFeed';
import {
  createFailFirstPageThenSuccessFetchMock,
  createFailingHousesFetchMock,
  createHousesFetchMock,
} from '@/test-utils/housesApiMock';

jest.mock('../house-card', () => ({
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

  it('shows an error alert and Try again when the initial request fails', async () => {
    globalThis.fetch = createFailingHousesFetchMock(500);
    renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(
      screen.getByText(/having trouble showing Houses/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it('loads the list after Try again when the first request fails', async () => {
    const user = userEvent.setup();
    globalThis.fetch = createFailFirstPageThenSuccessFetchMock();
    renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
    expect(screen.getByTestId('house-card-10')).toHaveTextContent(
      'Wojciech Sanders',
    );
  });
});
