import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/product';
import ProductUnit from '../components/ProductUnit';

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductUnit key={product._id} productId={product._id} />
        ))}
      </div>
    </div>
  )
}

export default Product
