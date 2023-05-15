import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useStar = () => {
  const publish = usePublish(['wss://nos.lol']);

  const starBoard = useCallback(
    (board: Board, invalidate: () => void) => {
      publish({
        content: '+',
        kind: 7,
        tags: [
          ['a', `${33888}:${board.pubkey}:${board.name}`],
          ['p', board.pubkey],
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    starBoard,
  };
};

export default useStar;
