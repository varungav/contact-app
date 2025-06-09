import React from 'react';
import ArrivalComponent from './ArrivalComponent';
import BrowseByStyle from './BrowseByStyle';

const MainContent = () => {
  const newArrivalData = [
    { title: "T-SHIRT WITH TAPE DETAILS", price: 120, img: "src/assets/newArrival1.png" },
    { title: "SKINNY FIT JEANS", price: 240, img: "src/assets/newArrival2.png" },
    { title: "CHECKERED SHIRT", price: 180, img: "src/assets/newArrival3.png" },
    { title: "SLEEVE STRIPED T-SHIRT", price: 130, img: "src/assets/newArrival4.png" }
  ];

  const causualData = [
    { title: "Vertical Striped Shirt", price: 212, img: "src/assets/causual/Frame 32.png" },
    { title: "Courage Graphic T-shirt", price: 145, img: "src/assets/causual/Frame 33 (1).png" },
    { title: "Loose Fit Bermuda Shorts", price: 80, img: "src/assets/causual/Frame 33.png" },
    { title: "Faded Skinny Jeans", price: 210, img: "src/assets/causual/Frame 34 (1).png" },
    { title: "Gradient Graphic T-shirt", price: 212, img: "src/assets/causual/Frame 34 (2).png" },
    { title: "Pole with Tippin Details", price: 145, img: "src/assets/causual/Frame 34.png" },
    { title: "Black Striped T-shirt", price: 80, img: "src/assets/causual/Frame 38.png" },
    { title: "Skinny Fit Jeans", price: 210, img: "src/assets/causual/Frame 38 (1).png" },
    { title: "Vertical Striped Shirt", price: 212, img: "src/assets/causual/Frame 38 (2).png" },
    { title: "Steeve Striped T-shirt", price: 145, img: "src/assets/causual/Frame 71.png" },
    { title: "Loose Fit Bermuda Shorts", price: 80, img: "src/assets/causual/Frame 72.png" },
    { title: "Faded Skinny Jeans", price: 210, img: "src/assets/causual/Frame 108.png" },
  ];

  return (
    <div className='w-full'>
      <div className='bg-[#F2F0F1] flex flex-wrap'>

        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start  w-full px-4 sm:px-8 lg:px-28 pt-10 gap-10 bg-[url('src/assets/Rectangle.png')] bg-contain bg-no-repeat bg-center">
          {/* Left Text Section */}
          <div className='flex-1 mt-6 lg:mt-20 w-full'>
            <div className='w-full max-w-[731px] mb-10'>
              <h1 className='text-3xl sm:text-4xl lg:text-6xl font-primary font-normal mb-6 leading-tight'>
                FIND CLOTHES THAT MATCH YOUR STYLE PERFECTLY
              </h1>
              <p className='text-base sm:text-lg mb-6'>
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <button className='bg-black px-8 sm:px-12 py-3 sm:py-4 text-white rounded-full text-sm sm:text-base'>
                Shop Now
              </button>
            </div>

            {/* Stats */}
            <div className='flex flex-wrap gap-6'>
              <div>
                <h1 className='font-bold text-2xl sm:text-3xl'>200+</h1>
                <p className='text-sm'>International Brands</p>
              </div>
              <div>
                <h1 className='font-bold text-2xl sm:text-3xl'>2,000+</h1>
                <p className='text-sm'>High-Quality Products</p>
              </div>
              <div>
                <h1 className='font-bold text-2xl sm:text-3xl'>30,000+</h1>
                <p className='text-sm'>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className='bg-black w-full py-8 px-6 sm:px-12 flex flex-wrap justify-center sm:justify-between items-center gap-6'>
          <img src="src/assets/Group.png" alt="Brand 1" className='h-6 sm:h-8 object-contain' />
          <img src="src/assets/zara-logo-1 1.png" alt="Brand 2" className='h-6 sm:h-8 object-contain' />
          <img src="src/assets/gucci-logo-1 1.png" alt="Brand 3" className='h-6 sm:h-8 object-contain' />
          <img src="src/assets/prada-logo-1.png" alt="Brand 4" className='h-6 sm:h-8 object-contain' />
          <img src="src/assets/Group (1).png" alt="Brand 5" className='h-6 sm:h-8 object-contain' />
        </div>
      </div>

      {/* Product Sections */}
      <ArrivalComponent limit = {4} title="New Arrival" />
      <ArrivalComponent limit = {12} title="Casual" />
      <BrowseByStyle />
    </div>
  );
};

export default MainContent;
