'use client';

import { usePubkey } from 'nostr-hooks';

import { useBoards, useContacts } from '@/hooks';

import { BoardCard } from '@/components';

const Feed = () => {
  const pubkey = usePubkey();
  const { events } = useContacts({ pubkey });

  const { boards, eose } = useBoards({
    pubkeys:
      events && events.length > 0
        ? events[0].tags.map((tag) => tag[1])
        : undefined,
    enabled: events && events.length > 0 && events[0].tags.length > 0,
    autoInvalidate: true,
  });

  if (boards.length === 0) {
    if (eose) {
      return (
        <>
          <p>Hello 👋</p>
          <p>No boards!</p>
        </>
      );
    } else {
      return (
        <>
          <button className="loading btn-sm btn btn-wide" />
        </>
      );
    }
  }

  return (
    <>
      {boards.length > 0
        ? boards.map((board) => {
            if (board.pins.length > 0) {
              return (
                <BoardCard
                  key={board.id}
                  pubkey={board.pubkey}
                  boardName={board.name}
                />
              );
            }
          })
        : null}
    </>
  );
};

export default Feed;
