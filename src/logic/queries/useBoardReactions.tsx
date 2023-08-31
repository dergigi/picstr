import { useQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { Board, Reactions } from '@/logic/types';
import { parseReactionsFromEvents } from '@/logic/utils';

export const useBoardReactions = (board: Board | undefined | null) => {
  const pool = useLocalStore((store) => store.pool);
  const relays = useLocalStore((store) => store.relays);

  const fetchReactions = useCallback(async () => {
    if (!pool || !relays || !board)
      throw new Error('Missing dependencies in fetching board reactions');

    const filter: Filter = {
      '#a': [`${33889}:${board.author}:${board.title}`],
      kinds: [1, 7, 9735],
    };

    try {
      const events = await pool.batchedList('boardReactions', relays, [filter]);

      if (events.length == 0) return { likes: [], comments: [], zaps: [] } as Reactions;

      return parseReactionsFromEvents(events);
    } catch (error) {
      throw new Error('Error in fetching board reactions');
    }
  }, [pool, relays, board]);

  return useQuery({
    queryKey: ['nostr', 'boards', board?.author, board?.title, 'reactions'],
    queryFn: fetchReactions,
    staleTime: 1000, // 1 second
    enabled: !!board && !!pool && !!relays,
  });
};
