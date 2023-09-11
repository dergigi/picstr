import {
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

import { useLocalStore } from '@/logic/store';
import { joinClassNames } from '@/logic/utils';

const items = [
  {
    headers: ['Text:Content', 'Text:Title', 'Image:Image'],
    title: 'Create a new board of plain texts',
    description: 'e.g. a board of your favorite quotes',
    icon: DocumentTextIcon,
    background: 'bg-pink-600',
  },
  {
    headers: ['Link:Content', 'Text:Title', 'Image:Image'],
    title: 'Create a new board of links',
    description: 'e.g. a board of your favorite blog posts',
    icon: LinkIcon,
    background: 'bg-indigo-600',
  },
  {
    headers: ['Image:Content', 'Text:Title'],
    title: 'Create a new board of images',
    description: 'e.g. a board of your favorite memes or gifs',
    icon: PhotoIcon,
    background: 'bg-green-600',
  },
  {
    headers: ['Video:Content', 'Text:Title'],
    title: 'Create a new board of videos',
    description: 'e.g. a board of your favorite YouTube videos',
    icon: VideoCameraIcon,
    background: 'bg-blue-600',
  },
  {
    headers: ['Profile:Content'],
    title: 'Create a new board of NOSTR profiles',
    description: 'e.g. a board of nostr developers you admire',
    icon: UserIcon,
    background: 'bg-yellow-600',
  },
  {
    headers: ['Note:Content'],
    title: 'Create a new board of NOSTR notes',
    description: 'e.g. a board of your favorite notes about bitcoin',
    icon: ChatBubbleLeftIcon,
    background: 'bg-purple-600',
  },
];

export const FormatSelector = () => {
  const setBoardItem = useLocalStore((store) => store.setBoardItem);

  return (
    <ul role="list" className="grid grid-cols-1 gap-6">
      {items.map((item) => (
        <li key={item.title} className="flow-root">
          <div className="relative group -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
            <div
              className={joinClassNames(
                item.background,
                'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
              )}
            >
              <item.icon
                className="h-6 w-6 text-white duration-300 ease-in-out group-hover:w-8 group-hover:h-8"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                <div
                  onClick={() => {
                    setBoardItem('headers', item.headers);
                    setBoardItem('format', item.headers[0].split(':')[0]);
                  }}
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span>{item.title}</span>
                </div>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
