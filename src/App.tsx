import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { AppRouter } from '@/routes';
import { createIDBPersister } from './utils';

const persister = createIDBPersister();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 48, // 48 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <AppRouter />
    </PersistQueryClientProvider>
  );
};
