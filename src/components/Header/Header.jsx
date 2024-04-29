import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SidebarTogglerBtn } from '../Buttons'
import { toggleSidebar } from '../../store/layoutSlice'
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.authSlice.auth.status);
  const authUser = useSelector((state) => state.authSlice.auth.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <header className="py-3 px-16 bg-[#0f0f0f] shadow shadow-[#0c0c0c] sticky top-0 z-50">
      <nav>
        <div className="flex items-center">
          <button onClick={handleSidebarToggle} className="mr-2 p-2 rounded-full hover:bg-black hover:opacity-80 hover:backdrop-blur-sm">
            <SidebarTogglerBtn height={40} width={40} fill={'#fff'} />
          </button>
          {/* Youtube logo */}
          <div className="sticky top-0">
            <NavLink to="/" className="flex justify-start ml-5 items-center">
              <Logo />
            </NavLink>
          </div>

          <ul className="flex ml-auto flex-wrap text-sm md:text-2xl">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="flex items-center justify-center mx-2">
                  <button
                    className="inline-block px-6 py-2 duration-200 rounded-full hover:bg-black hover:opacity-80 text-xl"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            <li className="flex justify-center items-center">
              <div
                className="h-16 w-16 rounded-full"
                style={{
                  backgroundImage: `url(${authUser?.avatar})`,
                  backgroundSize: 'cover'
                }}
              >
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
