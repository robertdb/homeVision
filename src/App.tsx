import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HouseFeed } from '@/components/house-feed';
import { Header } from '@/components/layout';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-background min-h-svh px-8 mx-auto w-full max-w-6xl">
        <Header />
        <HouseFeed />
      </main>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
