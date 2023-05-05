'use client';

import Image from 'next/image';

import { useBoards } from '@/hooks';

type ItemsParams = {
  items: Pins | Boards;
};

const ItemsLoading = ({ items }: ItemsParams) => {
  const { eose } = useBoards();

  return (
    <>
      {!items.size && !eose ? (
        <button className="loading btn-xs btn rounded-none" />
      ) : !items.size && eose ? (
        <Image
          src="/empty.png"
          alt="Empty"
          width={200}
          height={200}
          className="mx-auto"
        />
      ) : null}
    </>
  );
};

export default ItemsLoading;
