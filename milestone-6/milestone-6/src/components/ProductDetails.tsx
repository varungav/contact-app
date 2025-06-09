import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
  const [selectedSize, setSelectedSize] = useState('Small');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || '');
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePlus = () => setQuantity((q) => q + 1);
  const handleMinus = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  return (
    <>
      {loading ? (
        // Loading skeleton stays mostly the same — you can tweak layout if you want.
        <div className="relative mt-[80px] sm:px-8 pb-16 animate-pulse">
          <div className="flex flex-col px-6 lg:px-28 lg:flex-row">
            <div className="flex flex-row sm:flex-col gap-2 pr-3">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="h-20 w-20 bg-gray-300 rounded cursor-pointer"></div>
              ))}
            </div>
            <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[652px] w-full sm:w-[444px] bg-gray-300 rounded mt-4 sm:mt-0" />
            <div className="flex-1 space-y-4 pl-0 sm:pl-11 mt-6 sm:mt-0">
              <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-20 w-full bg-gray-300 rounded"></div>
              <ul className="list-disc list-inside text-base text-gray-700 list-none space-y-2">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="h-4 w-full max-w-[400px] bg-gray-300 rounded"></li>
                ))}
              </ul>
              <div>
                <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="h-9 w-9 rounded-full bg-gray-300"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 w-24 bg-gray-300 rounded mt-6 mb-4"></div>
                <div className="flex space-x-3">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="h-12 w-20 rounded-full bg-gray-300"></div>
                  ))}
                </div>
              </div>
              <div className="flex pt-6 flex-wrap gap-4 items-center">
                <div className="h-11 w-32 bg-gray-300 rounded-full"></div>
                <div className="h-11 px-10 bg-gray-300 rounded-full w-40"></div>
              </div>
            </div>
          </div>
        </div>
      ) : product ? (
        <div className="relative mt-[80px] sm:px-4 md:px-8 lg:px-28 pb-16">
          <div className="flex flex-col lg:flex-row px-4 sm:px-0 gap-6 lg:gap-12">
            {/* Thumbnails */}
            <div className="flex flex-row sm:flex-col gap-2 justify-start sm:justify-center lg:justify-start">
              {product.images?.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`cursor-pointer rounded overflow-hidden border-2 ${
                    selectedImage === img ? 'border-black' : 'border-transparent'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`thumb${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="w-full sm:w-[444px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[652px] rounded border border-gray-200 overflow-hidden">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product details */}
            <div className="flex-1 space-y-4">
              <h1 className="font-primary font-normal text-2xl sm:text-3xl">{product.title}</h1>
              <p className="font-bold text-2xl sm:text-3xl">${product.price}</p>
              <p className="text-gray-600 text-base">{product.description}</p>

              <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                <li>✔ Premium 100% Cotton fabric for all-day comfort</li>
                <li>✔ High-quality screen-printed graphic for long-lasting durability</li>
                <li>✔ Classic crew neck and short sleeves for a timeless fit</li>
                <li>✔ Available in Black, White, and Navy Blue</li>
                <li>✔ Unisex design, suitable for both men and women</li>
              </ul>

              {/* Colors */}
              <div>
                <h2 className="text-base mt-6">Select colors</h2>
                <div className="flex mt-4 gap-4">
                  <div className="bg-[#4F4631] rounded-full h-9 w-9 cursor-pointer"></div>
                  <div className="bg-[#314F4A] rounded-full h-9 w-9 cursor-pointer"></div>
                  <div className="bg-[#31344F] rounded-full h-9 w-9 cursor-pointer"></div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h2 className="text-base mt-6">Choose Size</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-6 py-3 rounded-full ${
                        selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0]'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex pt-6 flex-wrap gap-4 items-center">
                <div className="flex items-center bg-[#F0F0F0] rounded-full h-11 w-32 justify-between px-4">
                  <button className="text-xl" onClick={handleMinus} aria-label="Decrease quantity">
                    −
                  </button>
                  <span className="text-base font-medium">{quantity}</span>
                  <button className="text-xl" onClick={handlePlus} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...product,
                        quantity,
                        selectedSize,
                      })
                    )
                  }
                  className="bg-black text-white px-8 py-4 rounded-full min-w-[150px]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-20 text-center text-xl">Product not found.</div>
      )}
    </>
  );
};

export default ProductDetails;
