import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Alert, Header, Sidebar } from './components'
import { useSelector } from 'react-redux'


function App() {

  const sidebarVisible = useSelector((state) => state.layoutSlice.sidebar.isVisible)
  const alertVisible = useSelector((state) => state.layoutSlice.alert.alertVisible)

  return (
    <div className='bg-[#0f0f0f] text-white '>
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
    </div>
  )
}

export default App
