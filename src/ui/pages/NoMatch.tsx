import { Link } from 'react-router-dom';

import { loader } from '@/logic/utils';

export const NoMatch = () => {
  return (
    <main className="relative object-cover isolate h-full">
      <img
        src={loader(
          `${import.meta.env.VITE_UNSPLASH_RANDOM_API_ENDPOINT}1280x720/?bird&sig=${Math.random()}`,
          {
            w: 1280,
            h: 720,
          }
        )}
        alt="Bird"
        className="absolute inset-0 -z-10 h-full w-full bg-gray-100 text-gray-100"
        loading="lazy"
      />
      <div className="flex flex-col justify-center items-center h-full bg-black/30">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/" className="text-sm font-semibold leading-7 text-white">
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};
