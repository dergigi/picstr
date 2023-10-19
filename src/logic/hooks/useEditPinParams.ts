import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { NDKBoard } from '@/logic/types';

export const useEditPinParams = (
  board: Partial<NDKBoard> | undefined,
  pinIndex: number | undefined
) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    setEditPinParams: () => {
      if (board && pinIndex != undefined) {
        setBoard(board);
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'edit-pin');
            searchParams.set('i', pinIndex.toString());
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
