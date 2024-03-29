import React, { useState } from "react";

// import Rating from "react-rating-stars-component";
// import ReactStars from "react-rating-stars-component";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";
import { createReview, fetchReviews, updateReview } from "../../app/reviewsReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../app/productReducer";
import { useEffect } from "react";


const ReviewModal = ({ showModal, handleClose, review = {rating:0, comment:""} }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state=> state.auth.user._id);
  const product = useSelector(state=> state.products.selectedProduct?._id);
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating); 
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error, setError] = useState("");



  const handleSubmit = () => {
    console.log(review);
    
    if (review.comment === "" && review.rating === 0)
    {
      if (rating > 0 && comment.trim() !== "") {
      dispatch(createReview({ userId: userId ,comment: comment, rating: rating, productId: product}));
      console.log(userId, product);
      handleClose();}
      else {
        setError("Please Prodive both rating and comment");
      }

    }else {
      dispatch(updateReview(review._id, { userId: userId ,comment: comment, rating: rating, productId: product}))
    }
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleMouseOver = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRating">
            <Form.Label>Rating:</Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ cursor: "pointer",
                  color: star <= (hoveredRating || rating) ? "#ffd700" : "#ccc"
                }}
                  onClick={() => ratingChanged(star)}
                  onMouseOver={() => handleMouseOver(star)}
                  onMouseLeave={handleMouseLeave}
                >
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="formComment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && (
              <Alert variant="danger" className="mt-2">
                {error}
              </Alert>)}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Review
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
