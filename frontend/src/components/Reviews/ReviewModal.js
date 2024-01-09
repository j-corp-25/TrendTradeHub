import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";
import { createReview, fetchReviews } from "../../app/reviewsReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../app/productReducer";
import { useEffect } from "react";

const ReviewModal = ({ showModal, handleClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state=> state.auth.user._id);
  const product = useSelector(state=> state.products.selectedProduct?._id);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); 
  const [error, setError] = useState("");


  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
    dispatch(createReview({ author: userId ,comment: comment, rating: rating, product: product}));
    handleClose();}
    else {
      setError("Please Prodive both rating and comment");
    }
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
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
                  style={{ cursor: "pointer" }}
                  onClick={() => ratingChanged(star)}
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
