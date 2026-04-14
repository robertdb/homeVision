import { getApiOrigin } from './api';
import { housesPageUrl } from './house/apis';

const originalApiBase = process.env.VITE_API_BASE_STAGING;

describe('getApiOrigin', () => {
  afterEach(() => {
    process.env.VITE_API_BASE_STAGING = originalApiBase;
  });

  it('returns normalized origin when the URL is valid', () => {
    process.env.VITE_API_BASE_STAGING = 'https://api.example.com/';

    expect(getApiOrigin()).toBe('https://api.example.com');
  });

  it('throws when VITE_API_BASE_STAGING is malformed', () => {
    process.env.VITE_API_BASE_STAGING = 'not a url';

    expect(() => getApiOrigin()).toThrow(
      /Invalid VITE_API_BASE_STAGING: expected a valid absolute URL/i,
    );
  });

  it('returns empty string when VITE_API_BASE_STAGING is blank', () => {
    process.env.VITE_API_BASE_STAGING = '   ';

    expect(getApiOrigin()).toBe('');
  });

  it('keeps house endpoint URL generation compatible with normalized origin', () => {
    process.env.VITE_API_BASE_STAGING = 'https://api.example.com/';

    expect(housesPageUrl(2, 10)).toBe(
      'https://api.example.com/api_project/houses?page=2&per_page=10',
    );
  });
});
