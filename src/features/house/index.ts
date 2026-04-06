export type { House, HousesPage } from './types';

export {
  HOUSES_PER_PAGE,
  fetchHousesPage,
  housesPageUrl,
} from './apis';


export {
  useHousesInfiniteQuery,
  type UseHousesInfiniteQueryResult,
} from '@/features/house/useHousesInfiniteQuery';
