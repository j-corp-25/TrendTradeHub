import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function ProductUnit({ productId }) {
  const products = useSelector((state) => state.products.products) || [];
  const selectedProduct =
    products.find((product) => product._id === productId) || {};
  const { title, price, images } = selectedProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="product-item">
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
      <div className="name-rate">
        <div className="name">
          <Link to={`/product/${productId}`}>{title}</Link>
        </div>
        <div class="rating">
          <span class="fa fa-stack">
            <FaStar className="fa fa-star" />
          </span>
          <span class="fa fa-stack">
            <FaStar className="fa fa-star" />
          </span>
          <span class="fa fa-stack">
            <FaStar className="fa fa-star" />
          </span>
          <span class="fa fa-stack">
            <FaStar className="fa fa-star" />
          </span>
          <span class="fa fa-stack">
            <FaStarHalfAlt className="fa fa-star-half-o" />
          </span>
        </div>
      </div>

      <div className="price-like-cart">
        <div className="price">
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="cart">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "70px", height: "25px" }}
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUnit;
