import React, { useState, useRef } from 'react';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const AddProduct = () => {
  const [touched, setTouched] = useState({
    title: false,
    price: false,
    description: false,
    preview: false
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId] = useState<number>(Math.floor(Math.random() * 2) + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const handleBrowserClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG/PNG)');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddProduct = async () => {
    setTouched({
      title: true,
      price: true,
      description: true,
      preview: true
    });

    const validPrice = /^(?!0\d)\d+(\.\d{1,2})?$/.test(price.trim());

    if (!title || !price || !description || !preview || !validPrice) {
      return;
    }

    const productData = {
      title,
      price: Number(price),
      description,
      categoryId,
      images: ["https://placehold.co/600x400"] // Replace with real image upload if required
    };

    setIsLoading(true);

    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error('Failed to add product');
      }

      const data = await res.json();
      console.log('Product added successfully:', data);

      navigate("/products", {
        state: {
          showToast: true,
          toastType: "success",
          toastMessage: "Product added successfully!",
        },
      });

    } catch (error) {
      console.error('Error:', error);
      navigate("/products", {
        state: {
          showToast: true,
          toastType: "error",
          toastMessage: "Failed to add product",
        },
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 bg-black/30">
          <MoonLoader size={80} color="#ffffff" loading={true} />
        </div>
      )}

      <section className="flex h-screen overflow-hidden">
        <div className="flex-shrink-0 z-10">
          <SideMenu />
        </div>
        <section className="flex flex-col flex-1 overflow-y-auto">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 mb-2">
            <h1 className="border-b font-bold pb-2 text-2xl sm:text-3xl md:text-4xl">Add Product</h1>
            <div className="w-full md:w-[80%] lg:w-[60%] pt-6 sm:pt-8">

              
              <div className="flex flex-col">
                <label>Product image</label>
                <div className="flex w-full">
                  {preview ? (
                    <div className="relative w-fit rounded-3xl h-48 w-48">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-52 object-cover rounded"
                      />
                      <button
                        onClick={() => setPreview(null)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#B8B8B8] flex items-center justify-center opacity-80 backdrop-blur-sm"
                      >
                        <img src="src/assets/x.png" alt="Close" className="w-4 h-4 object-contain" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="flex flex-col items-center gap-3">
                          <span>Drag and drop files.</span>
                          <span>or</span>
                          <span>
                            <button
                              type="button"
                              onClick={handleBrowserClick}
                              className="border rounded-md px-3 py-1"
                            >
                              Browse
                            </button>
                          </span>
                        </p>
                        <br />
                        <p>Supported file types: jpg, png, and jpeg format</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title & Price */}
              <div className="py-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col flex-1">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Enter product title"
                      value={title}
                      onBlur={() => setTouched({ ...touched, title: true })}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`border border-gray-300 rounded-lg py-2 px-4 outline-none ${touched.title && !title ? 'border-red-500' : ''}`}
                    />
                    {touched.title && !title && (
                      <p className="text-red-500">Please enter the value of Title</p>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <label>Price</label>
                    <input
  type="text"
  placeholder="Enter product price"
  value={price}
  onBlur={() => setTouched({ ...touched, price: true })}
  onChange={(e) => {
    const value = e.target.value;
    setPrice(value);
    if (value === "") {
      setIsValid(true);
    } else {
      const isNumber = /^(?!0\d)\d+(\.\d{1,2})?$/.test(value.trim());
      setIsValid(isNumber);
    }
  }}
  className={`border rounded-lg py-2 px-4 outline-none ${
    (!isValid || (touched.price && !price)) ? 'border-red-500' : 'border-gray-300'
  }`}
/>

                    {!isValid && (
                      <p className="text-red-500">Please enter a valid number</p>
                    )}
                    {touched.price && !price && (
                      <p className="text-red-500">Please enter the value of Price</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col py-6">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setTouched({ ...touched, description: true })}
                    className={`border rounded-lg py-2 px-4 min-h-[100px] resize-y outline-none ${!description && touched.description ? 'border-red-500' : ''}`}
                  />
                  {touched.description && !description && (
                    <p className="text-red-500">Please enter a valid description</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleAddProduct}
                  disabled={isLoading}
                  className="bg-[#4094F7] w-full sm:w-auto sm:px-20 md:px-32 lg:px-44 py-3 rounded-lg text-white disabled:opacity-50"
                >
                  Add
                </button>
              </div>

            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AddProduct;
