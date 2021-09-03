/**
 * @template PageComponent
 */

import { useEffect,  useState } from 'react';
import NextLink from 'next/link'
import { Button } from '@components/ui';
import { GetServerSideProps } from 'next';


interface Props {
darkMode:'true'|'false'
}

export default function IndexPage({darkMode:darkModeQuery}:Props) {

	const [darkMode,setDarkMode] = useState((darkModeQuery==='true'))


  return (
	  <div className='mx-auto max-w-screen-lg pt-4'>
		<div className="flex justify-center space-x-20">
			<div>
				<Button onClick={()=>setDarkMode((prev)=>!prev)}>{darkMode?'lightMode':'Darkmode'}</Button>
			</div>
			<div id='image' className='w-40 h-40 cursor-pointer border border-gray-400' >
				{/*eslint-disable-next-line */}
				<a href={`/api?darkMode=${darkMode}`} download='test.png'>
						<svg version="1.1" style={{backgroundColor:darkMode?'black':'white'}} fill={darkMode?'white':'black'} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 512.003 512.003" xmlSpace="preserve">
							<g>
								<path d="M351.98,0c-27.296,1.888-59.2,19.36-77.792,42.112c-16.96,20.64-30.912,51.296-25.472,81.088
								c29.824,0.928,60.64-16.96,78.496-40.096C343.916,61.568,356.556,31.104,351.98,0z"/>
							</g>
							<g>
							<path d="M459.852,171.776c-26.208-32.864-63.04-51.936-97.824-51.936c-45.92,0-65.344,21.984-97.248,21.984
							c-32.896,0-57.888-21.92-97.6-21.92c-39.008,0-80.544,23.84-106.88,64.608c-37.024,57.408-30.688,165.344,29.312,257.28
							c21.472,32.896,50.144,69.888,87.648,70.208c33.376,0.32,42.784-21.408,88-21.632c45.216-0.256,53.792,21.92,87.104,21.568
							c37.536-0.288,67.776-41.28,89.248-74.176c15.392-23.584,21.12-35.456,33.056-62.08
							C387.852,342.624,373.932,219.168,459.852,171.776z"/>
							</g>
						</svg>
					</a>
				</div>
			</div>
		</div>
  );
}


export  const getServerSideProps:GetServerSideProps = async(context) => {
const query = context.query
	return {
	  props: {...query}, // will be passed to the page component as props
	}
  }