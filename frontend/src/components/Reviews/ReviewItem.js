
import React from "react";
import './reviewItem.css'
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewItem = ({ review }) => {
  const { author, rating, comment } = review;

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

  return (
    <div className="review-item">
      <div className="review-author">
        <img src={author.profilePicture} alt={`${author.name}'s profile`} />
      </div>
      <div className="review-content">
        <div className="review-header">
          <div className="user-info">
            <div className="username">{author.name}</div>
            <div className="rating">{renderStars(rating)}</div>
          </div>
        </div>
        <div className="review-comment">{comment}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
