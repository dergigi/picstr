import { useState } from 'react';

import { AuthorGroupMenu, BoardTypeMenu, CategoryMenu } from '@/ui/components/Menus';

export const FiltersNavbar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedBoardType, setSelectedBoardType] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="mb-2 px-4 pt-4 flex flex-wrap gap-4 sm:px-2">
        <div className="flex-1 min-w-fit md:w-56 md:flex-none">
          <AuthorGroupMenu />
        </div>
        <div className="w-full order-last md:w-72 md:order-none lg:w-96">
          <CategoryMenu selected={selectedCategory} setSelected={setSelectedCategory} />
        </div>
        <div className="ml-auto flex-1 min-w-fit md:w-72 md:flex-none">
          <BoardTypeMenu selected={selectedBoardType} setSelected={setSelectedBoardType} />
        </div>
      </div>
    </>
  );
};
