import React from 'react'
import cartImg from '../assets/cart1.png'
import { Trash2 } from "lucide-react"

const Cart = () => {
  return (
    <div className='relative mt-[80px] px-4 sm:px-8 lg:px-28 pb-16'>
      <h1 className='text-2xl sm:text-3xl font-primary mb-8'>Your Cart</h1>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Cart Items Section */}
        <div className='flex-1 space-y-6'>
          <div className='border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4'>
            <img src={cartImg} alt="Product" className="w-full sm:w-28 h-28 object-cover rounded-lg" />

            <div className='flex-1 flex flex-col justify-between'>
              <div>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
                  <h2 className='text-base sm:text-lg font-medium'>Gradient Graphic T-Shirt</h2>
                  <button className="text-[#ff3333] hover:bg-red-50 p-2 rounded self-start sm:self-auto">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className='text-sm text-gray-500'>Size: Large</p>
                <p className='text-sm text-gray-500'>Color: White</p>
              </div>

              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4'>
                <span className='text-lg font-semibold'>$145</span>
                <div className="flex items-center bg-[#F0F0F0] rounded-full h-11 w-32 justify-between px-4">
                  <button className="text-xl">−</button>
                  <span className="text-base font-medium">1</span>
                  <button className="text-xl">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className='w-full lg:w-1/3 border rounded-xl p-4 sm:p-6 space-y-6'>
          <h2 className='text-xl font-semibold'>Order Summary</h2>

          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'><p>Subtotal</p><p>$565</p></div>
            <div className='flex justify-between'><p>Discount</p><p>−$113</p></div>
            <div className='flex justify-between'><p>Delivery Fee</p><p>$15</p></div>
          </div>

          <hr />

          <div className='flex justify-between text-base font-semibold'>
            <p>Total</p>
            <p>$467</p>
          </div>

          {/* Promo Code Input */}
          <div className='flex flex-col sm:flex-row gap-2'>
            <input
              type="text"
              placeholder="Promo Code"
              className='flex-1 border rounded-full px-4 py-2 outline-none text-sm'
            />
            <button className='bg-gray-800 text-white px-4 py-2 rounded-full text-sm'>
              Apply
            </button>
          </div>

          {/* Checkout Button */}
          <button className='w-full bg-black text-white py-3 rounded-full text-base'>
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

