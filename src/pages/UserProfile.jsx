import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authSlice from '../store/authSlice'
import { Alert, LoadingSpinner } from '../components';
import { updateAccountDetails } from '../api';
import { setAlert } from '../store/layoutSlice';

function UserProfile() {

    const authUser = useSelector((state) => state.authSlice.auth.userData);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        coverImage: null,
        avatar: null
    })

    useEffect(() => {
        setUser(authUser)
        setFormData(prev => ({
            fullName: user?.fullName,
            email: user?.email,
            avatar: user?.avatar,
            coverImage: user?.coverImage,
        }))
    }, [authUser ,setUser])

    const handleSubmitUserDetails = (e) => {
        e.preventDefault();
        setIsLoading(true);

        updateAccountDetails(formData)
            .then(res => {
                setIsLoading(false)
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
                setIsLoading(false)
                console.log('err', err);
            })

    }


    return (
        <div className='px-4 py-2 sm:px-10 sm:py-4 md:px-16 md:py-10'>

            <div>
                {/* CoverImage  */}
                <div className="w-full h-[150px] sm:h-[220px] md:h-[240px] rounded-2xl" style={{ backgroundImage: `url(${user?.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                </div>

                {/* user metadata and avatar  */}
                <div className='flex items-center mt-7'>
                    {/* left avatar section  */}
                    <div className='aspect-square min-w-[140px] sm:min-w-[160px] md:min-w-[180px] max-w-[200px]'>
                        <img src={`${user?.avatar}`} alt="avatar" className='rounded-full w-full h-full' />
                    </div>

                    {/* right user meta data section  */}
                    <div className='ml-2 sm:ml-10'>
                        <p className="text-3xl">{user?.fullName}</p>
                        <span className="text-gray-500 mt-3">@{user?.username}</span>
                    </div>
                </div>

                <div className='h-2 border-b-2 border-gray-300 my-6'>
                    {/* videos goes here  */}
                </div>
            </div>

            {/* User details */}
            <div>
                <h1 className='text-3xl font-semibold mb-10'>Update user details</h1>
                <form onSubmit={(e) => handleSubmitUserDetails(e)}>
                    <div className="md:w-1/2 flex gap-2 items-center justify-between">
                        <label htmlFor="fullName" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name='fullName'
                            value={formData?.fullName ? formData?.fullName : ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter fullName here..." />

                    </div>
                    <div className="md:w-1/2 flex gap-2 items-center justify-between mt-3">
                        <label htmlFor="email" className="block mb-2 text-xl font-normal text-gray-900 dark:text-white text-nowrap">Email</label>
                        <input
                            type="text"
                            id="email"
                            name='email'
                            value={formData?.email ? formData?.email : ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter email here..." required />
                    </div>

                    {isLoading ?
                        <div className='flex justify-start mt-4'>
                            <LoadingSpinner />
                        </div>
                        :
                        <button type="submit" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default UserProfile