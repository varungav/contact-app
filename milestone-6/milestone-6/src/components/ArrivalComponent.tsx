import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    image: string;
  };
  images: string[];
}




interface Props {
  title: string;
  limit: number;
}

const ArrivalComponent = ({ title, limit }: Props) => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    fetchProduct();
  }, [])
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      setProducts(data);
    } catch(err) {
      console.log("Failed to fetch the product: ", err);
    } finally {
      setLoading(false);
    }
  }
  const navigate = useNavigate();
  return (
    <>
    {
      loading ? (
        <div className="py-12 px-6 sm:px-12 lg:px-28 border-b">
          <div className="mb-10 sm:mb-14 flex justify-center">
            <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-center">Loading Products...</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex flex-col space-y-3 animate-pulse"
              >
                <div className="aspect-[3/4] bg-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

      ): (
        <div className="py-12 px-6 sm:px-12 lg:px-28 border-b">

          <div className="mb-10 sm:mb-14 flex justify-center">
            <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-center">{title}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0,limit).map((item) => (
              <div key={item.id} className="flex flex-col cursor-pointer" onClick={() =>{navigate(`/product/${item.id}`)}}>
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={item.category.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4">{item.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base mt-1">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
    </>
  );
};

export default ArrivalComponent;
