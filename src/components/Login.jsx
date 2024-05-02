import React, { useState } from 'react';
import { BsLock, BsEnvelope } from 'react-icons/bs';
import { loginUser } from '../api';
import { LoadingSpinner } from '../components'
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice'
import Cookies from 'js-cookie';
import  {  useNavigate }  from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('email', formData.email);

    loginUser(formData)
      .then(res => {
        if (res.success) {
          setFormData({
            password: '',
            email: '',
          })
          setIsLoading(false);
          dispatch(authLogin(res.data.user));
          navigate('/'); 
        } else {
          setIsLoading(false);
        }
      })
  };

  return (
    <div className=" min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
      <div className="bg-[#272727] p-8 rounded-lg shadow-lg bg-opacity-75">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6" encType='multipart/form-data'>
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

          {
            isLoading ? (
              <LoadingSpinner />
            ) : (
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg">
                Login
              </button>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default Login;
