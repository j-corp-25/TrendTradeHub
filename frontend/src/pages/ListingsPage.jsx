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
    <div className="product-container">
      <div className="product-header">
        <div className="product-text">
        <h2 style={{fontFamily:'font-family: Phantomsans, sans-serif;', color:'white'}}>Trade Smart, Trade Simple</h2>
<p style={{fontFamily:'font-family: Phantomsans, sans-serif;', color:'gray', marginLeft:"20px"}}>Buy what you need, sell what you don't. <br />Your one-stop hub for seamless transactions.<br />
   Explore, trade, and discover new possibilities today!</p>
   <button class="button-63" role="button">Sell Product</button>
      </div>
      <div className="cloud">
        <img src={image} alt="trade-hub" />
      </div>
      </div>
      
      <div className="product-list">
        {products.map((product) => (
          <ProductUnit key={product._id} productId={product._id} />
        ))}
      </div>
    </div>
  );
}

export default Product;
