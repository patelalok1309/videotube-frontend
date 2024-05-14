import React from 'react'
import { humanReadableDateTime } from '../utils/dateConverter'
import { Link } from 'react-router-dom'

function VideoLayout({ videos }) {
    return (
        <div className="flex items-center justify-between flex-wrap gap-y-4 scroll-smooth">
            {
                videos?.map(
                    (video) =>
                        <div key={video._id} className="w-full sm:w-[48%] md:w-[31%] lg:w-[30%] xl:w-[30%] rounded-2xl shadow min-h-fit" >
                            <div className='w-full h-full'>
                                <Link to={`/watch/${video._id}`}>
                                    <div className="w-full h-48 rounded-2xl " style={{ background: `url(${video.thumbnail})`, backgroundSize: 'cover' }}>
                                        <div className="w-full h-full rounded-2xl flex items-end justify-end p-4 hover:bg-[rgba(0,0,0,0.5)] hover:backdrop-hue-rotate-60 z-10">
                                            <span className="p-1 rounded-lg text-sm bg-black opacity-80  backdrop-blur-2xl">
                                                {video.duration.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className='flex mt-2 text-wrap'>
                                    <Link to={`/channel/${video.owner.username}`}>
                                        <div className='flex justify-center items-center w-11 h-11 rounded-full' style={{ background: `url(${video?.owner.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                    </Link>
                                    <div className='ml-2 flex justify-start items-start flex-col'>
                                        <p className="text-xl">{video.title}</p>
                                        <span className="text-gray-400 text-sm">{video.owner.fullName}</span>
                                        <span className="text-gray-400 text-sm">{video.views} views • {humanReadableDateTime(video.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default VideoLayout