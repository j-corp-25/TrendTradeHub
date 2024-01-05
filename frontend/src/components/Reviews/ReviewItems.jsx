import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { fetchReviews} from "../../app/reviews"
import { useParams } from 'react-router-dom';
import {
    Container,
  } from "react-bootstrap";

const ReviewItems = () => {

    const dispatch = useDispatch();
    const { productId } = useParams();

    const {reviews,isLoading, isError, isSuccess, message } = useSelector (
        (state) => state.reviews
    )

  return (

    <div>Reviews</div>
  )
}

export default ReviewItems
