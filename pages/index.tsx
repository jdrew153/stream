import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/navBar';
import ChatSection from '../components/chatSection';
import StreamChatList from '../components/streamChatList';




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

    if (videoWidth < 0) {
        setPlayerWidth(175)
    } else {
      setPlayerWidth(videoWidth)
      console.log(playerWidth)
    }
    
  };

  useEffect(() => {
    calculateVideoSize();
  }, [playerWidth])

  return (
    <>
    <NavBar/>
     <div className='w-screen h-screen fixed bg-black scrollbar-hide'>
      <div className='w-full h-full grid grid-rows-2  lg:grid-cols-3  gap-0'>
        <div className='flex justify-center  col-span-2 mt-1'>
        <ReactPlayer
          url='https://katykatjd.com/live/test.flv'
          controls
          width={playerWidth}
          height={playerWidth * (9/16)}
          style={{
            'minWidth': '250px'
          }}
          
        />
        </div>
       <div className='relative flex justify-end  z-50 lg:w-full mt-2 lg:mt-0 h-[calc(100%-4rem)] lg:h-[calc(100vh-4rem)]'>
          <StreamChatList/>
       </div>
      </div>
     </div>
    </>
  )
}

export default Home
