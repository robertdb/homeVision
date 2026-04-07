import { useMemo } from 'react';
import {
  useInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';
import { fetchHousesPage, HOUSES_PER_PAGE } from './apis';
import type { House, HousesPage } from './types';

const HOUSES_QUERY_KEY = ['houses', HOUSES_PER_PAGE] as const;

const HOUSES_QUERY_RESILIENCE_OPTIONS = {
  retry: 5, 
  retryDelay: (failureCount: number) => {
    const seconds = Math.min(failureCount + 1, 5);
    return seconds * 1000;
  },
  refetchOnWindowFocus: false,
  staleTime: 60000, // 1 min
} as const;

function getNextPageParam(
  lastPage: HousesPage,
  _pages: HousesPage[],
  lastPageParam: number,
): number | undefined {
  if (lastPage.houses.length === 0) return undefined;
  if (lastPage.houses.length < HOUSES_PER_PAGE) return undefined;
  return lastPageParam + 1;
}

export interface UseHousesInfiniteQueryResult {
  houses: House[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  isLoadingMore: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<unknown>;
  isFetching: boolean;
  loadMoreFailed: boolean;
  retryLoadMore: () => void;
  refetch: () => void;
}

export function useHousesInfiniteQuery(): UseHousesInfiniteQueryResult {
  const query = useInfiniteQuery<
    HousesPage,
    Error,
    InfiniteData<HousesPage>,
    typeof HOUSES_QUERY_KEY,
    number
  >({
    queryKey: HOUSES_QUERY_KEY,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      fetchHousesPage(pageParam, HOUSES_PER_PAGE, signal),
    getNextPageParam,
    ...HOUSES_QUERY_RESILIENCE_OPTIONS
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    refetch,
    isFetching,
    isFetchNextPageError
  } = query;

  const houses = useMemo(
    () => (data ? data.pages.flatMap((page) => page.houses) : []),
    [data],
  );

  const hasMore = Boolean(hasNextPage);

  const retryLoadMore = () => {
    void fetchNextPage();
  };

  return {
    houses,
    isPending,
    isError,
    error: error ?? null,
    isLoadingMore: isFetchingNextPage,
    hasMore,
    fetchNextPage,
    refetch,
    isFetching,
    loadMoreFailed: isFetchNextPageError,
    retryLoadMore
  };
}
