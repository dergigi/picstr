import { HeartIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { useBoardLikes, useUser } from '@/logic/queries';
import { NDKBoard } from '@/logic/types';
import { joinClassNames, numberEllipsis } from '@/logic/utils';

interface Params {
  board: NDKBoard;
  bgHover?: boolean;
}

export const BoardLikeButton = ({ board, bgHover = false }: Params) => {
  const { likes } = useBoardLikes(board);
  const like = async () => await board?.event.react('+');

  const { pubkey } = useUser();

  const likedByUser = useMemo(
    () => !!likes.find((event) => event.pubkey == pubkey),
    [likes, pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => !likedByUser && like()}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900',
          bgHover && !likedByUser ? 'hover:bg-gray-200' : ''
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{numberEllipsis(likes.length)}</span>
      </button>
    </>
  );
};
