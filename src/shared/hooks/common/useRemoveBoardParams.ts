import { useSearchParams } from 'react-router-dom';

import type { Board } from '@/shared/types';

export const useRemoveBoardParams = (board: Board | undefined) => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setRemoveBoardParams: () => {
      if (board) {
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'remove-board');
            board.title && searchParams.set('title', board.title);

            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
