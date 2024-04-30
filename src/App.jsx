import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Alert, Header, Sidebar } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './api'
import { login as authLogin } from './store/authSlice'


function App() {

  const dispatch = useDispatch();
  const sidebarVisible = useSelector((state) => state.layoutSlice.sidebar.isVisible)
  const alertVisible = useSelector((state) => state.layoutSlice.alert.alertVisible)
  const isUserExist = useSelector(state => state.authSlice.auth.status)

  if (!isUserExist) {
    getCurrentUser()
      .then(res => {
        dispatch(authLogin(res.data))
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='bg-[#0f0f0f] text-white ' >
      <div className="flex">
        <div className="relative">
          <div className={`w-[30%] bg-[#0b0b0b] ${!sidebarVisible ? 'hidden' : ''} absolute top-0 left-0 z-10`} >
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
