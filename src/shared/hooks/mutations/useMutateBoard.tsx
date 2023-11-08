import NDK, { NDKEvent } from '@nostr-dev-kit/ndk';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUser } from '@/shared/hooks/queries';
import { useLocalStore } from '@/shared/store';
import { Board, Format } from '@/shared/types';
import { normalizePinContent } from '@/shared/utils';

type PublishBoardParams = {
  pubkey: string | null | undefined;
  board: Partial<Board>;
  pinIndex: string | null;
  action: string | null;
  ndk: NDK;
  overridePins?: string[][] | undefined;
};

const publishBoardFn = async ({
  pubkey,
  board,
  pinIndex,
  action,
  ndk,
  overridePins,
}: PublishBoardParams) => {
  if (
    !pubkey ||
    !board.format ||
    !board.category ||
    !board.title ||
    !board.description ||
    !board.image ||
    !board.headers
  ) {
    throw new Error('Missing required fields');
  }

  const newPins = [...(overridePins || board.pins || [])];
  if (pinIndex != null && newPins.length > +pinIndex && action != 'remove-pin') {
    for (let hIndex = 0; hIndex < board.headers.length; hIndex++) {
      if (newPins[+pinIndex][hIndex] !== '') {
        const normalizedContent = await normalizePinContent({
          content: newPins[+pinIndex][hIndex],
          format: board.headers[hIndex].split(':')[0] as Format,
        });

        newPins[+pinIndex][hIndex] = normalizedContent;
      }
    }
  }

  const e = new NDKEvent(ndk, {
    content: '',
    kind: 33889,
    created_at: Math.floor(Date.now() / 1000),
    pubkey,
    tags: [
      ['d', board.title],
      ['description', board.description],
      ['c', board.category],
      ['f', board.format],
      ['image', board.image],
      ['headers', ...board.headers],
      ...(board.tags || [])
        .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
        .map((t) => ['t', t]),
      ...newPins.filter((p) => p.some((c) => c !== '')).map((p) => ['pin', ...p]),
    ],
  });

  await e.publish();

  return e;
};

type DeleteBoardParams = { pubkey: string | null | undefined; board: Partial<Board>; ndk: NDK };

const deleteBoardFn = async ({ pubkey, board, ndk }: DeleteBoardParams) => {
  if (!pubkey || !board.event || !board.event.id) {
    throw new Error('Missing required fields');
  }

  const e = new NDKEvent(ndk, {
    content: '',
    created_at: Math.floor(Date.now() / 1000),
    pubkey,
    kind: 5,
    tags: [['e', board.event.id]],
  });

  await e.publish();

  return e;
};

export const useMutateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');
  const pinIndex = searchParams.get('i');

  const ndk = useLocalStore((store) => store.ndk);

  const { pubkey } = useUser();

  const navigate = useNavigate();

  return {
    isLoading,
    publishBoard: (board: Partial<Board>, onSuccess?: () => void) => {
      setIsLoading(true);

      toast
        .promise(publishBoardFn({ pubkey, board, pinIndex, action, ndk }), {
          pending: 'Publishing...',
          success: 'Successfully published!',
          error: 'An error has been occured! Please try again.',
        })
        .then((event) => {
          navigate('/p/' + event.author.npub + '/' + board.title, { replace: true });

          onSuccess?.();
        })
        .catch(() => {
          toast('An error has been occured! Please try again.', { type: 'error' });

          setSearchParams(
            (searchParams) => {
              searchParams.delete('action');
              searchParams.delete('i');
              return searchParams;
            },
            { replace: true }
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    deleteBoard: (board: Partial<Board>, onSuccess?: () => void) => {
      setIsLoading(true);

      toast
        .promise(deleteBoardFn({ pubkey, board, ndk }), {
          pending: 'Deleting board...',
          error: 'An error has been occured! Please try again.',
          success: 'Successfully deleted!',
        })
        .then((event) => {
          navigate('/p/' + event.author.npub, {
            replace: true,
          });

          onSuccess?.();
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    },
    removePin: (board: Partial<Board>, pinIndex: string, onSuccess?: () => void) => {
      const newPins = [...(board.pins || [])];

      if (newPins.length > 0) {
        newPins.splice(parseInt(pinIndex), 1);

        setIsLoading(true);

        toast
          .promise(
            publishBoardFn({ pubkey, board, pinIndex, action, ndk, overridePins: newPins }),
            {
              pending: 'Removing pin...',
              error: 'An error has been occured! Please try again.',
              success: 'Successfully removed!',
            }
          )
          .then(() => {
            navigate('/p/' + board.event!.author.npub + '/' + board.title, {
              replace: true,
            });

            onSuccess?.();
          })
          .catch(() => {
            setSearchParams(
              (searchParams) => {
                searchParams.delete('action');
                searchParams.delete('i');
                searchParams.delete('confirm');
                return searchParams;
              },
              { replace: true }
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        throw new Error('Unexpected remove action');
      }
    },
  };
};
