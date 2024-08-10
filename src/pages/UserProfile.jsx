import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSpinner, PageWrapper } from '../components';
import { changeCurrentUserPassword, changeUserAvatar, changeUserCoverImage, updateAccountDetails } from '../api';
import { setAlert } from '../store/layoutSlice';
import { FaImage, FaUserEdit } from "react-icons/fa";
import { login } from '../store/authSlice';

function UserProfile() {

    const authUser = useSelector((state) => state.auth.auth.userData);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [coverImagePreview, setCoverImagePreview] = useState(null)

    const [isLoading, setIsLoading] = useState({
        updateDetailsFormLoading: false,
        changePasswordFormLoading: false,
        changeAvatarFormLoading: false,
        changeCoverImgFormLoading: false
    })


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        coverImage: null,
        avatar: null
    })

    const [changePasswordFormData, setChangePasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        setUser(authUser)
        setFormData(prev => ({
            fullName: user?.fullName,
            email: user?.email,
            avatar: user?.avatar,
            coverImage: user?.coverImage,
        }))
    }, [authUser, setUser])

    useEffect(() => {
        if (formData.avatar instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result)
            }
            const url = reader.readAsDataURL(formData?.avatar)
        }

        if (formData.coverImage instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                setCoverImagePreview(reader.result)
            }
            const url = reader.readAsDataURL(formData?.coverImage)
        }
    }, [formData.avatar, formData.coverImage])


    // USER DETAILS 
    const handleSubmitUserDetails = (e) => {
        e.preventDefault();
        setIsLoading(prev => ({ ...prev, updateDetailsFormLoading: true }))

        updateAccountDetails(formData)
            .then(res => {
                setIsLoading(prev => ({ ...prev, updateDetailsFormLoading: false }))
                if (res?.success) {
                    setUser(res.data)
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res.message,
                            alertType: 'success'
                        }
                    }))
                } else {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res?.msg,
                            alertType: 'error'
                        }
                    }))
                }
            })
            .catch(err => {
                setIsLoading(prev => ({ ...prev, updateDetailsFormLoading: false }))
                console.log('err', err);
            })

    }

    // CHANGE PASSWORD 
    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        setIsLoading(prev => ({ ...prev, changePasswordFormLoading: true }))
        changeCurrentUserPassword(changePasswordFormData)
            .then(res => {
                setIsLoading(prev => ({ ...prev, changePasswordFormLoading: false }))
                if (res?.success) {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res.message,
                            alertType: 'success'
                        }
                    }))
                } else {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res?.msg,
                            alertType: 'error'
                        }
                    }))
                }
            })
            .catch(err => {
                setIsLoading(prev => ({ ...prev, changePasswordFormLoading: false }))
                console.log('err', err);
            })
    }

    // CHANGE AVATAR 
    const handleChangeAvatar = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('avatar', formData.avatar);
        setIsLoading(prev => ({ ...prev, changeAvatarFormLoading: true }))

        changeUserAvatar(formDataToSend)
            .then(res => {
                if (res?.success) {
                    dispatch(login(res.data))
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res.message,
                            alertType: 'success'
                        }
                    }))
                    setAvatarPreview(null)
                } else {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res?.msg,
                            alertType: 'error'
                        }
                    }))
                }
                setIsLoading(prev => ({ ...prev, changeAvatarFormLoading: false }))
            })
            .catch(err => {
                setIsLoading(prev => ({ ...prev, changeAvatarFormLoading: false }))
                console.log('err', err);
            })
    }

    const handleChangeCoverImage = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('coverImage', formData.coverImage);
        setIsLoading(prev => ({ ...prev, changeCoverImgFormLoading: true }))

        changeUserCoverImage(formDataToSend)
            .then(res => {
                if (res?.success) {
                    dispatch(login(res.data))
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res.message,
                            alertType: 'success'
                        }
                    }))
                    setCoverImagePreview(null)
                } else {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res?.msg,
                            alertType: 'error'
                        }
                    }))
                }
                setIsLoading(prev => ({ ...prev, changeCoverImgFormLoading: false }))
            })
            .catch(err => {
                setIsLoading(prev => ({ ...prev, changeCoverImgFormLoading: false }))
                console.log('err', err);
            })
    }

    return (
        <PageWrapper>

            <div>
                {/* CoverImage  */}
                <div
                    className="w-full h-[150px] sm:h-[220px] md:h-[240px] rounded-2xl"
                    style={{ backgroundImage: `url(${coverImagePreview ? coverImagePreview : user?.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                </div>

                {/* user metadata and avatar  */}
                <div className='flex items-center mt-7'>
                    {/* left avatar section  */}
                    <div
                        style={{
                            backgroundImage: `url(${avatarPreview ? avatarPreview : user?.avatar})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        className='aspect-square rounded-full min-w-[140px] sm:min-w-[160px] md:min-w-[180px] max-w-[200px]'>
                    </div>

                    {/* right user meta data section  */}
                    <div className='ml-2 sm:ml-10'>
                        <p className="text-3xl">{user?.fullName}</p>
                        <span className="text-gray-500 mt-3">@{user?.username}</span>

                        <div className='flex mt-4 items-start justify-start gap-4 flex-col sm:flex-row'>
                            {avatarPreview ?
                                isLoading.changeAvatarFormLoading ?
                                    <div className='flex justify-start'>
                                        <LoadingSpinner />
                                    </div>
                                    :
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleChangeAvatar}
                                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save Avatar</button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setAvatarPreview(null)
                                                setFormData(prev => ({ ...prev, avatar: null }))
                                            }}
                                            className="ml-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xs px-3 py-1.5 sm:px-5 sm:py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                                    </div>
                                :
                                <button
                                    onClick={() => {
                                        document.getElementById('changeAvatarBtn').click();
                                    }}
                                    type="button"
                                    className="flex justify-center items-center  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm sm:text-md gap-2 px-3 sm:px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-nowrap">
                                    <FaUserEdit size={'1.2rem'} />
                                    Change avatar
                                </button>
                            }

                            {coverImagePreview ?
                                isLoading.changeCoverImgFormLoading ?
                                    <div className='flex justify-start mt-4'>
                                        <LoadingSpinner />
                                    </div>
                                    :
                                    <div className=''>
                                        <button
                                            type="button"
                                            onClick={handleChangeCoverImage}
                                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save Cover Image</button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCoverImagePreview(null)
                                                setFormData(prev => ({ ...prev, coverImage: null }))
                                            }}
                                            className="ml-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                                    </div>
                                :
                                <button
                                    onClick={() => {
                                        document.getElementById('changeCoverImageBtn').click();
                                    }}
                                    type="button"
                                    className="flex justify-center items-center  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm sm:text-md gap-2 px-3 sm:px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-nowrap">
                                    <FaImage size={'1.2rem'} />
                                    Change Cover Image
                                </button>
                            }
                        </div>
                        <input
                            type="file"
                            className='hidden'
                            id='changeAvatarBtn'
                            onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.files[0] }))} />
                        <input
                            type="file"
                            className='hidden'
                            id='changeCoverImageBtn'
                            onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }))} />

                    </div>
                </div>

                <div className='h-2 border-b-2 border-gray-300 my-6'>
                    {/* videos will go here  */}
                </div>
            </div>

            <div>

                {/* Full name and Email  */}
                <div>
                    <h1 className='text-3xl font-semibold mb-10'>Update user details</h1>
                    <form onSubmit={(e) => handleSubmitUserDetails(e)} className='lg:ml-16'>
                        <div className="lg:w-1/2 flex gap-2 items-center justify-between">
                            <label htmlFor="fullName" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name='fullName'
                                value={formData?.fullName ? formData?.fullName : ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter fullName here..." />

                        </div>
                        <div className="lg:w-1/2 flex gap-2 items-center justify-between mt-3">
                            <label htmlFor="email" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Email</label>
                            <input
                                type="text"
                                id="email"
                                name='email'
                                value={formData?.email ? formData?.email : ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter email here..." required />
                        </div>

                        {isLoading.updateDetailsFormLoading ?
                            <div className='flex justify-start mt-4'>
                                <LoadingSpinner />
                            </div>
                            :
                            <button type="submit" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                        }
                    </form>
                </div>

                {/* Change password  */}
                <div className='mt-12'>
                    <h1 className='text-3xl font-semibold mb-10'>Change password</h1>
                    <form onSubmit={(e) => handleSubmitChangePassword(e)} className='lg:ml-16'>
                        <div className="lg:w-1/2 flex gap-2 items-center justify-between">
                            <label htmlFor="oldPassword" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Current Password</label>
                            <input
                                type="text"
                                id="oldPassword"
                                value={changePasswordFormData.oldPassword ? changePasswordFormData.oldPassword : ''}
                                onChange={(e) => setChangePasswordFormData(prev => ({ ...prev, oldPassword: e.target.value }))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your current password..." />

                        </div>
                        <div className="lg:w-1/2 flex gap-2 items-center justify-between mt-3">
                            <label htmlFor="newPassword" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">New Password</label>
                            <input
                                type="text"
                                id="newPassword"
                                value={changePasswordFormData.newPassword ? changePasswordFormData.newPassword : ''}
                                onChange={(e) => setChangePasswordFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your new password..." required />
                        </div>
                        <div className="lg:w-1/2 flex gap-2 items-center justify-between mt-3">
                            <label htmlFor="confirmPassword" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Confirm Password </label>
                            <input
                                type="text"
                                id="confirmPassword"
                                value={changePasswordFormData.confirmPassword ? changePasswordFormData.confirmPassword : ''}
                                onChange={(e) => setChangePasswordFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your new password again..." required />
                        </div>

                        {isLoading.changePasswordFormLoading ?
                            <div className='flex justify-start mt-4'>
                                <LoadingSpinner />
                            </div>
                            :
                            <button type="submit" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                        }
                    </form>
                </div>


            </div>

        </PageWrapper>
    )
}

export default UserProfile