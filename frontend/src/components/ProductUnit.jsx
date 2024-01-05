import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";

function ProductUnit({ product }) {
  const { title, price, images } = product;
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
          <a href="#/" onClick={handleNextImage}>
            <img
              src={images.length > 0 ? images[currentImageIndex] : "default-image-url"}
              alt={title}
            />
          </a>
          {images.length > 1 && (
            <FaAngleRight className="right-arrow" onClick={handleNextImage} />
          )}
        </div>
      </div>
      <div className="name">
        <a href="#/">{title}</a>
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
