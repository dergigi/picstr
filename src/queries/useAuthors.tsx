import { useQuery } from '@tanstack/react-query';
import { Event, Filter } from 'nostr-tools';

import { useLocalStore } from '@/store';
import { parseAuthorsFromEvents } from '@/utils';

export const useAuthors = (options?: {
  authors?: string[];
  enabled?: boolean;
}) => {
  const { pool, relays } = useLocalStore((state) => state);

  const { isLoading, error, data } = useQuery({
    queryKey: ['nostr', 'authors', { authors: options?.authors }],
    queryFn: async () => {
      const filter = { kinds: [0], limit: 10 } as Filter;
      if (options && !!options.authors && options.authors.length > 0) {
        filter.authors = options.authors;
      }

      const events = (await pool.list(relays, [filter])) as Event<0>[];

      return parseAuthorsFromEvents(events);
    },
    refetchOnWindowFocus: false,
    enabled: options?.enabled && !!pool && !!relays,
  });

  return { isAuthorsLoading: isLoading, authorsError: error, authors: data };
};
