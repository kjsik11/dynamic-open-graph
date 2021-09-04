import { useState } from 'react';
import cn from 'classnames';
import { GetServerSideProps } from 'next';

// components
import { Input } from '@components/ui';
import Toggle from '@components/ui/Toggle';

interface Props {
  darkMode: 'true' | 'false';
  type: 'jpeg' | 'png';
  size: { width: number; height: number };
}

export default function IndexPage({
  darkMode: darkModeQuery,
  type: typeQuery,
  size: sizeQuery,
}: Props) {
  const [darkMode, setDarkMode] = useState(darkModeQuery === 'true');
  const [type, setType] = useState<'png' | 'jpeg'>(typeQuery ?? 'png');
  const [size, setSize] = useState<{ width: number; height: number }>(
    sizeQuery ?? { width: 150, height: 150 },
  );

  return (
    <div className={cn('mx-auto max-w-screen-lg p-4 h-full')}>
      <p className="text-3xl font-bold text-center my-12">Open Graph Image as a Service</p>
      <div className="sm:flex sm:justify-center sm:space-x-36">
        <div className="pb-8">
          <div className="flex text-sm items-center space-x-2 justify-center mb-4">
            <p>LightMode</p>
            <Toggle
              className={cn(!darkMode ? 'bg-gray-200' : 'bg-sky-400')}
              enabled={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
            <p>DarkMode</p>
          </div>
          <div className="flex text-sm items-center space-x-2 justify-center pl-2">
            <p>png</p>
            <Toggle
              className={cn(type === 'png' ? 'bg-gray-200' : 'bg-sky-400')}
              enabled={type === 'jpeg'}
              onChange={() => setType((prev) => (prev === 'png' ? 'jpeg' : 'png'))}
            />
            <p>jpeg</p>
          </div>
          <div className="flex space-x-4 sm:space-x-0 sm:flex-col pt-4">
            <Input
              label="width"
              value={size.width}
              onChange={(e) => {
                if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value))
                  setSize((prev) => ({ ...prev, width: Number(e.target.value) }));
              }}
            />
            <Input
              label="height"
              value={size.height}
              onChange={(e) => {
                if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value))
                  setSize((prev) => ({ ...prev, height: Number(e.target.value) }));
              }}
            />
          </div>
        </div>
        <div
          id="image"
          className={cn(
            'cursor-pointer shadow-md hover:shadow-xl transition-shadow rounded-sm overflow-hidden h-full flex items-center justify-center',
          )}
        >
          {/*eslint-disable-next-line */}
          <a
            href={`/api?darkMode=${darkMode}&type=${type}&width=${size.width}&height=${size.height}`}
            download={`test.${type}`}
          >
            <svg
              version="1.1"
              className="transition-color duration-300 m-2"
              style={{
                backgroundColor: darkMode ? 'black' : 'white',
                width: size.width > 350 ? 350 : size.width,
                height: size.height > 350 ? 350 : size.height,
              }}
              fill={darkMode ? 'white' : 'black'}
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512.003 512.003"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M351.98,0c-27.296,1.888-59.2,19.36-77.792,42.112c-16.96,20.64-30.912,51.296-25.472,81.088
								c29.824,0.928,60.64-16.96,78.496-40.096C343.916,61.568,356.556,31.104,351.98,0z"
                />
              </g>
              <g>
                <path
                  d="M459.852,171.776c-26.208-32.864-63.04-51.936-97.824-51.936c-45.92,0-65.344,21.984-97.248,21.984
							c-32.896,0-57.888-21.92-97.6-21.92c-39.008,0-80.544,23.84-106.88,64.608c-37.024,57.408-30.688,165.344,29.312,257.28
							c21.472,32.896,50.144,69.888,87.648,70.208c33.376,0.32,42.784-21.408,88-21.632c45.216-0.256,53.792,21.92,87.104,21.568
							c37.536-0.288,67.776-41.28,89.248-74.176c15.392-23.584,21.12-35.456,33.056-62.08
							C387.852,342.624,373.932,219.168,459.852,171.776z"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
      <p className="py-12 text-center px-8">
        What is this? This is a service that generates dynamic Open Graph images that you can embed
        in your meta tags. For each keystroke, headless chromium is used to render an HTML page and
        take a screenshot of the result which gets cached. Find out how this works and deploy your
        own image generator by visiting GitHub. Proudly hosted on ▲Vercel
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  return {
    props: { ...query, size: { width: query.width, height: query.height } }, // will be passed to the page component as props
  };
};
