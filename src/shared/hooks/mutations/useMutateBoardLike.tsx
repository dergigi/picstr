import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { usePublish } from '@/shared/hooks/mutations';
import { Board } from '@/shared/types';

export const useMutateBoardLike = (board: Board | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!board) throw new Error('Board is undefined');

      return publish({
        content: '+',
        kind: 7,
        tags: [
          ['a', `${33889}:${board?.event.author.pubkey}:${board?.title}`],
          ['p', board?.event.author.pubkey],
        ],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        'nostr',
        'boards',
        { author: board?.event.author.pubkey, title: board?.title },
        'reactions',
      ]);
    },
    onError: () => {
      toast('An error has been occured! Please try again.', { type: 'error' });
    },
  });
};
