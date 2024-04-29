import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSidebarVisibility } from '../store/layoutSlice';


function Home() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const res = getAllVideos()
      .then((response) => {
        setVideos(response.docs)
      })
  }, [setVideos])


  return (
    <div className='px-10 py-4 md:px-16 md:py-10  overflow-y-auto '>
      <div className="flex items-center justify-between flex-wrap gap-y-10 ">
        {
          videos?.map(
            (video) =>
              <div key={video._id} className="w-full sm:w-[48%] md:w-[31%] lg:w-[30%] xl:w-[30%] rounded-2xl shadow h-48" >
                <Link to={`/watch/${video._id}`}>
                  <div className="w-full h-full rounded-2xl " style={{ background: `url(${video.thumbnail})`, backgroundSize: 'cover' }}>
                    <div className="w-full h-full rounded-2xl flex items-end justify-end p-4 hover:bg-[rgba(0,0,0,0.5)] hover:backdrop-hue-rotate-60 z-10">
                      <span className="p-1 rounded-lg text-sm bg-black opacity-80  backdrop-blur-2xl">
                        {video.duration.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
                <p className="mt-1 text-lg">{video.title}</p>
              </div>
          )
        }
      </div>
    </div>
  )
}

export default Home