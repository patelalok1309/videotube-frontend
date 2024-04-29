import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo';
import { useDispatch } from 'react-redux';
import { setSidebarVisibility } from '../../store/layoutSlice';

function Sidebar() {

  const dispatch = useDispatch();
  const handleSidebarClick = () => {
    dispatch(setSidebarVisibility(false))
  }

  return (
    <div className='h-max flex flex-col items-center p-6 z-40 min-h-screen fixed top-0 left-0 bg-[#040404]'>
      {/* Youtube logo */}
      <div className="sticky top-0">
        <NavLink to="/" className="flex justify-center items-center">
          <Logo />
        </NavLink>
      </div>

      <div className="mt-14 rounded-2xl py-2 px-6 hover:bg-[#f9fafb1a] bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50  w-full">
        <NavLink className="flex items-center px-2" onClick={handleSidebarClick}>
          <svg enableBackground="new 0 0 24 24" height={'1rem'} viewBox="0 0 24 24" width={'1rem'} focusable="false" fill='#fff' style={{
              pointerEvents: "none",
              display: "inherit",
              width: "2.5rem",
              height: "2.5rem",
              fontWeight: 'bolder',
              paddingLeft: '0.5rem'
            }}
          >
            <path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z" />
          </svg>
          <p className='text-2xl font-medium ps-3 text-nowrap'>Home</p>
        </NavLink>
      </div>

      {/* Publish video */}
      <div className="mt-2 rounded-2xl py-2 px-6 hover:bg-[#f9fafb1a] bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50  w-full">
        <NavLink className="flex items-center px-2" to="/publishVideo" onClick={handleSidebarClick}>
          <svg
            enableBackground="new 0 0 24 24"
            height={'1rem'}
            viewBox="0 0 24 24"
            width={'1rem'}
            focusable="false"
            fill='#fff'
            style={{
              pointerEvents: "none",
              display: "inherit",
              width: "2.5rem",
              height: "2.5rem",
              fontWeight: 'bolder',
              paddingLeft: '0.5rem'
            }}
          >
            <path d="m22.01 4.91-.5-2.96L1.64 5.19 2 8v13h20V8H3.06l18.95-3.09zM5 9l1 3h3L8 9h2l1 3h3l-1-3h2l1 3h3l-1-3h3v11H3V9h2z"></path>
          </svg>
          <p className='text-2xl font-medium ps-3 text-nowrap'>Publish video</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
