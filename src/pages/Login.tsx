import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/" className="inline-flex items-center group">
                <img
                  className="h-10 w-auto"
                  src="/assets/pinstr.png"
                  alt="Pinstr"
                />
                <span className="ml-2 text-lg font-bold transition-transform duration-500 group-hover:translate-x-1">
                  Pinstr
                </span>
              </Link>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to your NOSTR account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 font-light">
                What is NOSTR?{' '}
                <a
                  href="https://nostr.com"
                  className="font-light text-blue-600 hover:text-blue-500 hover:underline"
                >
                  learn on nostr.com
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="nsec"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Your Secret Key
                    </label>
                    <div className="mt-2">
                      <input
                        id="nsec"
                        name="nsec"
                        type="text"
                        autoComplete="off"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-purple-800 px-3 py-1.5 text-white"
                  >
                    <span className="text-sm font-semibold leading-6">
                      Browser Extension (Recommended)
                    </span>
                  </a>
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-500 font-light">
                  Don't have an extension?{' '}
                  <a
                    href="https://getalby.com/"
                    className="font-light text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    get yours from Alby
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/jack_nostr.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
