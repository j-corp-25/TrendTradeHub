import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";

const ReviewModal = ({ showModal, handleClose }) => {
  const [comment, setComment] = useState("");


  const handleSubmit = () => {
    // Implement your logic to submit the review
   
    console.log("Comment:", comment);

    // Close the modal after submitting
    handleClose();
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
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
            {/* <Rating
              count={5}
              size={30}
              value={rating}
              activeColor="#ffd700" // Set the color to yellow on hover
              onChange={() => handleRatingChange(rating)}
            /> */}
            {/* <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            /> */}
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
