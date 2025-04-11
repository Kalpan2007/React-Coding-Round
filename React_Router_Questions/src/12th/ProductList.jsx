import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Headphones' },
  { id: 4, name: 'Tablet' },
];

const ProductList = () => {
  return (
    <div className="page">
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} (ID: {product.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
