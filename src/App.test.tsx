import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import { createHousesFetchMock } from '@/test-utils/housesApiMock';

describe('App', () => {
  beforeEach(() => {
    globalThis.fetch = createHousesFetchMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders feed inside main', async () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Wojciech Sanders/)).toBeInTheDocument();
    });
  });
});
