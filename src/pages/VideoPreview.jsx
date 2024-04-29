import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleVideo, isUserSubscribed, toggleSubscribe } from "../api";
import ReactPlayer from "react-player";
import { RoundedBtn } from "../components/Buttons";


function VideoPreview() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false)

    useEffect(() => {
        getSingleVideo(videoId)
            .then((response) => {
                setVideo(response?.data);
            });
    }, []);


    const handleSubscribe = (channelId) => {
        toggleSubscribe(channelId)
            .then((response) => {
                setIsSubscribed(response.data)
            })
    }

    useEffect(() => {
        if (video) {
            isUserSubscribed(video?.owner?._id)
                .then((response) => {
                    setIsSubscribed(!response?.data)
                })
        }
    }, [setVideo, handleSubscribe])


    return (
        <div className="px-16 py-8">
            <div className="w-[65%] h-[50%] rounded-lg">
                <ReactPlayer
                    url={`${video?.videoFile}`}
                    width="100%"
                    height="60vh"
                    controls
                    style={{ background: "black", "borderRadius": "20px", padding: '0 1rem' }}
                />
            </div>
            <div className="flex mt-3 justify-start items-center gap-2  ">
                <p className="text-5xl">{video?.title}</p>
            </div>
            <div className="mt-2">
                <p>{video?.description}</p>
            </div>

            <div className="mt-3 flex items-center">
                <div
                    className="h-14 w-14 rounded-full"
                    style={{
                        backgroundImage: `url(${video?.owner?.avatar})`,
                        backgroundSize: "cover",
                    }}>
                </div>
                <RoundedBtn
                    btnText={`${isSubscribed ? 'Subscribe' : 'Unsubscribe'}`}
                    classNames={` ml-4 font-semibold py-6 ${isSubscribed ? 'bg-gray-200 text-gray-950 hover:bg-gray-300' : ' bg-gray-300 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50'}`}
                    onClick={(param1) => handleSubscribe(param1)}
                    param1={video?.owner?._id}
                />
            </div>
        </div>
    );
}

export default VideoPreview;
