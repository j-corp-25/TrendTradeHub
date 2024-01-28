import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/productReducer";
import ProductUnit from "../components/Products/ProductUnit";
import { fetchUsers } from "../app/userReducer";
import "./Listing.css";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const image = process.env.PUBLIC_URL + "trade.avif";
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => dispatch(fetchUsers()), []);

  return (
    <>
      {" "}
      <div>
        <div className="cloud">
          {/* <img src={image} alt="trade-hub" /> */}
        </div>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductUnit key={product._id} productId={product._id} />
        ))}
      </div>
    </>
  );
}

export default Product;
