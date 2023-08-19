import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const BottomSlideover = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document
      .getElementById('bottom-slideover')
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Transition.Root show={true} appear={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(-1)}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden" tabIndex={0}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="pointer-events-none fixed inset-x-0 bottom-0 flex w-full h-full px-0 pt-12 overflow-y-auto md:px-10 lg:px-20"
              id="bottom-slideover"
            >
              <Transition.Child
                as={Fragment}
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full transition-transform duration-500 ease-out">
                  <div className="flex h-full w-full flex-col bg-white pt-6 shadow-xl rounded-t-md">
                    <div className="-mt-6 pt-16 min-h-full">
                      <Outlet />
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
