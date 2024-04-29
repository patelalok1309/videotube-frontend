import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAlert, setSidebarVisibility } from '../store/layoutSlice';
import { publishVideo } from '../api';
import { LoadingSpinner } from '../components';

function PublishVideo() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail: null,
        videoFile: null,
    })
    const [thumbnailPreview, setThumbnailPreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (formData.thumbnail) {
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnailPreview(reader.result)
            }
            const url = reader.readAsDataURL(formData?.thumbnail)
        }

    }, [formData.thumbnail])

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true)

        let error = false;
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
                console.log('formData[key]', key);
                dispatch(setAlert({
                    alert: {
                        alertVisible: true,
                        alertMessage: `${key} is required`,
                        alertType: 'success'
                    }
                }))
                error = true;
                break;
            }
        }
        if (error) {
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('thumbnail', formData.thumbnail)
        formDataToSend.append('videoFile', formData.videoFile)

        publishVideo(formDataToSend)
            .then(res => {
                if (res.success) {
                    console.log('res', res);
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: `Video published successfully`,
                            alertType: 'success'
                        }
                    }))
                }
                setIsLoading(false)
                setFormData({
                    title: '',
                    description: '',
                    thumbnail: null,
                    videoFile: null,
                })
            })
            .catch(err => setIsLoading(false))
    }


    return (
        <div className='p-16'>
            <h2 className='text-4xl text-fuchsia-100 mb-4'>Publish Video</h2>
            {/* video file form  */}
            <form encType='multipart/formdata' onSubmit={(e) => handleSubmit(e)}>
                {/* Title field */}
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Title</label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter title here..." />
                </div>

                {/* Description field */}
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Description</label>
                    <input
                        type="text"
                        name='description'
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter description here..." />
                </div>

                <p className='text-2xl'>Thumbnail</p>
                {formData.thumbnail ?
                    <>
                        <div
                            className='w-full h-96 border-2 relative'
                            style={{
                                backgroundImage: `url(${thumbnailPreview})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>

                            {/* Remove Preview Btn  */}
                            <span
                                className="w-14 h-14 flex justify-center items-center bg-[#131313] rounded-full bottom-5 right-5 absolute text-lg shadow-lg backdrop-blur-md hover:bg-[#333333]"
                                onClick={() => { setThumbnailPreview(null); setFormData((prev) => ({ ...prev, thumbnail: null })) }}
                            >
                                X
                            </span>
                        </div>
                    </> :
                    <>
                        {/* Thumbnail  Image  */}
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="thumbnail"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload thumbnail</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="thumbnail"
                                    name='thumbnail'
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }))}
                                />
                            </label>
                        </div>
                    </>
                }


                {/* Video File  */}
                <p className='text-2xl'>Video File</p>
                {formData.videoFile ?
                    <div className='w-full h-64 border-2 flex justify-center items-center font-semibold  flex-col'>
                        <p className='mb-2 text-3xl'>File Selected Successfully</p>
                        <small> video preview not availabel </small>
                    </div>
                    :
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="videoFile"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload video File</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    MP4 or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input id="videoFile" name='videoFile' type="file" className="hidden" onChange={(e) => setFormData((prev) => ({ ...prev, videoFile: e.target.files[0] }))}
                            />
                        </label>
                    </div>
                }

                {isLoading ?
                    <LoadingSpinner />
                    :
                    <button type="submit" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-8 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                }
            </form>

        </div>
    )
}

export default PublishVideo