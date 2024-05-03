import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToWatchHistory, deleteComment, getSingleVideo, getVideoComments, incrementVideoViews, submitComment, toggleLike, toggleSubscribe, updateComment } from "../api";
import ReactPlayer from "react-player";
import { LikeDislikeButton, RoundedBtn, Verticledots } from "../components/Buttons";
import { humanReadableDateTime } from "../utils/dateConverter";
import { useSelector } from "react-redux";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

function VideoPreview() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [commentsList, setCommentsList] = useState([])
    const [totalComments, setTotalComments] = useState(0)
    const [commentDropdownState, setCommentDropdownState] = useState({})
    const [commentEditIndex, setCommentEditIndex] = useState(null)
    const [commentEditContent, setCommentEditContent] = useState('')
    const [isAddedToHistory, setIsAddedToHistory] = useState(false)

    const authUser = useSelector(state => state.authSlice.auth.userData)
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate('/login');
        }
    }, [authUser, navigate]);


    useEffect(() => {
        if (videoId) {
            getSingleVideo(videoId)
                .then((response) => {
                    setVideo(response?.data);
                    setLiked(response?.data.liked)
                    setIsSubscribed(response?.data.isUserSubscriberOfChannel)
                });

            if (!isAddedToHistory) {
                addToWatchHistory(videoId)
                    .then(res => console.log('res', res))
                    .catch(err => console.error(err))
            }
        }
    }, []);



    const handleToggleLike = () => {
        toggleLike('v', videoId)
            .then(res => {
                setLiked(res.data.likeStatus)
            })
            .catch(err => console.error(err))
    }

    const handleSubscribe = (channelId) => {
        toggleSubscribe(channelId)
            .then((response) => {
                setIsSubscribed(response?.data.subscribed)
            })
    }

    const handleIncrementViews = () => {
        if (video) {
            incrementVideoViews(videoId)
                .then(res => {
                    console.log('res', res);
                })
        }
    }

    const handleSubmitComment = () => {
        setComment("")
        if (video) {
            submitComment(video?._id, comment)
                .then(res => {
                    if (res.success) {
                        getVideoComments(videoId)
                            .then(response => {
                                setCommentsList(response?.data?.docs)
                                setTotalComments(response?.data.totalDocs)
                            })
                    }
                })
        }
    }

    const toggleCommentDropdown = (itemId) => {
        setCommentDropdownState(prevStates => ({
            ...prevStates,
            [itemId]: !prevStates[itemId]
        }))
    }

    const handleEditComment = (index, content) => {

        if (commentEditIndex === index) {
            setCommentEditIndex(null)
            return;
        }
        setCommentEditIndex(index)
        setCommentEditContent(content)
    }

    const handleUpdateComment = (commentId) => {
        updateComment(commentId, commentEditContent)
            .then(res => {
                console.log('res', res)
                setCommentEditContent('')
                setCommentEditIndex(null)
                getVideoComments(videoId)
                    .then(response => {
                        setCommentsList(response?.data?.docs)
                        setTotalComments(response?.data.totalDocs)
                    })
            })
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId)
            .then(res => {
                getVideoComments(videoId)
                    .then(response => {
                        setCommentsList(response?.data?.docs)
                        setTotalComments(response?.data.totalDocs)
                    })
            })
    }

    useEffect(() => {
        getVideoComments(videoId)
            .then(response => {
                setCommentsList(response?.data?.docs)
                setTotalComments(response?.data.totalDocs)
            })
    }, [updateComment, submitComment, deleteComment])

    return (

        <div className="px-4 py-2 md:px-16 md:py-8">
            {/* video Player section */}
            <section >
                <div className="w-fit md:w-[65%] h-[50%] rounded-lg">
                    <ReactPlayer
                        onEnded={handleIncrementViews}
                        url={`${video?.videoFile}`}
                        width={'100%'}
                        height={'auto'}
                        controls
                        style={{
                            background: "black",
                            borderRadius: '20px',
                            '@media (minWidth: 768px)': {
                                width: '100vw!important', // For devices with max width <= 768px, remove width
                                height: 'auto'
                            },
                        }}
                    />
                </div>
                <div className="flex mt-3 justify-start items-center gap-2  ">
                    <p className="text-4xl">{video?.title}</p>
                </div>
                <div className="mt-2">
                    <p>{video?.description}</p>
                </div>
            </section>

            {/* channel avatar , subscribeBtn/unsubscribe and like/unlike button */}
            <div className="mt-3 flex items-center flex-wrap">
                <Link to={`/channel/${video?.owner.username}`}>
                    <div
                        className="h-14 w-14 rounded-full"
                        style={{
                            backgroundImage: `url(${video?.owner?.avatar})`,
                            backgroundSize: "cover",
                        }}>
                    </div>
                </Link>
                <p className="ml-4 font-bold text-xl">{video?.owner?.fullName}</p>
                <RoundedBtn
                    btnText={`${isSubscribed ? 'Unsubscribe' : 'Subscribe'}`}
                    classNames={`text-md m-4 font-semibold px-4 py-2 
                    ${isSubscribed ? ' bg-gray-300 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50' : 'bg-gray-200 text-gray-950 hover:bg-gray-300'}`}
                    onClick={(param1) => handleSubscribe(param1)}
                    param1={video?.owner?._id}
                />
                <LikeDislikeButton liked={liked} handleLike={handleToggleLike} />
            </div>

            {/* Views , time and description */}
            <div className="w-full md:w-[65%] min-h-16 mt-2 rounded-2xl bg-gray-500 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white transition-colors duration-300 px-4 py-2">
                <div className="flex gap-4 items-center">
                    <p className="text-lg">{video?.views} views</p>
                    <span className="text-lg"> {humanReadableDateTime(video?.createdAt)} </span>
                </div>
                <p className="text-md mt-4">{video?.description}</p>
            </div>

            {/* Comment section  */}
            <section className="w-full md:w-[65%]">
                <h2 className="text-xl mt-6 font-semibold">{totalComments} Comments</h2>

                <div className="flex items-center mt-4">
                    <div className="h-14 w-14 mb-5 rounded-full" style={{
                        backgroundImage: `url(${authUser?.avatar})`,
                        backgroundSize: "cover",
                    }}>
                    </div>


                    {/* Post comment */}
                    <div className="w-full">
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            className="border-b-2 border-gray-700  focus:border-gray-300 pb-2 text-lg bg-transparent outline-none  ml-4 w-full"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.ctrlKey && e.key === 'Enter') {
                                    e.preventDefault();
                                    document.getElementById('submitCommentBtn').click();
                                }
                            }}
                        />

                        <div className="flex justify-end items-center mt-3 gap-4">

                            {/* Cancel comment button  */}
                            <RoundedBtn
                                btnText={"Clear"}
                                classNames={`text-md font-semibold  py-2 px-4 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50 flex items-center justify-center hover:bg-gray-500`}
                                onClick={() => setComment("")}
                                disabled={comment.length === 0}
                            />

                            {/* Submit comment button  */}
                            <RoundedBtn
                                id={'submitCommentBtn'}
                                btnText={"Comment"}
                                classNames={`text-md font-semibold px-4 py-2 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50 flex items-center justify-center ${comment.length === 0 ? 'bg-gray-300 cursor-not-allowed ' : 'bg-[#3ea6ff]'}`}
                                onClick={handleSubmitComment}
                                disabled={comment.length === 0}
                            />
                        </div>
                    </div>
                </div>


                {/* Comment lists  */}
                <div className="w-full mt-10">
                    {commentsList?.map(comment => (
                        <div key={comment?._id} className="flex items-center justify-between mt-8 w-full">
                            <div className="flex">
                                <Link to={`/channel/${comment?.owner.username}`}>
                                    <div className="min-h-12 min-w-12 rounded-full aspect-sq" style={{
                                        backgroundImage: `url(${comment?.owner.avatar})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}>
                                    </div>
                                </Link>
                                {commentEditIndex === comment?._id ?
                                    // Comment updation form 
                                    <div className="ml-6 w-full flex">
                                        <input type="text" id="comment" className="border-b-2 border-gray-700  focus:border-gray-300 pb-2 text-lg bg-transparent outline-none  ml-4 w-full" placeholder="Edit a comment" value={commentEditContent} onChange={(e) => setCommentEditContent(e.target.value)} />
                                        <div className="flex gap-2 justify-center items-center">
                                            {/* Submit comment button  */}
                                            <RoundedBtn
                                                btnText={"Save"}
                                                classNames={`text-md font-semibold px-4 py-1 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50 flex items-center justify-center ${commentEditContent.length === 0 ? 'bg-gray-300 cursor-not-allowed ' : 'bg-[#3ea6ff]'}`}
                                                onClick={() => handleUpdateComment(comment?._id)}
                                                disabled={commentEditContent.length === 0}
                                            />

                                            {/* Cancel comment button  */}
                                            <RoundedBtn
                                                btnText={"Clear"}
                                                classNames={`text-md font-semibold  py-1 px-4 bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50 flex items-center justify-center hover:bg-gray-500`}
                                                onClick={() => {
                                                    setCommentEditContent("")
                                                }}
                                                disabled={commentEditContent.length === 0}
                                            />
                                        </div>
                                    </div>
                                    :
                                    // Display Comment 
                                    <div className="ml-6">
                                        <div className="text-lg">
                                            <span className="text-gray-300">@{comment.owner.username}</span>
                                            <span className="text-gray-400 text-sm ml-3">{humanReadableDateTime(comment.createdAt)}</span>
                                        </div>
                                        <div className="mt-1">
                                            <p className="text-xl text-gray-100">{comment.content}</p>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="mr-4 relative">
                                <button
                                    className={`${comment?.owner._id === authUser?._id ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                    onClick={() => toggleCommentDropdown(comment._id)}>
                                    <Verticledots />
                                </button>

                                {commentDropdownState[comment?._id] && (comment?.owner._id === authUser?._id) && (
                                    <div className="rounded-lg outline-none bg-gray-500 bg-opacity-25 top-100 right-100 py-2 absolute flex flex-col backdrop-blur-2xl z-10">
                                        <button
                                            onClick={() => {
                                                handleEditComment(comment._id, comment.content)
                                                toggleCommentDropdown(comment._id)
                                            }}
                                            className="hover:bg-gray-500 text-xl flex items-center justify-start gap-3 py-2 px-4">
                                            <MdOutlineEdit size={32} />
                                            <p className="px-2">Edit</p>
                                        </button>

                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="hover:bg-gragy-500 px-4 py-2 text-xl flex items-center justify-center gap-3">
                                            <MdDeleteOutline size={32} />
                                            <p className="px-2">Delete</p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default VideoPreview;
