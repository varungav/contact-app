import React, { useState } from 'react';
import UserIcon from '../assets/Frame.png';
import CartIcon from '../assets/Frame (1).png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white">
      <div className="py-4 px-6 sm:px-12 lg:px-28 flex items-center justify-between">
        <div className="h-10 w-auto shrink-0">
          <h1 className="font-primary text-3xl cursor-pointer" onClick={() => navigate("/")}>FAKE STORE</h1>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex space-x-6 items-center">
          <div>Shop</div>
          <div>On Sale</div>
          <div>New Arrivals</div>
          <div>Brands</div>
        </div>

        <div className="hidden lg:flex w-1/3 relative">
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <input
            type="text"
            className="bg-[#F0F0F0] w-full py-2 pl-10 rounded-3xl outline-none"
            placeholder="Search for product..."
          />
        </div>

        <div className="hidden lg:flex items-center pl-6 space-x-4">
          <img src={UserIcon} alt="User" className="h-6 w-6 cursor-pointer" onClick={() => navigate('/product/cart')}/>
          <img src={CartIcon} alt="Cart" className="h-6 w-6 cursor-pointer"/>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-4 bg-white">
          <div className="flex flex-col space-y-2">
            <div>Shop</div>
            <div>On Sale</div>
            <div>New Arrivals</div>
            <div>Brands</div>
          </div>

          <div className="relative">
            <svg
              className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="text"
              className="bg-[#F0F0F0] w-full py-2 pl-10 rounded-3xl outline-none mt-2"
              placeholder="Search for product..."
            />
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <img src={UserIcon} alt="User" className="h-6 w-6" />
            <img src={CartIcon} alt="Cart" className="h-6 w-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
