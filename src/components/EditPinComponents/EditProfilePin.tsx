import { useLocalStore } from '@/store';
import { useSearchParams } from 'react-router-dom';

export const EditProfilePin = () => {
  const [searchParams, _] = useSearchParams();
  const pinIndex = searchParams.get('i');

  const { headers, pins } = useLocalStore((store) => store.board);
  const setPin = useLocalStore((store) => store.setPin);

  return (
    <>
      <div>
        <label htmlFor="Content" className="flex flex-col">
          <span className="text-sm font-medium leading-6 text-gray-900">
            {`Pubkey (npub1 / nip05 nostr address / hex)`}
          </span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="Content"
            id="Content"
            autoComplete="off"
            autoFocus
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            value={pins && pinIndex != null ? pins[parseInt(pinIndex)]?.[0] : ''}
            onChange={(e) => {
              pinIndex != null && setPin(parseInt(pinIndex), 0, e.target.value);
            }}
          />
        </div>
      </div>

      {headers &&
        headers.length > 1 &&
        headers.slice(1).map((header, hIndex) => (
          <div key={hIndex}>
            <label htmlFor={header} className="flex flex-col">
              <span className="text-sm font-medium leading-6 text-gray-900">{header}</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name={header}
                id={header}
                autoComplete="off"
                tabIndex={hIndex + 2}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                value={pins && pinIndex != null ? pins[parseInt(pinIndex)]?.[hIndex + 2] : ''}
                onChange={(e) => {
                  pinIndex != null && setPin(parseInt(pinIndex), hIndex + 2, e.target.value);
                }}
              />
            </div>
          </div>
        ))}
    </>
  );
};
