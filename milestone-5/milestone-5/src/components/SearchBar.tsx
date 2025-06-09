import { useEffect, useState, type JSX } from "react";
import SideMenu from "./SideMenu";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Toast from "./Toast";
import { MoonLoader } from "react-spinners";
import { div } from "framer-motion/client";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
}


const SearchBar = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedProduct, setSelectedProduct ] = useState<Product | null>(null);
  const [ selectedIds, setSelectedIds ] = useState<number[]>([]);
  const productPerPage = 10;
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
  show: false,
  message: "",
  type: "success",
});


  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const fetchProducts = async() => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products")
      const data = await res.json();
      setProducts(data);
      
    } catch(err) {
      console.log("Failed to Fetch products", err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() =>{
    fetchProducts();
  }, [])


  // useEffect(() => {
  //   fetch("https://api.escuelajs.co/api/v1/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.error("Failed fetching data", err));
  // }, []);
  const filteredProduct = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
);

  const totalPages = Math.ceil(filteredProduct.length / productPerPage);
  const startIndex = (currentPage - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const currentProducts = filteredProduct.slice(startIndex, endIndex);
  // console.log(searchQuery);
    useEffect(() => {
    if(currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  const handleSelectAll = () => {
    if(selectedIds.length === currentProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentProducts.map(product => product.id))
    }
  }

  const handleCheckboxChange = (id: number) => {
    if(selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error("Failed to delete the product");
    }

    setProducts((prev) => prev.filter((product) => product.id !== id));
    setIsModalOpen(false);
    setSelectedProduct(null);

    setToast({
      show: true,
      message: "Product deleted successfully!",
      type: "success",
    });

  } catch (err) {
    console.log("Error deleting the product", err);
    setToast({
      show: true,
      message: "Failed to delete product!",
      type: "error",
    });
  }

  setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
};


const renderPageNumbers = () => {
  const pages: JSX.Element[] = [];
  let hasLeftDots = false;
  let hasRightDots = false;

  for (let i = 1; i <= totalPages; i++) {
    const isNearCurrent = i >= currentPage - 1 && i <= currentPage + 1;
    const isStart = i <= 2;
    const isEnd = i > totalPages - 2;

    if (isStart || isEnd || isNearCurrent) {
      pages.push(
        <li
          key={i}
          className={`px-2 cursor-pointer h-10 w-10 flex items-center justify-center rounded ${
            i === currentPage ? "font-bold text-blue-500 bg-[#F5F9FF]" : ""
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    } else if (i < currentPage && !hasLeftDots) {
      pages.push(
        <li key="left-dots" className="h-10 w-10 flex items-center justify-center">...</li>
      );
      hasLeftDots = true;
    } else if (i > currentPage && !hasRightDots) {
      pages.push(
        <li key="right-dots" className="h-10 w-10 flex items-center justify-center">...</li>
      );
      hasRightDots = true;
    }
  }

  return pages;
};

const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  if (location.state?.showToast) {
    setToast({
      show: true,
      message: location.state.toastMessage || "Action completed!",
      type: location.state.toastType || "success",
    });

    // Auto-close
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2000);

    // Reset navigation state to prevent re-showing
    window.history.replaceState({}, document.title);

    return () => clearTimeout(timer);
  }
}, [location.state]);



  return (
    <>
    {/* {isLoading && (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <MoonLoader size={80} color="#ffffff" loading={true} />
    </div>
  )} */}
    <section className="flex h-screen w-full overflow-hidden">
      <div className="flex-shrink-0 z-10">
        <SideMenu />
      </div>
      <section className="flex flex-col w-full overflow-hidden">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

        <main className="flex flex-col flex-1 overflow-hidden">
          <div className="px-8">
            <div className="flex flex-col sm:flex-row justify-between py-4 lg:py-8 border-b gap-4 ">
              <h1 className="text-4xl font-bold">Products</h1>
              <div className="flex flex-wrap gap-2">
                <button className="border rounded-md flex items-center gap-2 px-3 py-1">
                  <img src="src/assets/Filter.png" alt="Filter" />
                  <span>Filter</span>
                </button>
                <button className="border rounded-md flex items-center gap-2 px-3 py-1">
                  <img src="src/assets/Arrow.png" alt="Export" />
                  <span>Export</span>
                </button>
                <button className="bg-btnColor text-white rounded-md flex items-center gap-2 px-3 py-1" onClick={() =>{navigate('/products/add')}}>
                  <span className="text-white text-lg">+</span>
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
          

<div className="flex-1 overflow-x-auto overflow-y-auto px-8">
  <div className="w-full my-4">
    <div className="block w-full overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4"
                onClick={handleSelectAll}
                checked={selectedIds.length === currentProducts.length && currentProducts.length > 0}
              />
            </th>
            <th className="text-left px-4 py-3 font-medium text-xs uppercase">Image</th>
            <th className="text-left px-4 py-3 font-medium text-xs uppercase">Title</th>
            <th className="text-left px-4 py-3 font-medium text-xs uppercase whitespace-nowrap">Description</th>
            <th className="text-left px-4 py-3 font-medium text-xs uppercase">Price</th>
            <th className="text-left px-4 py-3 font-medium text-xs uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#e5e9eb]">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-2">
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-12 w-12 bg-gray-300 rounded-lg"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="h-5 w-5 bg-gray-300 rounded"></div>
                      <div className="h-5 w-5 bg-gray-300 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))
            : currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <img
                      className="h-12 w-12 rounded-lg"
                      src={product.images[0]}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.title}</td>
                  <td className="px-4 py-2">
                    <div className="max-w-[200px] md:max-w-[300px] lg:max-w-none truncate md:truncate lg:whitespace-normal">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">${product.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setSelectedProduct(product);
                        }}
                        className="hover:bg-red-50 rounded-md transition"
                        aria-label="Delete product"
                      >
                        <img src="src/assets/trash-2.png" alt="" className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/products/edit/${product.id}`, { state: product });
                        }}
                      >
                        <img className="h-5 w-5" src="src/assets/Icon.png" alt="Edit" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  </div>
</div>



          <div className="sticky bottom-0 bg-white border-t px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
  <div className="flex flex-col-reverse sm:flex-row w-full justify-between items-center gap-4">
    <div className="w-full sm:w-auto order-3 sm:order-1">
      {currentPage !== 1 ? (
        <button onClick={handlePrevPage} className="border rounded-md w-full sm:w-auto">
          <div className="flex items-center justify-center px-4 py-2">
            <div className="mr-2"><img src="src/assets/arrow-left.png" alt="" /></div>
            <p>Previous</p>
          </div>
        </button>
      ) : (
        <div className="w-full sm:w-auto"></div>
      )}
    </div>
    <ul className="flex justify-center items-center gap-2 overflow-x-auto order-2">{renderPageNumbers()}</ul>
    <div className="w-full sm:w-auto order-1 sm:order-3">
      {currentPage !== totalPages ? (
        <button onClick={handleNextPage} className="border rounded-md w-full sm:w-auto">
          <div className="flex items-center justify-center px-4 py-2">
            <p>Next</p>
            <div className="ml-2"><img src="src/assets/arrow-right.png" alt="" /></div>
          </div>
        </button>
      ) : (
        <div className="w-full sm:w-auto"></div>
      )}
    </div>
  </div>
</div>

        </main>
      </section>
      {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70  flex justify-center items-center z-50">
              <div className=" bg-white w-[400px] rounded-lg p-1 shadow-lg">
                <div className="p-6 bg-white">
                  <div className="flex flex-col justify-between">
                    <div className="w-12 h-12 mb-5">
                      <img src="src/assets/featureeeee.png" alt="" />
                    </div>
                    <div>
                      <h3>Delete Product</h3>
                      <p className="mt-2">{`Are you sure you want to delete the Product '${selectedProduct?.title}'?`}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-7">
                    <button className="px-14 py-3 bg-white rounded-md border transition" onClick={() => {setIsModalOpen(false);}}>Cancel</button>
                    <button className="px-14 py-3 bg-[#4094F7] rounded-md text-white" onClick={() => selectedProduct && handleDelete(selectedProduct.id)}>Delete</button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
          <Toast
            show={toast.show}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            message={toast.message}
            type={toast.type}
          />



    </section>
    </>
  );
};

export default SearchBar;