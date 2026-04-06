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

export function createHousesFetchMock() {
  return jest.fn((input: RequestInfo | URL) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof Request
          ? input.url
          : input.toString();
    const page = new URL(url, 'http://localhost').searchParams.get('page');
    const body =
      page === '1'
        ? { houses: SAMPLE_HOUSES_PAGE, ok: true }
        : { houses: [], ok: true };
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(body),
    });
  }) as unknown as typeof fetch;
}
