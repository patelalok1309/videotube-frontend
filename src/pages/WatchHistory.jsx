import React, { useEffect, useState } from 'react'
import { PageWrapper } from '../components'
import { MdHistory } from 'react-icons/md'
import { getWatchHistory } from '../api'
import { humanReadableDateTime } from '../utils/dateConverter'
import { RiDeleteBin6Line } from "react-icons/ri";
function WatchHistory() {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (videos.length === 0) {
      getWatchHistory()
        .then(res => {
          console.log('res.data', res.data)
          const reverseVideos = res.data.reverse();
          setVideos(reverseVideos)
        })
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <PageWrapper>
      <h1 className="mt-3 text-3xl font-semibold flex items-center gap-4">Watch History <MdHistory /> </h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* left component */}
        <div className="md:col-span-3">
          {videos?.length === 0 ?
            <div className='text-center font-semibold text-3xl mt-24'>Sorry ! No videos founds</div> :
            videos?.map(video => (
              <div key={video._id}>
                <div className='flex w-full gap-5 mt-5 flex-wrap sm:flex-nowrap'>
                  <div className='w-full sm:w-[50%] aspect-video rounded-2xl hover:rounded-none flex justify-end items-end cursor-pointer'
                    style={{
                      backgroundImage: `url(${video.thumbnail})`,
                      backgroundSize: "cover"
                    }}
                    onClick={() => navigate(`/watch/${video._id}`)}>
                    <span className=" mb-2 mr-2 p-1 rounded-md text-sm bg-black opacity-80  backdrop-blur-2xl">
                      {video.duration.toFixed(2)}
                    </span>
                  </div>

                  {/* Video metadata */}
                  <div className='w-full'>
                    <p className='text-md sm:text-lg text-wrap cursor-pointer' onClick={() => navigate(`/watch/${video._id}`)}>{video.title}</p>
                    <span className="text-sm sm:text-md text-gray-500 mt-2">{video.views} views • {humanReadableDateTime(video.createdAt)}</span>

                    {/* channel logo */}
                    <div className="flex items-center mt-3">
                      <div className='w-10 h-10 rounded-full cursor-pointer'
                        onClick={() => navigate(`/channel/${video.owner[0]?.username}`)}
                        style={{
                          backgroundImage: `url(${video.owner[0].avatar})`,
                          backgroundSize: "cover"
                        }}>
                      </div>
                      <div
                        onClick={() => navigate(`/channel/${video.owner[0]?.username}`)}
                        className='ml-4 text-xl cursor-pointer'>{video.owner[0].username}</div>
                    </div>
                    <p className='mt-3 text-gray-300 text-md'>{video.description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* right component */}
        <div className="md:col-span-2 bg-dark border-l-2 p-4">
          <div className='flex items-center gap-2 mt-5'>
            <button
              type="button"
              // onClick={(handleChangeAvatar)}
              className="flex justify-center items-center  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm gap-2 px-3 sm:px-4 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-nowrap">
              <RiDeleteBin6Line size={'1.4rem'} />
              Clear all watch History
            </button>
          </div>

        </div>

      </div>


    </PageWrapper>
  )
}

export default WatchHistory