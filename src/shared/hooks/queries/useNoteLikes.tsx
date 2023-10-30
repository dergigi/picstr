import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStore } from '../store';

export const useNoteLikes = (note: NDKEvent | undefined) => {
  const isSubscribed = useRef(false);

  const [likes, setLikes] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(() => {
    if (!ndk || !note) return;

    const filter: NDKFilter = {
      '#e': [note.id],
      kinds: [7],
    };

    const subscription = ndk.subscribe([filter]);

    subscription.on('event', async (event: NDKEvent) => {
      if (isLoading) setIsLoading(false);

      setLikes((prev) => [...prev, event]);
    });

    subscription.on('eose', () => {
      if (isLoading) setIsLoading(false);
    });
  }, [ndk, note, setLikes, setIsLoading, isLoading]);

  useEffect(() => {
    if (!note || !ndk) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, note]);

  return { likes, isLoading };
};
