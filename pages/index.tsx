import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/navBar';
import ChatSection from '../components/chatSection';




const Home: NextPage = () => {

  const ReactPlayer = dynamic(() => import('react-player'));
  const [mediaSize, setMediaSize] = useState<String>();
  const [playerWidth, setPlayerWidth] = useState<number>(0);



  const getMediaSize = () => {
    // Get the area of the users medica screen (in px)
    const width = window.innerWidth;
    console.log(width)
    if (width >= 640 && width < 768 ) {
      setMediaSize('SMALL')
      console.log('phone screen')
    } else if (width >= 768 && width < 1024) {
      setMediaSize('MEDIUM')
      console.log('tablet screen')
    } else {
      setMediaSize('LARGE')
      console.log('pc screen')
    }
  }

  const calculateVideoSize = () => {
    const windowSize = window.innerWidth;
    const videoWidth = windowSize - 750;
    setPlayerWidth(videoWidth)
    console.log(playerWidth)
  };

  useEffect(() => {
    calculateVideoSize();
  }, [playerWidth])

  return (
    <>
    <NavBar/>
     <div className='w-screen h-screen relative bg-black scrollbar-hide'>
      <div className='w-full h-full grid grid-rows-2  lg:grid-cols-3  gap-0'>
        <div className='flex justify-center  col-span-2 mt-1'>
        <ReactPlayer
          url='http://katykatjd.com/live/test.flv'
          controls
          width={playerWidth}
          height={playerWidth / (16/9)}
          style={{
            'minWidth': '250px'
          }}
          
        />
        </div>
       <div className='relative flex justify-end w-screen lg:w-full h-[calc(100%-4rem)] lg:h-[calc(100vh-4rem)]'>
          <ChatSection/>
       </div>
      </div>
     </div>
    </>
  )
}

export default Home
