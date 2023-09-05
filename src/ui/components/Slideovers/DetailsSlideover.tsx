import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';

import { EllipsisPopover } from '@/ui/components/Popovers';

export const DetailsSlideover = ({
  board,
  pinIndex,
  setPinIndex,
  children,
}: {
  board: Board;
  pinIndex: number;
  setPinIndex: Dispatch<SetStateAction<number>>;
  children: React.ReactNode;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const previous = useCallback(
    () => setPinIndex((prev) => (prev > -1 ? prev - 1 : -1)),
    [setPinIndex]
  );
  const next = useCallback(
    () => setPinIndex((prev) => (prev > -1 && prev < board.pins.length - 1 ? prev + 1 : -1)),
    [setPinIndex, board.pins.length]
  );
  const close = useCallback(() => setPinIndex(-1), [setPinIndex]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previous();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    },
    [previous, next]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <Transition.Root show={pinIndex > -1} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-20" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden focus:outline-none" tabIndex={0}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="group pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <EllipsisPopover
                      board={board}
                      pinIndex={pinIndex}
                      selfBoard={selfBoard}
                      editType="pin"
                      className="top-4 left-4"
                      overlay={false}
                      slideInFrom="left"
                    />

                    <div className="px-4 py-6 sm:px-6 border-b">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div className="divide-y divide-gray-200">
                      <div className="w-full py-6 bg-white flex justify-between items-center">
                        <div className="">
                          <button
                            type="button"
                            onClick={previous}
                            className="py-20 px-2 text-gray-500/40 hover:text-gray-500 sm:px-4 md:px-8"
                          >
                            <ChevronLeftIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                          </button>
                        </div>

                        <div className="relative overflow-hidden w-full max-w-sm rounded-lg shadow-md border bg-white">
                          {children}
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={next}
                            className="py-20 px-2 text-gray-500/40 hover:text-gray-500 sm:px-4 md:px-8"
                          >
                            <ChevronRightIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              First Optional Field Title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              <p>
                                Optional Field Content in a very long LOREM ipsum placeholder
                                paragraph. Optional Field Content in a very long LOREM ipsum
                                placeholder paragraph. Optional Field Content in a very long LOREM
                                ipsum placeholder paragraph.
                              </p>
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Second Optional Field Title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              Optional Field Content
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
