import { useState } from 'react';
import { BsPerson, BsPersonCheck, BsLock, BsEnvelope } from 'react-icons/bs';
import { registerUser } from '../api';
import { Alert, LoadingSpinner } from '../components'
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/layoutSlice';

const Signup = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        password: '',
        email: '',
        avatar: null,
        coverImage: null
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            avatar: file
        });
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            coverImage: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('avatar', formData.avatar);
        formDataToSend.append('coverImage', formData.coverImage);

        registerUser(formDataToSend)
            .then(res => {
                console.log('res', res);

                if (res.success) {
                    setFormData({
                        username: '',
                        fullName: '',
                        password: '',
                        email: '',
                        avatar: null,
                        coverImage: null
                    })
                    setIsLoading(false);
                } else {
                    dispatch(setAlert({
                        alert: {
                            alertVisible: true,
                            alertMessage: res.msg,
                            alertType: 'error'
                        }
                    }))
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.log('err', err);
                setIsLoading(false)
            })
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
            <div className="bg-[#272727] p-8 rounded-lg shadow-lg bg-opacity-75">
                <h2 className="text-3xl font-bold mb-6">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-6" encType='multipart/form-data'>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <BsPerson className="mr-4" size={20} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <BsPersonCheck className="mr-4" size={20} />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <BsLock className="mr-4" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <BsEnvelope className="mr-4" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            onChange={handleAvatarChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-3">
                        <input
                            type="file"
                            accept="image/*"
                            name="coverImage"
                            onChange={handleCoverImageChange}
                            className="bg-transparent outline-none text-white flex-1 text-lg"
                        />
                    </div>

                    {
                        isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg">
                                Signup
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default Signup;
