import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo';
import { useDispatch } from 'react-redux';
import { setSidebarVisibility } from '../../store/layoutSlice';
import { MdHistory, MdOutlineVideoCameraBack } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

function Sidebar() {

  const dispatch = useDispatch();
  const handleSidebarClick = () => {
    dispatch(setSidebarVisibility(false))
  }

  return (
    <div className='h-max flex flex-col items-center py-4 px-2 z-40 min-h-screen fixed top-0 left-0 bg-[#040404]'>
      {/* Youtube logo */}
      <div className="sticky top-0 mb-10de">
        <NavLink to="/" className="flex justify-center items-center">
          <Logo />
        </NavLink>
      </div>

      <SidebarTab icon={<IoHomeOutline size={'1.7rem'} />} navlink="/" text="Home" onClick={handleSidebarClick} />
      <SidebarTab icon={<MdOutlineVideoCameraBack size={'1.7rem'} />} navlink="/publishVideo" text="Publish video" onClick={handleSidebarClick} />

      <span className="w-full block border border-gray-300 my-4"></span>

      <SidebarTab icon={<MdHistory size={'1.7rem'} />} navlink="/feed/history" text="Watch history" onClick={handleSidebarClick} />
    </div>
  )
}

const SidebarTab = ({ icon, navlink, text, onClick }) => {
  return (
    <div className="mt-2 rounded-2xl py-2 px-3 hover:bg-[#f9fafb1a] bg-opacity-25 backdrop-filter backdrop-blur-md border-none text-white font-bold transition-colors duration-300 hover:bg-opacity-50  w-full">
      <NavLink className="flex items-center px-1" to={`${navlink}`} onClick={onClick}>
        {icon}
        <p className='text-lg font-medium ps-3 text-nowrap'>{text}</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
