import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAllVideos } from '../api';
import { humanReadableDateTime } from '../utils/dateConverter';
import { PageWrapper } from '../components';


function SearchResultList() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params = {};
    const navigate = useNavigate();

    params.search = searchParams.get('search_query')
    params.sortBy = searchParams.get('sortBy')
    params.page = searchParams.get('page')
    params.limit = searchParams.get('limit')

    const [videos, setVideos] = useState([])

    useEffect(() => {
        getAllVideos(params)
            .then((response) => {
                setVideos(response)
            })
            .catch(err => console.error(err))
    }, [location.search])

    return (
        <PageWrapper>
            {videos?.length === 0 ?
                <div className='text-center font-semibold text-3xl '>Sorry ! No videos founds</div> :
                videos?.map(video => (
                    <div key={video._id}>
                        {/* Video wrapper */}
                        <div className='flex w-full gap-5 mt-5'>
                            {/* Thumbnail */}
                            <div className='w-[50%] sm:min-w-[40%] h-[100px] sm:h-[150px] md:h-[200px] lg:h-[281px] rounded-2xl hover:rounded-none flex justify-end items-end cursor-pointer'
                                style={{
                                    backgroundImage: `url(${video.thumbnail})`,
                                    backgroundSize: "cover"
                                }}
                                onClick={() => navigate(`/watch/${video._id}`)}
                            >
                                <span className=" mb-2 mr-2 p-1 rounded-md text-sm bg-black opacity-80  backdrop-blur-2xl">
                                    {video.duration.toFixed(2)}
                                </span>
                            </div>

                            {/* Video metadata */}
                            <div className='w-full '>
                                <p className='text-md sm:text-lg text-wrap cursor-pointer' onClick={() => navigate(`/watch/${video._id}`)}>{video.title}</p>
                                <span className="text-sm sm:text-md text-gray-500 mt-2">{video.views} views • {humanReadableDateTime(video.createdAt)}</span>

                                {/* channel logo */}
                                <div className="flex items-center mt-3">
                                    <div className='w-10 h-10 rounded-full cursor-pointer'
                                        onClick={() => navigate(`/channel/${video.owner?.username}`)}
                                        style={{
                                            backgroundImage: `url(${video.owner.avatar})`,
                                            backgroundSize: "cover"
                                        }}>
                                    </div>
                                    <div
                                        onClick={() => navigate(`/channel/${video.owner?.username}`)}
                                        className='ml-4 text-xl cursor-pointer'>{video.owner.username}</div>
                                </div>
                                <p className='mt-3 text-gray-300 text-md'>{video.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </PageWrapper>



    )
}

export default SearchResultList