import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Alert, Header, Sidebar } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './api'
import { login as authLogin } from './store/authSlice'


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarVisible = useSelector((state) => state.layoutSlice.sidebar.isVisible)
  const alertVisible = useSelector((state) => state.layoutSlice.alert.alertVisible)
  const isUserExist = useSelector(state => state.authSlice.auth.status)

  useEffect(() => {
    if (!isUserExist) {
      getCurrentUser()
        .then(res => {
          if(res?.success){
            dispatch(authLogin(res.data));
          }
          else{
            navigate('/login')
          }
        })
        .catch(err => {
          console.error(err); 
          navigate('/');
        });
    }
  }, [dispatch, isUserExist]);

  return (
    <div className='bg-[#0f0f0f] text-white ' >
      <div className="flex">
        <div className="relative">
          <div className={`w-[25%] bg-[#0b0b0b] ${!sidebarVisible ? 'hidden' : ''} absolute top-0 left-0 z-10`} >
            <Sidebar />
          </div>
        </div>
        <div className="w-full">
          <Header />
          {alertVisible && (
            <Alert />
          )}
          <Outlet />
        </div>
      </div>
    </div >
  )
}

export default App
