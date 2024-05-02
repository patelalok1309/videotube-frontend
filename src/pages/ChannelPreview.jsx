import React, { useEffect, useState } from 'react'
import { RoundedBtn } from '../components/Buttons'
import { useParams } from 'react-router-dom'
import { getChannelDetails, toggleSubscribe } from '../api';
import { VideoLayout } from '../components';

function ChannelPreview() {

    const { channelUsername } = useParams();

    const [activeTab, setActiveTab] = useState('videos')
    const [channel, setChannel] = useState(null)


    useEffect(() => {
        getChannelDetails(channelUsername)
            .then(res => {
                if (res.success) {
                    setChannel(res.data)
                }
            })
    }, [])

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    const handleSubscribe = (channelId) => {
        toggleSubscribe(channelId)
            .then((response) => {
                setChannel((prev) => ({ ...prev, isSubscribed: response?.data.subscribed }))
            })
    }

    return (
        <div className='px-4 py-2 sm:px-10 sm:py-4 md:px-16 md:py-10'>

            {/* CoverImage  */}
            <div className="w-full h-[150px] sm:h-[220px] md:h-[240px] rounded-2xl" style={{ backgroundImage: `url(${channel?.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            </div>

            {/* Channel metadata and avatar  */}
            <div className='flex items-center mt-7'>
                {/* left avatar section  */}
                <div className='aspect-square min-w-[140px] sm:min-w-[160px] md:min-w-[180px] max-w-[200px]'>
                    <img src={`${channel?.avatar}`} alt="avatar" className='rounded-full w-full' />
                </div>

                {/* right channel meta data section  */}
                <div className='ml-2 sm:ml-10'>
                    <p className="text-3xl">{channel?.fullName}</p>

                    <span className="text-gray-500 mt-3">@{channel?.username} • {channel?.subscibersCount} subscribers • {channel?.videosCount} videos</span>

                    <p className="text-sm text-wrap text-gray-300">
                        Description    &nbsp;&nbsp;
                        {channel?.videos[0].description.slice(0, 50)}...
                    </p>
                    {/* subscribe Button  */}
                    <div className='mt-3'>
                        <RoundedBtn
                            btnText={`${channel?.isSubscribed ? 'Unsubscribe' : 'Subscribe'}`}
                            classNames={`text-sm font-semibold ${channel?.isSubscribed ? ' bg-gray-300 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50' : 'bg-gray-200 text-gray-950 hover:bg-gray-300'}`}
                            onClick={(param1) => handleSubscribe(param1)}
                            param1={channel?._id}
                        />
                    </div>
                </div>
            </div>

            {/* Navigator  */}
            <div className="w-full border-b border-gray-500 mt-3 mb-6 flex gap-6">
                <NavTab activeTab={activeTab} active="videos" tabText="Videos" onClick={handleTabClick} />
                <NavTab activeTab={activeTab} active="playlists" tabText="Playlists" onClick={handleTabClick} />
            </div>


            {/* Display channel content  */}
            <div className="w-full">
                {activeTab === 'videos' && (
                    <VideoLayout videos={channel?.videos} />
                )}
            </div>
        </div>
        // page wrapper 
    )
}

const NavTab = ({ activeTab, active, tabText, onClick }) => {
    return (
        <button
            onClick={() => onClick(active)}
            className={`${activeTab === active ? 'text-gray-300 border-b-4 border-gray-300' : 'text-gray-400 hover:border-b-4 border-gray-400'} py-2  font-semibold`}>
            {tabText ? tabText : active}
        </button>
    )
}

export default ChannelPreview


