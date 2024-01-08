import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewModal = ({ showModal, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
 
    console.log("Rating:", rating);
    console.log("Comment:", comment);

    handleClose();
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
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  style={{ cursor: "pointer" }}
                >
                  {rating >= star ? (
                    <FaStar key={star} className="fa fa-star" />
                  ) : rating + 0.5 === star ? (
                    <FaStarHalfAlt key={star} className="fa fa-star-half-o" />
                  ) : (
                    <FaStar key={star} className="fa fa-star-o" />
                  )}
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
