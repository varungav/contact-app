import React from 'react';

const BrowseByStyle = () => {
  return (
    <div className='px-4 md:px-10 lg:px-28 py-10 lg:py-16'>
      <div className='bg-[#F0F0F0] rounded-3xl'>
        <div className='flex justify-center py-10 lg:py-14'>
          <h1 className='font-normal text-3xl md:text-4xl lg:text-5xl font-primary'>BROWSE BY STYLE</h1>
        </div>

        <div className='px-4 md:px-10 lg:px-16 pb-10'>
          {/* First Row */}
          <div className='flex flex-col lg:flex-row gap-5 xl:pl-28'>
            <div
              className="bg-[url('src/assets/broswStyle1.png')] bg-cover bg-center h-[200px] md:h-[280px] lg:h-[340px] w-full lg:w-[480px] rounded-xl flex items-start">
              <h1 className='pl-6 pt-5 font-bold text-2xl md:text-3xl lg:text-4xl'>Casual</h1>
            </div>
            <div
              className="bg-[url('src/assets/broswStyle3.png')] bg-cover bg-center h-[200px] md:h-[280px] lg:h-[340px] w-full lg:w-[820px] rounded-xl flex items-start">
              <h1 className='pl-6 pt-5 font-bold text-2xl md:text-3xl lg:text-4xl'>Formal</h1>
            </div>
          </div>

          {/* Second Row */}
          <div className='flex flex-col lg:flex-row gap-5 mt-5 xl:pl-28'>
            <div
              className="bg-[url('src/assets/broswStyle2.png')] bg-cover bg-center h-[200px] md:h-[280px] lg:h-[340px] w-full lg:w-[820px] rounded-xl flex items-start">
              <h1 className='pl-6 pt-5 font-bold text-2xl md:text-3xl lg:text-4xl'>Party</h1>
            </div>
            <div
              className="bg-[url('src/assets/broswStyle4.png')] bg-cover bg-center h-[200px] md:h-[280px] lg:h-[340px] w-full lg:w-[480px] rounded-xl flex items-start">
              <h1 className='pl-6 pt-5 font-bold text-2xl md:text-3xl lg:text-4xl'>Gym</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseByStyle;
