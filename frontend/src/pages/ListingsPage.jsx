import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/productReducer";
import ProductUnit from "../components/Products/ProductUnit";
import { fetchUsers } from "../app/userReducer";
import "./Listing.css";
import { Link } from "react-router-dom";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const image = process.env.PUBLIC_URL + "trade-hub.svg";
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => dispatch(fetchUsers()), []);

  return (
    <div className="product-container">
      <div className="product-header">
        <div className="product-text">
        <h2 style={{fontFamily:'fantasy',}}>Trade Smart, Trade Simple</h2>
<p style={{fontFamily:'Phantomsans, sans-serif', fontStyle:'italic', color:'gray', marginLeft:"20px"}}>Buy what you need, sell what you don't. <br />Your one-stop hub for seamless transactions.<br />
   Explore, trade, and discover new possibilities today!</p>
   <Link to='/newproduct'>
    <button class="button-63" role="button">Sell Product</button>
     </Link>
    
   
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
