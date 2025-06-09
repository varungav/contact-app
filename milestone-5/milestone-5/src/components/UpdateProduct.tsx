import React, { useState, useRef } from 'react';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import { useLocation  } from 'react-router-dom';
import xIcon from '../assets/x.png';


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

const UpdateProduct = () => {

  const { state } = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const product = state as Product;
  const image = (product.images[0] || '');
  const [title, setTitle] = useState(product.title || '');
  const [price, setPrice] = useState(product.price || '');
  const [emptySubmit, setEmptySubmit ] = useState(false);

  const productApi = {
    title,
    price: Number(price),
    categoryId: 145, // or product.category.id if available

  }

  const handleUpdate = async () => {
  if (title !== product.title) productApi.title = title;
  if (Number(price) !== product.price) productApi.price = Number(price);

  if (Object.keys(productApi).length === 0) {
    alert("No changes made.");
    return;
  }

  try {

    const body ={
         title: title,
    price: Number(price),
    id: 145,

    }
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${product.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body),
    });
    console.log('response',res)

    if (!res.ok) {
      alert("Could not update the product.");
      return;
    }

    const data = await res.json();
    console.log('Product updated successfully:', data);
    alert('Product updated!');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to update product');
  }
};
const handleEmptySubmit = () => {
  if (!title || !price) {
    setEmptySubmit(true);
    return;
  }
}


  return (
    <section className="flex h-screen overflow-hidden">
      <div className="flex-shrink-0 z-10">
        <SideMenu />
      </div>
      <section className="flex flex-col flex-1 overflow-y-auto">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 mb-2">
          <h1 className="border-b font-bold pb-2 text-2xl sm:text-3xl md:text-4xl">Update Product</h1>
          <div className="w-full md:w-[80%] lg:w-[60%] pt-6 sm:pt-8">
            <div className="flex flex-col">
              <label>Product image</label>
              <div className="flex w-full">
                  <div className="relative w-fit">
                    <img
                      src={image}
                      alt="Preview"
                      className="h-52 object-cover rounded"
                    />
                    <button
                    //   onClick={() => setPreview(null)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#B8B8B8] flex items-center justify-center opacity-80 backdrop-blur-sm"
                    >
                      <img
                        src={xIcon}
                        alt="Close"
                        className="w-4 h-4 object-contain"
                      />
                    </button>
                  </div>
              </div>
            </div>

            <div className="py-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col flex-1">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter product title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-lg py-2 px-4 outline-none"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label>Price</label>
                  <input
                    type="text"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-lg py-2 px-4 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col py-6">
                <label>Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={product.description}
                  readOnly
                  className="border rounded-lg py-2 px-4 min-h-[100px] resize-y outline-none"
                />
              </div>
            </div>

            <div>
              <button
                className="bg-[#4094F7] w-full sm:w-auto sm:px-20 md:px-32 lg:px-44 py-3 rounded-lg text-white"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UpdateProduct;
