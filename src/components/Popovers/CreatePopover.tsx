import { PlusIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';

import { BoardSlideover, PinSlideover } from '@/components';
import { PopoverTemplate } from '@/components/Popovers';
import { PopoverItem } from './PopoverTemplate.types';

export default function CreatePopover() {
  const [openBoard, setOpenBoard] = useState(false);
  const [openPin, setOpenPin] = useState(false);

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
        onClick: () => setOpenBoard(true),
      },
      {
        title: 'Add Pin',
        description: 'Add a new pin to an existing board',
        onClick: () => setOpenPin(true),
      },
    ],
    [setOpenBoard, setOpenPin]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-gray-50 shadow-sm hover:bg-gray-700 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
          Create
        </div>
      </PopoverTemplate>

      <BoardSlideover open={openBoard} setOpen={setOpenBoard} />
      <PinSlideover open={openPin} setOpen={setOpenPin} />
    </>
  );
}
