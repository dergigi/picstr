import {
  BoltIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { useParams } from 'react-router-dom';

import {
  LinkGrid,
  NoteGrid,
  PeopleGrid,
  PictureGrid,
  VideoGrid,
} from '@/components';

export default function Board() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
      <div className="relative">
        <div className="-mt-16 bg-gray-200 rounded-t-md">
          <img
            className="h-52 w-full object-cover object-center md:rounded-t-md xl:h-64"
            src="https://source.unsplash.com/random/?nature"
            alt="banner nature"
          />
        </div>

        <div className="mt-0 overflow-hidden bg-white shadow rounded-none w-full z-[1] xl:ml-12 xl:-mt-20 xl:w-72 xl:absolute xl:rounded-md">
          <div className="px-6 py-10 flex flex-col items-center">
            <img
              className="-mt-20 h-28 w-28 object-cover object-center rounded-full absolute z-[2] xl:static xl:mt-0"
              src="https://source.unsplash.com/random/?avatar"
              alt="avatar"
            />

            <span className="mt-12 font-bold xl:mt-4">fiatjaf</span>
            <span className="mt-1 text-xs font-light text-gray-500">
              _@fiatjaf.com
            </span>
            <span className="mt-2 text-sm font-light text-gray-500 text-center">
              dynamic group of individuals who are passionate about what we do
              and dedicated
            </span>

            <button
              tabIndex={-1}
              className="mt-4 inline-flex justify-center items-center rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80"
            >
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-100 p-6 py-16 xl:pl-[24rem] xl:pr-12">
          <div className="grid grid-cols-1 lg:grid-cols-1">
            <div className="gap-8 flex flex-col lg:flex-row">
              <div className="mx-auto lg:mx-0">
                <div className="w-64 aspect-w-4 aspect-h-3 rounded-md bg-gray-200">
                  <img
                    src={
                      'https://source.unsplash.com/random/?developer&sig=' +
                      Math.random()
                    }
                    alt=""
                    className="w-full h-full object-cover object-center rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-center lg:items-start">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 text-center lg:text-start xl:text-2xl">
                    {boardName}
                  </h2>

                  <div className="mt-2 inline-flex w-full justify-center gap-1 text-xs font-light text-black/30 lg:gap-2 lg:justify-start">
                    <span>Nostr Profiles (Kind: 30000)</span>
                    <span>|</span>
                    <span>Technology</span>
                    <span>|</span>
                    <span>18 days ago</span>
                  </div>
                </div>

                <p className="mt-4 text-sm font-light text-gray-500 text-center max-w-screen-sm lg:max-w-none lg:text-justify lg:mt-auto">
                  We’re a dynamic group of individuals who are passionate about
                  what we do and dedicated to delivering the best results for
                  our clients.
                </p>

                <div className="mt-4 flex gap-4 lg:mt-auto">
                  <button
                    tabIndex={-1}
                    className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800"
                  >
                    <HandThumbUpIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="">21</span>
                  </button>
                  <button
                    tabIndex={-1}
                    className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800"
                  >
                    <BoltIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="">2100</span>
                  </button>
                  <button
                    tabIndex={-1}
                    className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800"
                  >
                    <ChatBubbleLeftIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    <span className="">4</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2"></div>
          </div>

          {boardName?.includes('Geek') ? (
            <PeopleGrid />
          ) : boardName?.includes('Encyclopedia') ? (
            <NoteGrid />
          ) : boardName?.includes('Zap') ? (
            <LinkGrid />
          ) : boardName?.includes('Pizza') ? (
            <PictureGrid />
          ) : boardName?.includes('Movies') ? (
            <VideoGrid />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
