import { getApiOrigin } from '@/features/api';
import type { HousesPage } from './types';

export const HOUSES_PER_PAGE = 10;

export function housesPageUrl(page: number, perPage: number): string {
  const base = getApiOrigin();
  const path = `/api_project/houses?page=${page}&per_page=${perPage}`;
  return base ? `${base}${path}` : path;
}

export async function fetchHousesPage(
  page: number,
  perPage: number,
  signal?: AbortSignal,
): Promise<HousesPage> {
  const url = housesPageUrl(page, perPage);
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  const data = await res.json();

  return data;
}