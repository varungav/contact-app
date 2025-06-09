import React from 'react'
import feedbackIcon from '../assets/feedback.png';
import bellIcon from '../assets/Bell.png';
import questionIcon from '../assets/Question.png';
import userIcon from '../assets/User.png';

interface NavbarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ( {searchQuery, setSearchQuery}) => {
  return (
        <nav className="flex justify-between border-b">
          <form className="w-[40%] ml-8">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
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
              </div>
              <input
                type="search"
                placeholder="Search....."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-4 ps-10 text-[20px] text-gray-900 border-gray-300 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </form>

          <div className="flex py-3 pr-10 cursor-pointer">
            <div className="flex pt-2 px-4 items-center">
              <img src={feedbackIcon} alt="" className="mr-2" />
              <p>Feedback?</p>
            </div>
            <div className="flex">
              <div className="p-2">
                <img src={bellIcon} alt="" />
              </div>
              <div className="p-2">
                <img src={questionIcon} alt="" />
              </div>
              <div className="p-2">
                <img src={userIcon} alt="" />
              </div>
            </div>
          </div>
        </nav>
  )
}

export default Navbar
