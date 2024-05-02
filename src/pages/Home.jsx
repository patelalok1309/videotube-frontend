import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../api';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pushVideos } from '../store/layoutSlice';
import { humanReadableDateTime } from '../utils/dateConverter';
import { VideoLayout } from '../components';


function Home() {

  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const videosOnStore = useSelector(state => state.layoutSlice.videos)

  useEffect(() => {
    if (videosOnStore.length === 0) {
      getAllVideos()
        .then((response) => {
          setVideos(response)
          dispatch(pushVideos(response))
        })
    } else {
      setVideos(videosOnStore[0])
    }
  }, [videosOnStore])

  return (
    <div className='px-4 py-2 sm:px-10 sm:py-4 md:px-16 md:py-10  overflow-y-auto '>
      {/* <div className="flex items-center justify-between flex-wrap gap-y-24  mb-10">
        {
          videos?.map(
            (video) =>
              <div key={video._id} className="w-full sm:w-[48%] md:w-[31%] lg:w-[24%] xl:w-[24%] rounded-2xl shadow h-44" >
                <Link to={`/watch/${video._id}`}>
                  <div className="w-full h-full rounded-2xl " style={{ background: `url(${video.thumbnail})`, backgroundSize: 'cover' }}>
                    <div className="w-full h-full rounded-2xl flex items-end justify-end p-4 hover:bg-[rgba(0,0,0,0.5)] hover:backdrop-hue-rotate-60 z-10">
                      <span className="p-1 rounded-lg text-sm bg-black opacity-80  backdrop-blur-2xl">
                        {video.duration.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className='flex mt-1 text-wrap'>
                  <div className='flex justify-center items-center w-10 h-10 rounded-full' style={{ background: `url(${video?.channel.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  </div>
                  <div className='ml-2 flex justify-start items-start flex-col'>
                    <p className="text-xl">{video.title}</p>
                    <span className="text-gray-400 text-sm">{video.channel.fullName}</span>
                    <span className="text-gray-400 text-sm">{video.views} views • {humanReadableDateTime(video.createdAt)}</span>
                  </div>
                </div>
              </div>
          )
        }
      </div> */}

      <VideoLayout videos={videos} />
    </div>
  )
}

export default Home