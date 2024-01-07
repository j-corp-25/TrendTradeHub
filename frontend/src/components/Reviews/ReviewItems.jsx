import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { fetchReviews } from "../../app/reviews";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const ReviewItems = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(message)
    }
  }, [isError, isLoading, message]);


  if (isLoading) {
    return (
      <Container className="my-6">
        <div>
          <BeatLoader />
        </div>
      </Container>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available for this product</div>;
  }
  return (
    <Container>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <p>Comment: {review.comment}</p>
          <p>Rating: {review.rating}</p>
          <p>User: {review.author.name}</p>
        </div>
      ))}
    </Container>
  );
};

export default ReviewItems;
