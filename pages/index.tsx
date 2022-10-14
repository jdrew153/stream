import type { NextPage } from 'next';
import dynamic from 'next/dynamic';




const Home: NextPage = () => {

  const ReactPlayer = dynamic(() => import('react-player'))

 

  return (
    <>
      <div>
          <ReactPlayer
            url='//142.93.115.176:8000/live/test.flv'
            controls

          />
        
      </div>
    </>
  )
}

export default Home
