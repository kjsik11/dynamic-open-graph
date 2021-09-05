import { useState } from 'react';
import cn from 'classnames';
import { GetServerSideProps } from 'next';

// components
import { Input } from '@components/ui';
import Toggle from '@components/ui/Toggle';

// libs
import { useNoti } from '@lib/hooks/use-noti';

interface Props {
  darkMode: 'true' | 'false';
  type: 'jpeg' | 'png';
  size: { width: number; height: number };
  secondSize: { width: number; height: number };

  svgUrl: string;
}

export default function IndexPage({
  darkMode: darkModeQuery,
  type: typeQuery,
  size: sizeQuery,
  secondSize: secondSizeQuery,
  svgUrl: svgUrlQuery,
}: Props) {
  const [darkMode, setDarkMode] = useState(darkModeQuery === 'true');
  const [type, setType] = useState<'png' | 'jpeg'>(typeQuery ?? 'png');
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: Number(sizeQuery.width),
    height: Number(sizeQuery.height),
  });
  const [secondSize, setSecondSize] = useState<{ width: number; height: number }>({
    width: Number(secondSizeQuery.width),
    height: Number(secondSizeQuery.height),
  });
  const [svgUrl, setSvgUrl] = useState(svgUrlQuery ?? '');

  const { showNoti } = useNoti();

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
          <div className="mt-4">
            <Input
              label="Image url"
              placeholder="https://sample.png"
              value={svgUrl}
              onChange={(e) => setSvgUrl(e.target.value)}
            />
          </div>
          {svgUrl && (
            <div className="flex space-x-4 sm:space-x-0 sm:flex-col pt-4">
              <Input
                label="width"
                value={secondSize.width}
                onChange={(e) => {
                  if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value))
                    setSecondSize((prev) => ({ ...prev, width: Number(e.target.value) }));
                }}
              />
              <Input
                label="height"
                value={secondSize.height}
                onChange={(e) => {
                  if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value))
                    setSecondSize((prev) => ({ ...prev, height: Number(e.target.value) }));
                }}
              />
            </div>
          )}
        </div>
        <div
          id="image"
          className={cn(
            'cursor-pointer shadow-md hover:shadow-xl transition-shadow rounded-sm overflow-hidden h-full flex items-center justify-center',
          )}
        >
          {/*eslint-disable-next-line */}
          <a
            onClick={() => showNoti({ title: 'starting download...' })}
            className="flex"
            href={`/api?darkMode=${darkMode}&type=${type}&width=${size.width}&height=${size.height}&svgUrl=${svgUrl}&secondWidth=${secondSize.width}&secondHeight=${secondSize.height}`}
            download={`test.${type}`}
          >
            <svg
              version="1.1"
              className="transition-color duration-300 p-2"
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
            {svgUrl && (
              <svg
                viewBox="0 0 100 100"
                style={{
                  width:
                    (size.width + secondSize.width < 600 ? 600 : size.width + secondSize.width) / 6,
                  height: (size.height + secondSize.height) / 2,
                }}
              >
                <text x="50" y="60" textAnchor="middle">
                  +
                </text>
              </svg>
            )}
            {svgUrl && (
              <svg
                viewBox="0 0 100 100"
                style={{
                  backgroundColor: darkMode ? 'black' : 'white',
                  width: secondSize.width > 350 ? 350 : secondSize.width,

                  height: secondSize.height > 350 ? 350 : secondSize.height,
                }}
              >
                <image href={svgUrl} x="0" y="0" height="100" width="100" />
              </svg>
            )}
          </a>
        </div>
      </div>
      <p className="py-12 text-center px-8 break-all">
        What is this? This is a service that generates dynamic Open Graph images that you can embed
        in your meta tags. For each keystroke, headless chromium is used to render an HTML page and
        take a screenshot of the result which gets cached. Find out how this works and deploy your
        own image generator by visiting GitHub.
      </p>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/kjsik11/dynamic-open-graph"
        className="fixed right-0 top-0 w-20 h-20 github-corner"
        aria-label="View source on GitHub"
      >
        <svg width="80" height="80" viewBox="0 0 250 250">
          <path fill="black" d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="white"
            style={{ transformOrigin: '130px 106px' }}
            className="transition-all transform octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  return {
    props: {
      ...query,
      size: { width: query.width ?? 150, height: query.height ?? 150 },
      secondSize: { width: query.secondWidth ?? 150, height: query.secondHeight ?? 150 },
    }, // will be passed to the page component as props
  };
};
