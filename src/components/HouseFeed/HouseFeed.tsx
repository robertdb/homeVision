import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useHousesInfiniteQuery } from '@/features/house';

import { HouseCard } from '../HouseCard';

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
    error,
    isLoadingMore,
    hasMore,
    fetchNextPage,
  } = useHousesInfiniteQuery();

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
      <div className="flex w-full max-w-lg flex-col gap-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Could not load houses</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Something went wrong.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return(
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
       <header className="mb-8">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          Houses
        </h1>
      </header>
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        >
        {houses.map((house) => (
          <div key={house.id} role="listitem">
            <HouseCard house={house} />
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      {isLoadingMore ? (
        <p className="text-muted-foreground mt-6 text-center text-sm" role="status">
          Loading more…
        </p>
      ) : null}
      
    </div>
  )
} 


