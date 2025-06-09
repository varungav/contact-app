import { useState } from 'react';
import { X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import NotFound from './components/NotFound';
import Cart from './components/Cart';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Router>
      {/* Top Banner */}
      {isVisible && (
        <div className="w-full bg-black text-white text-sm px-4 py-2 flex justify-center items-center relative z-40">
          <p>
            Sign up and get 20% off your first order.{' '}
            <a href="/signup" className="underline font-medium">
              Sign Up Now
            </a>
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Page Routes */}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/category/:name" element={<CategoryPage />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path='/product/cart' element={<Cart />} />
      </Routes>

      {/* Shared Footer */}
      <Footer />
    </Router>
  );
}

export default App;
