import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/product';

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Product
