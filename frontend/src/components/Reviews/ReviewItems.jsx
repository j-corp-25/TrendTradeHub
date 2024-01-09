import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { fetchReviews } from "../../app/reviewsReducer";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { FaCheck, FaTimes } from "react-icons/fa"; // Import the icons
import ReviewItem from "./ReviewItem";

const ReviewItems = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, isSuccess, message, averageRating } =
    useSelector((state) => state.reviews);
    const userId = useSelector((state) => state.auth.user._id);


  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(message);
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
      {reviews.map((review) => (
        <React.Fragment key={review._id}>
          <ReviewItem review={review} userId={userId} />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ReviewItems;
