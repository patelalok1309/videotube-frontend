import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAllVideos } from '../api';
import { humanReadableDateTime } from '../utils/dateConverter';


function SearchResultList() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params = {};

    params.search = searchParams.get('search_query')
    params.sortBy = searchParams.get('sortBy')
    params.page = searchParams.get('page')
    params.limit = searchParams.get('limit')

    const [videos, setVideos] = useState([])

    useEffect(() => {
        getAllVideos(params)
            .then((response) => {
                setVideos(response.docs)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='px-4 py-1 sm:px-16 sm:py-4 border-1 border-gray-300'>

            {videos?.length === 0 ?
                <div className='text-center font-semibold text-3xl '>Sorry ! No videos founds</div> :
                videos.map(video => (
                <>
                    {/* Video wrapper */}
                    <div className='flex w-full gap-5 mt-5'>
                        {/* Thumbnail */}
                        <div className='w-[50%] sm:min-w-[40%] h-[100px] sm:h-[150px] md:h-[200px] lg:h-[281px] rounded-2xl hover:rounded-none flex justify-end items-end'
                            style={{
                                backgroundImage: `url(${video.thumbnail})`,
                                backgroundSize: "cover"
                            }}>
                            <span className=" mb-2 mr-2 p-1 rounded-md text-sm bg-black opacity-80  backdrop-blur-2xl">
                                {video.duration.toFixed(2)}
                            </span>
                        </div>

                        {/* Video metadata */}
                        <div className='w-full '>
                            <p className='text-md sm:text-lg text-wrap'>{video.title}</p>
                            <span className="text-sm sm:text-md text-gray-500 mt-2">{video.views} views • {humanReadableDateTime(video.createdAt) }</span>

                            {/* channel logo */}
                            <div className="flex items-center mt-3">
                                <div className='w-10 h-10 rounded-full' style={{
                                    backgroundImage: `url(${video.owner.avatar})`,
                                    backgroundSize: "cover"
                                }}></div>
                                <div className='ml-4 text-xl'>{video.owner.username}</div>
                            </div>
                            <p className='mt-3 text-gray-300 text-md'>{video.description}</p>
                        </div>
                    </div>
                </>

                ))
            }


        </div>



    )
}

export default SearchResultList