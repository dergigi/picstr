import { useLocation } from 'react-router-dom';

import { joinClassNames } from '@/logic/utils';

export const MainContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div
      className={joinClassNames(
        'w-full h-full px-4 pb-6 xl:px-0 xl:pt-4',
        'mx-auto max-w-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-none',
        state?.backgroundLocation ? 'xl:mt-16' : 'xl:mt-28',
        className
      )}
    >
      {/* <div className="mb-5 xl:mt-2">
        <Breadcrumb />
      </div> */}

      {children}
    </div>
  );
};
