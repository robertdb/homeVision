import type { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { HouseFeed } from './HouseFeed';
import {
  createFailFirstPageThenSuccessFetchMock,
  createFailPage2ThenSuccessFetchMock,
  createFailingHousesFetchMock,
  createHousesFetchMock,
  createTwoPageHousesFetchMock,
} from '@/test-utils/housesApiMock';

let inViewFlag = false;

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('../house-card', () => ({
  HouseCard: ({ house }: { house: { id: number; homeowner: string } }) => (
    <div data-testid={`house-card-${house.id}`}>{house.homeowner}</div>
  ),
}));

const mockUseInView = jest.mocked(useInView);

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

function renderWithQuery(ui: ReactElement) {
  const client = createTestQueryClient();
  return {
    client,
    ...render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>),
  };
}

function countFetchCallsForPage(
  fetchMock: jest.Mock,
  pageNum: number,
): number {
  return fetchMock.mock.calls.filter((call) => {
    const input = call[0] as RequestInfo | URL;
    const url =
      typeof input === 'string'
        ? input
        : input instanceof Request
          ? input.url
          : input.toString();
    return (
      new URL(url, 'http://localhost').searchParams.get('page') ===
      String(pageNum)
    );
  }).length;
}

describe('HouseFeed', () => {
  beforeEach(() => {
    inViewFlag = false;
    globalThis.fetch = createHousesFetchMock();
    mockUseInView.mockImplementation(() => ({
      ref: jest.fn(),
      get inView() {
        return inViewFlag;
      },
    }));
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

  it('fetches the second page when the sentinel enters view', async () => {
    globalThis.fetch = createTwoPageHousesFetchMock();
    const { rerender, client } = renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });

    inViewFlag = true;
    rerender(
      <QueryClientProvider client={client}>
        <HouseFeed />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(20);
    });
    expect(screen.getByTestId('house-card-20')).toHaveTextContent('Alex Page');
  });

  it('does not fetch page 2 while the sentinel is not in view', async () => {
    const fetchMock = createTwoPageHousesFetchMock();
    globalThis.fetch = fetchMock;
    renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });

    await waitFor(() => {
      expect(countFetchCallsForPage(fetchMock, 1)).toBeGreaterThanOrEqual(1);
    });
    expect(countFetchCallsForPage(fetchMock, 2)).toBe(0);

    await new Promise((r) => {
      setTimeout(r, 50);
    });
    expect(countFetchCallsForPage(fetchMock, 2)).toBe(0);
  });

  it('shows load-more error and recovers after Try again', async () => {
    globalThis.fetch = createFailPage2ThenSuccessFetchMock();
    const { rerender, client } = renderWithQuery(<HouseFeed />);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });

    inViewFlag = true;
    rerender(
      <QueryClientProvider client={client}>
        <HouseFeed />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/having trouble showing more houses/i),
      ).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: /^try again$/i }),
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(20);
    });
    expect(screen.getByTestId('house-card-29')).toHaveTextContent('Jules Page');
  });
});
