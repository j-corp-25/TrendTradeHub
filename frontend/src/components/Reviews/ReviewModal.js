import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";

const ReviewModal = ({ showModal, handleClose }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); 


  const handleSubmit = () => {
    console.log("Comment:", comment);
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
