import type { House } from '@/features/house';

export const SAMPLE_HOUSES_PAGE: House[] = [
  {
    id: 10,
    address: '62 Eagle Dr.',
    homeowner: 'Wojciech Sanders',
    price: 85372,
    photoURL: 'https://example.com/1.jpg',
  },
  {
    id: 11,
    address: '878 1st St.',
    homeowner: 'Chelsey Cottrell',
    price: 258768,
    photoURL: 'https://example.com/2.jpg',
  },
  {
    id: 12,
    address: '73 St Paul Rd.',
    homeowner: 'Ethan Hernandez',
    price: 274254,
    photoURL: 'https://example.com/3.jpg',
  },
  {
    id: 13,
    address: '9565 Glen Ridge Ave.',
    homeowner: 'Benito Lake',
    price: 80713,
    photoURL: 'https://example.com/4.jpg',
  },
  {
    id: 14,
    address: '218 Jackson St.',
    homeowner: 'Zidan Hester',
    price: 248008,
    photoURL: 'https://example.com/5.jpg',
  },
  {
    id: 15,
    address: '351 West Mountainview Lane',
    homeowner: 'Ellis Burn',
    price: 217776,
    photoURL: 'https://example.com/6.jpg',
  },
  {
    id: 16,
    address: '88 Blue Spring Ave.',
    homeowner: 'Anja Johnston',
    price: 266644,
    photoURL: 'https://example.com/7.jpg',
  },
  {
    id: 17,
    address: '8929 Grove Drive',
    homeowner: 'Reuben Holder',
    price: 217689,
    photoURL: 'https://example.com/8.jpg',
  },
  {
    id: 18,
    address: '347 Tarkiln Hill Dr.',
    homeowner: 'Leja Ellwood',
    price: 228245,
    photoURL: 'https://example.com/9.jpg',
  },
  {
    id: 19,
    address: '9 Cardinal Court',
    homeowner: 'Una Herman',
    price: 176337,
    photoURL: 'https://example.com/10.jpg',
  },
];

export const SAMPLE_HOUSES_PAGE_2: House[] = [
  {
    id: 20,
    address: '100 Page Two St.',
    homeowner: 'Alex Page',
    price: 100000,
    photoURL: 'https://example.com/p2-0.jpg',
  },
  {
    id: 21,
    address: '101 Page Two St.',
    homeowner: 'Blake Page',
    price: 101000,
    photoURL: 'https://example.com/p2-1.jpg',
  },
  {
    id: 22,
    address: '102 Page Two St.',
    homeowner: 'Casey Page',
    price: 102000,
    photoURL: 'https://example.com/p2-2.jpg',
  },
  {
    id: 23,
    address: '103 Page Two St.',
    homeowner: 'Drew Page',
    price: 103000,
    photoURL: 'https://example.com/p2-3.jpg',
  },
  {
    id: 24,
    address: '104 Page Two St.',
    homeowner: 'Eden Page',
    price: 104000,
    photoURL: 'https://example.com/p2-4.jpg',
  },
  {
    id: 25,
    address: '105 Page Two St.',
    homeowner: 'Finn Page',
    price: 105000,
    photoURL: 'https://example.com/p2-5.jpg',
  },
  {
    id: 26,
    address: '106 Page Two St.',
    homeowner: 'Gray Page',
    price: 106000,
    photoURL: 'https://example.com/p2-6.jpg',
  },
  {
    id: 27,
    address: '107 Page Two St.',
    homeowner: 'Harper Page',
    price: 107000,
    photoURL: 'https://example.com/p2-7.jpg',
  },
  {
    id: 28,
    address: '108 Page Two St.',
    homeowner: 'Indigo Page',
    price: 108000,
    photoURL: 'https://example.com/p2-8.jpg',
  },
  {
    id: 29,
    address: '109 Page Two St.',
    homeowner: 'Jules Page',
    price: 109000,
    photoURL: 'https://example.com/p2-9.jpg',
  },
];

function pageFromHousesFetchInput(input: RequestInfo | URL): string | null {
  const url =
    typeof input === 'string'
      ? input
      : input instanceof Request
        ? input.url
        : input.toString();
  return new URL(url, 'http://localhost').searchParams.get('page');
}

function successResponseForPage(page: string | null) {
  const body =
    page === '1'
      ? { houses: SAMPLE_HOUSES_PAGE, ok: true }
      : { houses: [], ok: true };
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  });
}

function successResponseForTwoPages(page: string | null) {
  if (page === '1') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ houses: SAMPLE_HOUSES_PAGE, ok: true }),
    });
  }
  if (page === '2') {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ houses: SAMPLE_HOUSES_PAGE_2, ok: true }),
    });
  }
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ houses: [], ok: true }),
  });
}

export function createTwoPageHousesFetchMock() {
  return jest.fn((input: RequestInfo | URL) => {
    const page = pageFromHousesFetchInput(input);
    return successResponseForTwoPages(page);
  }) as unknown as typeof fetch;
}

export function createFailPage2ThenSuccessFetchMock() {
  let page2Attempts = 0;
  return jest.fn((input: RequestInfo | URL) => {
    const page = pageFromHousesFetchInput(input);
    if (page === '2') {
      page2Attempts += 1;
      if (page2Attempts === 1) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({}),
        });
      }
    }
    return successResponseForTwoPages(page);
  }) as unknown as typeof fetch;
}

export function createHousesFetchMock() {
  return jest.fn((input: RequestInfo | URL) => {
    const page = pageFromHousesFetchInput(input);
    return successResponseForPage(page);
  }) as unknown as typeof fetch;
}

export function createFailingHousesFetchMock(status = 500) {
  return jest.fn(() =>
    Promise.resolve({
      ok: false,
      status,
      json: async () => ({}),
    }),
  ) as unknown as typeof fetch;
}

export function createFailFirstPageThenSuccessFetchMock() {
  let firstPage1Attempt = true;
  return jest.fn((input: RequestInfo | URL) => {
    const page = pageFromHousesFetchInput(input);
    if (page === '1' && firstPage1Attempt) {
      firstPage1Attempt = false;
      return Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({}),
      });
    }
    return successResponseForPage(page);
  }) as unknown as typeof fetch;
}
