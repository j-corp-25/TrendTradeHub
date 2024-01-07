import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { Link } from "react-router-dom";
import { FaCartPlus, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
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
  let ratingObject = {};

  const totalRating =
    Array.isArray(reviews) && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  ratingObject[productId] = totalRating;

  const renderStars = (totalRating) => {
    const roundedRating = Math.round(totalRating * 2) / 2;
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        starIcons.push(<FaStar key={i} className="fa fa-star" />);
      } else if (i - 0.5 === roundedRating) {
        starIcons.push(<FaStarHalfAlt key={i} className="fa fa-star-half-o" />);
      } else {
        starIcons.push(<FaStar key={i} className="fa fa-star-o" />);
      }
    }

    return starIcons;
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // useEffect(() => {
  //   dispatch(fetchReviews(productId));
  // }, [dispatch, productId]);

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
        <div className="rating">{renderStars(ratingObject[productId])}</div>
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
