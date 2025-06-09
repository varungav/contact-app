import React from 'react';

const Footer = () => {
  return (
    <div className='px-4 md:px-24 pt-20 md:pt-36 bg-[#0000001A]'>
      <div className='border-b border-gray-300 pb-6'>
        <div className='flex flex-wrap gap-y-10 md:gap-0'>
          {/* Left block */}
          <div className="w-full md:max-w-sm flex flex-col md:pr-10">
            <h1 className='mb-6 font-normal font-primary text-4xl'>FakeStore</h1>
            <p className='py-6'>We have clothes that suit your style and which you’re proud to wear. From women to men.</p>
            <div className='flex gap-4'>
              <img src="src/assets/1.png" alt="" />
              <img src="src/assets/2.png" alt="" />
              <img src="src/assets/3.png" alt="" />
              <img src="src/assets/4.png" alt="" />
            </div>
          </div>

          {/* Links grid */}
          <div className="w-full md:flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 md:mt-0 md:pl-10">
            <div>
              <h1 className='mb-4 font-medium text-base'>Company</h1>
              <ul className='space-y-2 text-sm'>
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h1 className='mb-4 font-medium text-base'>Help</h1>
              <ul className='space-y-2 text-sm'>
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h1 className='mb-4 font-medium text-base'>FAQ</h1>
              <ul className='space-y-2 text-sm'>
                <li>Account</li>
                <li>Manage Deliverables</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div>
              <h1 className='mb-4 font-medium text-base'>Resources</h1>
              <ul className='space-y-2 text-sm'>
                <li>Free eBooks</li>
                <li>Development Tutorials</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className='flex flex-col md:flex-row justify-between items-center pt-6 gap-4'>
        <p className='text-sm text-center md:text-left'>Fakestore© 2000-2023, All Rights Reserved</p>
        <div className='flex gap-3 flex-wrap'>
          <img src="src/assets/Badge.png" alt="Badge1" />
          <img src="src/assets/Badge (1).png" alt="Badge2" />
          <img src="src/assets/Badge (2).png" alt="Badge3" />
          <img src="src/assets/Badge (3).png" alt="Badge4" />
          <img src="src/assets/Badge (4).png" alt="Badge5" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
