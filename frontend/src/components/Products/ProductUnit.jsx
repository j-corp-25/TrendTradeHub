import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { fetchReviews } from "../../app/reviewsReducer";

function ProductUnit({ productId }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const selectedProduct =
    products.find((product) => product._id === productId) || {};
  const { title, price, images } = selectedProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reviewsState = useSelector((state) => state.reviews);

  const reviews = reviewsState.reviews || [];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="product-item">
        <div className="user-info-product">
          <div className="user-img">
            <img src={selectedProduct.author.image} alt="user-profile" />
          </div>
          <div className="user-name">
            <span>{selectedProduct.author.name}</span>
          </div>
        </div>
      <div className="image">
        <div className="content-image">
          <Link to={`/product/${productId}`}>
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
    </div>
  );
}

export default ProductUnit;
