import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';

const people = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];

export default function PeopleGrid() {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <>
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-1 gap-x-8 gap-y-14 text-center sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 xl:grid-cols-2 2xl:grid-cols-3"
      >
        {people.map((person, index) => (
          <li
            key={index}
            className="relative group rounded-lg  transition-all duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <div className="absolute top-0 w-full">
              <img
                className="w-full h-24 bg-gray-200 rounded-lg object-center object-cover transition-all duration-500 group-hover:rounded-b-none"
                src={
                  'https://source.unsplash.com/random/?landscape&sig=' +
                  Math.random()
                }
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col pt-16">
              <div className="mx-auto rounded-full bg-gray-300 z-[1]">
                <img
                  className="aspect-1 w-24 h-24 rounded-full object-cover object-center transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
                  src={person.imageUrl}
                  alt=""
                />
              </div>
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              <div className="mt-6 mx-auto flex flex-col">
                <button
                  tabIndex={-1}
                  className="flex justify-center items-center rounded-full bg-gray-200 px-12 py-2 text-xs font-semibold text-gray-700 shadow-md transition-all duration-300 hover:shadow-lg hover:text-gray-900 hover:bg-gray-300"
                >
                  <PlusIcon className="-ml-1 w-4 h-4" />
                  <span className="ml-1">Follow</span>
                </button>
              </div>
            </div>

            <div className="mt-8 flex w-full border-t opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <a
                href="https://primal.net/note1"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 transition-all duration-300 hover:bg-gray-200 hover:text-gray-900"
              >
                Open with Primal
              </a>

              <button
                className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium hover:bg-gray-200 transition-all duration-300 hover:text-gray-900"
                onClick={() => setShownDetailsIndex(index)}
                tabIndex={-1}
              >
                View details
              </button>
            </div>

            <DetailsSlideover
              isShown={shownDetailsIndex === index}
              onClose={() => setShownDetailsIndex(-1)}
              details={people}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
