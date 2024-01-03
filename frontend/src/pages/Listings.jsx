import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>Product</div>
  )
}

export default Product
