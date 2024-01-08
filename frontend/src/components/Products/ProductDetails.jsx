import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductUnit.css";
import { FaCartPlus, FaAngleRight, FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import ReviewItems from "../Reviews/ReviewItems";
import "./ProductDetails.css";
import {
  fetchSingleProduct,
  fetchRelatedProducts,
  fetchProducts,
} from "../../app/productReducer";
import ProductUnit from "./ProductUnit";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { fetchReviews } from "../../app/reviewsReducer";
import ReviewModal from "../Reviews/ReviewModal.js";

function ProductDetails() {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct) || {};
  const { title, price, images, _id } = product;
  const relatedProductIds = useSelector(
    (state) => state.products.relatedProductIds
  );
  const averageRating = useSelector((state) => state.reviews.averageRating);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FaStar key={i} className="fa fa-star" />);
    }

    if (hasHalfStar) {
      starIcons.push(
        <FaStarHalfAlt key="half" className="fa fa-star-half-o" />
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<FaRegStar key={`empty-${i}`} className="fa fa-star-o" />);
    }

    return starIcons;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSingleProduct(productId));
        await dispatch(fetchRelatedProducts(productId));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchReviews(productId));
      setLoading(false);
    };

    fetchAll();
  }, [dispatch]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSeeReviews = () => {
    setShowReviewsModal(true);
  };

  const handleCloseReviewsModal = () => {
    setShowReviewsModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <section className="container-product-details main-body">
        <div className="title"> Product Details</div>
        <div className="detail">
          <div className="image">
            {product.images && product.images.length > 0 && (
              <>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title || "Product Image"}
                  className="card-img-top"
                />
                {product.images.length >= 2 && (
                  <FaAngleRight
                    className="right-arrow"
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      opacity: "1",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div className="content">
            <h1 className="name"> Title: {product.title}</h1>
            <div className="rating">{renderStars(averageRating)}</div>

            <div className="price"> Price: {product.price}</div>
            <div className="category">Category: {product.category}</div>
            <div className="buttons">
              <button>Checkout</button>
              <button>
                Add To Cart
                <span>
                  <FaCartArrowDown />
                </span>
              </button>
            </div>
            <div className="description"></div>
            <div className="reviews-see-add">
              <div>
                <button onClick={handleSeeReviews}>See reviews</button>
              </div>
              <div>
              <button onClick={handleShowModal}>Add my review</button>
              </div>
            </div>
          </div>
        </div>
        <div className="related-product-container">
          <div className="title">Related Products</div>
          <div className="listProduct">
            {relatedProductIds?.length > 0 &&
              relatedProductIds?.map((relatedProductId) => (
                <ProductUnit
                  key={relatedProductId}
                  productId={relatedProductId}
                />
              ))}
          </div>
        </div>

        <Modal show={showReviewsModal} onHide={handleCloseReviewsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewItems productId={productId} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReviewsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ReviewModal showModal={showModal} handleClose={handleCloseModal} />

      </section>
    </>
  );
}

export default ProductDetails;
