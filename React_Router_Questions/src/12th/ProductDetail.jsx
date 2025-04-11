import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="page">
      <h1>Product Details</h1>
      <p>Currently viewing Product ID: <strong>{id}</strong></p>
    </div>
  );
};

export default ProductDetail;
