import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import SideMenu from './components/SideMenu'
import Content from './components/Content'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/products" element={<SearchBar />} />
        <Route path = "/products/add" element={<AddProduct />} />
        <Route path='/products/edit/:id' element={<UpdateProduct />} />
        <Route path = "/products/edit" element={<UpdateProduct/>} />
      </Routes>
    </Router>
  )
}

export default App

