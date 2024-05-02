import React, { useEffect, useRef, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SidebarTogglerBtn } from '../Buttons'
import { setSearchTerm, toggleSidebar } from '../../store/layoutSlice'
import Logo from "../Logo";
import { IoIosSearch } from "react-icons/io";
import { logout } from "../../store/authSlice";
import { logoutUser } from "../../api";

function Header() {
  const authStatus = useSelector((state) => state.authSlice.auth.status);
  const authUser = useSelector((state) => state.authSlice.auth.userData);
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar())
  }

  const handleSearchTerm = () => {
    dispatch(setSearchTerm(searchText))
    navigate(`/results?search_query=${encodeURIComponent(searchText)}`)
  }

  const handleLogout = () => {
    logoutUser()
      .then(res => {
        if (res.success) {
          window.localStorage.removeItem('accessToken');
          dispatch(logout())
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '/') {
        inputRef.current.focus();
      }
    }
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <header className="py-2 px-16 bg-[#0f0f0f] shadow shadow-[#0c0c0c] sticky top-0 z-50">
      <nav>
        <div className="flex items-center">
          <button onClick={handleSidebarToggle} className="mr-2 rounded-full hover:bg-black hover:opacity-80 hover:backdrop-blur-sm">
            <SidebarTogglerBtn height={40} width={40} fill={'#fff'} />
          </button>
          {/* Youtube logo */}
          <div className="sticky top-0">
            <NavLink to="/" className="flex justify-start ml-5 items-center">
              <Logo />
            </NavLink>
          </div>

          <div className="w-1/3">
            <div className="rounded-3xl border-2 border-[#222222] p-[1px] bg-[#222222] flex justify-start items-center">

              {/* searchBar  */}
              <input
                ref={inputRef}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('searchBtn').click();
                  }
                }}
                type="text"
                className="px-4 py-2 bg-[#121212] w-[90%] border-gray-600 rounded-l-3xl focus:border-gray-600 @apply focus:outline-gray-900 !important" />
              <button id="searchBtn" onClick={handleSearchTerm} className="rounded-r-3xl flex justify-center items-center px-5">
                <IoIosSearch className="w-full h-full " size={24} />
              </button>
            </div>
          </div>

          <ul className="flex ml-auto flex-wrap text-sm md:text-2xl">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="flex items-center justify-center mx-1">
                  <button
                    className="inline-block px-5 py-1 duration-200 rounded-full hover:bg-black hover:opacity-80 text-lg"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <>
                <li key={"logoutbtn"} className="flex items-center justify-center mx-1">
                  <button
                    className="inline-block px-5 py-1 duration-200 rounded-full hover:bg-black hover:opacity-80 text-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="flex justify-center items-center">
                  <div
                    className="h-12 w-12 rounded-full"
                    style={{
                      backgroundImage: `url(${authUser?.avatar})`,
                      backgroundSize: 'cover'
                    }}
                  >
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
