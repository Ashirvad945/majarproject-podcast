import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  
  const [MobileNav, setMobileNav] = useState(false);

  const navLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Categories',
      path: '/categories',
    },
    {
      name: 'All podcasts',
      path: '/all-podcasts',
    },
    // {
    //   name: 'Profile',
    //   path: '/profile',
    // },
  ];

  const closeMobileNav = () => {
    setMobileNav(false);
  };

  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="logo brand-name w-2/6 flex items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjqKxn1dNj9PjbtXTKfqYAXc95fGxW2TX2wVSeGNR7Kg&s"
            alt="podcaster"
            className="h-12"
          />
          <Link to="/" className="text-2xl font-bold">
            Podcaster
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-2/6 text-xl lg:flex items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="ms-4 hover:font-semibold transition-all duration-300"
            >
              {items.name}
            </Link>
          ))}
        </div>

        {/* Login & Signup */}
        {/* <div className="hidden w-2/6 lg:flex items-center justify-end">
          <Link className="px-6 py-3 border border-black rounded-full">
            Login
          </Link>
          <Link className="ms-4 px-6 py-3 bg-black text-white rounded-full">
            Signup
          </Link>
        </div> */}



       <div className="hidden w-2/6 lg:flex items-center justify-end">
      {!isLoggedIn && (<>
        <Link
            to="/login"
            className="px-6 py-3 border border-black rounded-full"
            // onClick={closeMobileNav}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="ms-4 px-6 py-3 bg-black text-white rounded-full"
            //onClick={closeMobileNav}
          >
            Signup
          </Link>
      </>)}

      {isLoggedIn &&     <Link
            to="/profile"
            className="ms-4 px-6 py-3 bg-black text-white rounded-full"
            //onClick={closeMobileNav}
          >
            Profile
          </Link>}
       </div>





        {/* Mobile Navigation Toggle */}
        <div className="w-4/6 flex items-center justify-end lg:hidden z-[1000]">
          <button
            className={`text-4xl ${
              MobileNav ? 'rotate-360' : 'rotate-180'
            } transition-all duration-300`}
            onClick={() => setMobileNav(!MobileNav)}
          >
            {MobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          MobileNav ? 'translate-y-0' : 'translate-y-[100%]'
        } transition-transform duration-500 ease-in-out`}
      >
        {/* <div className="p-8 flex items-center justify-end text-4xl">
          <button
            onClick={() => setMobileNav(!MobileNav)}
            className="bg-black text-white rounded-full p-2"
          >
            <RxCross2 />
          </button>
        </div> */}






        <div className="h-full flex flex-col items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              onClick={closeMobileNav}
            >
              {items.name}
            </Link>
          ))}

          <Link
            to="/login"
            className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            onClick={closeMobileNav}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            onClick={closeMobileNav}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
