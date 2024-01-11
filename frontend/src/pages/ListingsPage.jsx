import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/productReducer";
import ProductUnit from "../components/Products/ProductUnit";
import { fetchUsers } from "../app/userReducer";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => dispatch(fetchUsers()),[]);


  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductUnit key={product._id} productId={product._id} />
        ))}
      </div>
    </div>
  );
}

export default Product;
