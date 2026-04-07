import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HouseFeed } from '@/components/HouseFeed';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-background min-h-svh px-8">
        <HouseFeed />
      </main>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
