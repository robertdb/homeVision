export function getApiOrigin(): string {
  const api = process.env.VITE_API_BASE_STAGING;

  if (typeof api === 'string' && api.trim() !== '') {
    const normalized = api.trim().replace(/\/$/, '');

    try {
      new URL(normalized);
    } catch {
      throw new Error(
        'Invalid VITE_API_BASE_STAGING: expected a valid absolute URL (for example, https://api.example.com).',
      );
    }

    return normalized;
  }

  if (process.env.NODE_ENV !== 'production') {
    return '';
  }

  return '';
}
