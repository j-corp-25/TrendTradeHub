import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { fetchReviews } from "../../app/reviewsReducer";
import { addToCart } from "../../app/cartReducer";

function ProductUnit({ productId }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const selectedProduct =
    products.find((product) => product._id === productId) || {};
  const { title, price, images, description } = selectedProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reviewsState = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.user._id);

  const reviews = reviewsState.reviews || [];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addCart = () => {
      dispatch(addToCart(productId,userId));
  }
  

  return (
    <div className="product-item">
      <Link to={sessionUser ? `/profile/${selectedProduct.author._id}` : "/login"}>
        <div className="user-info-product">
          <div className="user-img">
            <img src={selectedProduct.author.image} alt="user-profile" />
          </div>
          <div className="user-name">
            <span>{selectedProduct.author.name}</span>
          </div>
        </div>
      </Link>
      <div className="image">
        <div className="content-image">
          <Link to={sessionUser ? `/product/${productId}` : "/login" }>
            <img
              src={
                images.length > 0
                  ? images[currentImageIndex]
                  : "default-image-url"
              }
              alt={title}
            />
          </Link>
          {images?.length > 1 && (
            <FaAngleRight className="right-arrow" onClick={handleNextImage} />
          )}
        </div>
      </div>

      <div className="name-cart">
        <div className="name">
          <Link
            to={`/product/${productId}`}
            style={{ color: "rgb(36, 89, 78)" }}
          >
            {title}
          </Link>
        </div>
        <div className="cart">
          <button
            type="button"
            className="btn "
            style={{ height: "20px", padding: "3px" }}
            onClick={addCart}
          >
            <FaCartPlus />
          </button>
        </div>
      </div>

      <div className="price-like">
        <div className="price">
          <span style={{ fontWeight: "bold", fontSize: "12px" }}>
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Description with animation */}
      <div className="description" style={{ color: "red", animation: "slideRight 0.5s forwards" }}>
        {description}
      </div>
    </div>
  );
}

export default ProductUnit;
