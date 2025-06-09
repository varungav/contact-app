import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '../assets/sidemenu/Home.png';
import userIcon from '../assets/sidemenu/User.png';
import switchIcon from '../assets/sidemenu/Switch.png';
import cashIcon from '../assets/sidemenu/Cash.png';
import clipboardIcon from '../assets/sidemenu/Clipboard.png';
import cubeIcon from '../assets/sidemenu/Cube.png';
import newspaperIcon from '../assets/sidemenu/Newspaper.png';
import reportIcon from '../assets/sidemenu/report.png';
import creditIcon from '../assets/sidemenu/Credit.png';
import terminalIcon from '../assets/sidemenu/Terminal.png';
import eyeIcon from '../assets/sidemenu/Eye.png';
import settingsIcon from '../assets/sidemenu/settings.png';


interface SubItem {
  title: string;
}

interface SideBarItem {
  title: string;
  subItems: SubItem[];
  source: string;
  path?: string; 
}


interface DeveloperSideBarItem {
  title: string;
  source: string;
}


const SideMenu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  
  const handleNavigation = (index: number, path?: string) => {
    setActiveIndex(index);
    if (path) navigate(path);
  };
  
  
  
  const sideBarItems: SideBarItem[] = 
  [
    { title: "Overview", subItems: [], source: homeIcon, path: "/" },
    {
      title: "Products", source: userIcon, path: "/products",
      subItems: [
        { title: "Reviews" },
      { title: "Disputes" },
      { title: "Top-ups" },
      { title: "Check deposits" },
      { title: "Payouts" },
      { title: "All Transactions" },
    ],
  },
  { title: "Balances", subItems: [], source: switchIcon , path: "/balances" },
  { title: "Payments", subItems: [], source: cashIcon, path: "/payments" },
  { title: "Connected Accounts", subItems: [], source: clipboardIcon, path: "/accounts" },
  { title: "Products", subItems: [], source: cubeIcon, path: "/products2" },
  { title: "Readers", subItems: [], source: newspaperIcon, path: "/readers" },
  { title: "Reports", subItems: [], source: reportIcon, path: "/reports" },
  { title: "Issued Cards", subItems: [], source: creditIcon, path: "/cards" },
];

React.useEffect(() => {
  const matchedIndex = sideBarItems
    .map((item, index) => ({ index, path: item.path }))
    .filter(item => item.path && location.pathname.startsWith(item.path))
    .sort((a, b) => (b.path!.length - a.path!.length))
    .map(item => item.index)[0];

  if (matchedIndex !== undefined) {
    setActiveIndex(matchedIndex);
  }
}, [location.pathname]);


const developerSideBarItems: DeveloperSideBarItem[] = [
  { title: "Developers" , source: terminalIcon},
    { title: "View test data", source: eyeIcon },
    { title: "Settings" ,source: settingsIcon},
  ];
  
  const toggleMenu = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative h-screen bg-white border-r">
      <div className="flex items-center md:justify-start justify-end p-4">
        <h1 className="font-bold md:block hidden ml-3">Fake App</h1>
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      
      <div className={`fixed md:static top-16 left-0 z-20 bg-white h-screen ${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-60 overflow-y-auto`}>
        <div className='flex flex-col justify-between h-[calc(100vh-4rem)] overflow-y-auto p-4'>
        <div className='text-sm'>
        {sideBarItems.map((item, index) => (
          <div key={index}>
            <button
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${activeIndex === index
                    ? 'bg-nav_bar_selected text-nav_bar_text_selected rounded px-2 py-1 font-bold '
                    : 'text-[#252C32]'}`}
              onClick={() => handleNavigation(index, item.path)}
            >
              <img src={item.source} alt={item.title} className="w-6 h-6 mr-3" />
              <div
                className={`flex-1`}
              >
                {item.title}
              </div>
            </button>

            {item.subItems.length > 0 && activeIndex === index && (
              <div className="ml-10 mt-1 text-sm text-gray-600">
                {item.subItems.map((sub, subIndex) => (
                  <div key={subIndex} className="py-1 hover:text-blue-600"
                  onClick={() => navigate(`${item.path}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    {sub.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='text-sm'>
        {
          developerSideBarItems.map((item, index) => (
            <button onClick={() =>{toggleMenu(index+9)}} className={`hover:bg-gray-100  flex w-full items-center px-3 py-2 ${activeIndex === index+9 ? 'bg-nav_bar_selected text-nav_bar_text_selected rounded px-2 py-1 font-bold ' : 'text-[#252C32]'}`} key={index}><span className='mr-3'><img src={item.source} alt="" /></span> {item.title}</button>
          ))
        }
      </div>
      </div>
      </div>
    </div>
  );
};

export default SideMenu;
