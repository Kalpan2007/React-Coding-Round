import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import './Twelve.css';

const Twelve = () => {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default Twelve;
