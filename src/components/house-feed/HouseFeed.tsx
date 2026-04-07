import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useHousesInfiniteQuery } from '@/features/house';

import { HouseCard } from '../house-card';
import { useAuditHistory } from '@/components/audit-history';

function HouseFeedSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading houses"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="pt-0">
          <Skeleton className="aspect-4/3 w-full rounded-none rounded-t-xl" />
          <CardHeader className="gap-3">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export const HouseFeed = () => {
  const {
    houses,
    isPending,
    isError,
    isLoadingMore,
    hasMore,
    fetchNextPage,
    refetch,
    retryLoadMore,
    isFetching,
    loadMoreFailed,
  } = useHousesInfiniteQuery();

  const { getAuditState, decide } = useAuditHistory();

  const { ref: sentinelRef, inView } = useInView({
    rootMargin: '320px 0px',
    threshold: 0,
    skip: !hasMore,
  });

  useEffect(() => {
    if (!inView || !hasMore || isLoadingMore) return;
    void fetchNextPage();
  }, [inView, hasMore, isLoadingMore, fetchNextPage]);

  if (isPending) {
    return <HouseFeedSkeleton />;
  }

  if (isError) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-16">
        <Alert className="max-w-md">
            <AlertCircle className="size-4" />
            <AlertTitle>We're having trouble showing Houses.</AlertTitle>
            <AlertDescription>
              There was a temporary issue. Try refreshing to see more properties.
            </AlertDescription>
          </Alert>
        <Button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="w-full sm:w-auto"
        >
          {isFetching ? 'Trying again…' : 'Try again'}
        </Button>
      </div>
    );
  }

  return(
    <>
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        >
        {houses.map((house) => (
          <div key={house.id} role="listitem">
            <HouseCard 
              house={house}
              auditState={getAuditState(house.id)}
              onApprove={() => decide(house, 'approved')}
              onReject={() => decide(house, 'rejected')}
            />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      {isLoadingMore ? (
        <p className="text-muted-foreground mt-6 text-center text-sm" role="status">
          Loading more…
        </p>
      ) : null}

        {loadMoreFailed ? (
          <div className="mt-6 flex flex-col items-center gap-3">
            <Alert className="max-w-md">
              <AlertCircle className="size-4" />
              <AlertTitle>We're having trouble showing more houses.</AlertTitle>
              <AlertDescription>
                There was a temporary issue. Try refreshing to see more properties.
              </AlertDescription>
            </Alert>
            <Button
              type="button"
              variant="outline"
              onClick={() => void retryLoadMore()}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Loading…' : 'Try again'}
            </Button>
          </div>
      ) : null}
    </>
  )
} 


