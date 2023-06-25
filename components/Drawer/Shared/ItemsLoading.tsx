'use client';

import Image from 'next/image';

type ItemsParams = {
  items: Pin[] | Board[];
  eose: boolean;
};

const ItemsLoading = ({ items, eose }: ItemsParams) => {
  return (
    <>
      {!items.length && !eose ? (
        <span className="loading loading-ball loading-md mx-auto" />
      ) : !items.length && eose ? (
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
