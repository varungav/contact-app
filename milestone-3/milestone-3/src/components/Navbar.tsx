import React from 'react'

const Navbar = () => {
  return (      
    <div className='bg-[#007272] h-[70px]'>
        <div className=' flex py-6 pl-6 lg:pl-16 lg:pt-4 md: md:pl-6 sm:pl-6'>        
          <div className='hidden lg:inline-block '>
            <img src="src/assets/Logo.png" alt=""/>
          </div>
          <div>
            <h1 className='text-white text-2xl ml-1'>To-Do List</h1>
          </div>
        </div>
    </div>
  )
}

export default Navbar
