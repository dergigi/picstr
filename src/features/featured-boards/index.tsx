import { useEffect } from 'react';

import { AuthorOverview, MemoizedBoardItem } from '@/features';
import { Spinner, Text } from '@/shared/components';

import { useFeaturedBoards } from './hooks';

import { Board } from '@/shared/types';
import { useAuthor } from '@/shared/hooks/queries';
import { NDKUser } from '@nostr-dev-kit/ndk';

const FeaturedBoardItem = ({ board }: { board: Board & { booster: string } }) => {
  const { author } = useAuthor(new NDKUser({ pubkey: board.booster }).npub);

  return (
    <div className="flex flex-col gap-2">
      <AuthorOverview author={author} boosted />

      <MemoizedBoardItem board={board} />
    </div>
  );
};

export const FeaturedBoards = () => {
  const { boards, loadMore, hasMore, isEmpty, isPending, ref, inView, isFetching } =
    useFeaturedBoards();

  useEffect(() => {
    if (!isFetching && inView) {
      loadMore();
    }
  }, [isFetching, inView, loadMore]);

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isEmpty) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <Text variant="h3">Featured Boards</Text>

      <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
        {boards.map((board) => (
          <FeaturedBoardItem key={board.event.id} board={board} />
        ))}
      </div>

      <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isFetching}
        className="mx-auto block text-transparent bg-transparent text-xs px-4 py-1"
      >
        {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button>
    </div>
  );
};
