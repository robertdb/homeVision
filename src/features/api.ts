export function getApiOrigin(): string {
  const api = process.env.VITE_API_BASE;

  if (typeof api === 'string' && api.trim() !== '') {
    return api.trim().replace(/\/$/, '');
  }

  if (process.env.NODE_ENV !== 'production') {
    return '';
  }

  return '';
}
