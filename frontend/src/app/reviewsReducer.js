import axios from "axios";

const GET_REVIEWS_REQUEST = "GET_REVIEWS_REQUEST";
const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE";

const CREATE_REVIEW_REQUEST = "CREATE_REVIEW_REQUEST";
const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
const CREATE_REVIEW_FAILURE = "CREATE_REVIEW_FAILURE";

const DELETE_REVIEW_PENDING = "DELETE_REVIEW_PENDING";
const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const UPDATE_REVIEW_PENDING = "UPDATE_REVIEW_PENDING";
const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
const UPDATE_REVIEW_FAILURE = "UPDATE_REVIEW_FAILURE";

const API_URL = "/api/reviews/";
const API_URL_CREATE = "/api/reviews/create";

//this gets the token from the user object in local storage
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const userToken = user ? user.token : null;

export const getReviewsRequest = () => ({
  type: GET_REVIEWS_REQUEST,
});

export const getReviewsSuccess = ({ reviews, averageRating }) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: { reviews, averageRating },
});

export const getReviewsFailure = (message) => ({
  type: GET_REVIEWS_FAILURE,
  payload: message,
});

export const createReviewRequest = () => ({
  type: CREATE_REVIEW_REQUEST,
});

export const createReviewSuccess = (review) => ({
  type: CREATE_REVIEW_SUCCESS,
  payload: review,
});

export const createReviewFailure = (message) => ({
  type: CREATE_REVIEW_FAILURE,
  payload: message,
});

export const deleteReviewPending = () => ({
  type: DELETE_REVIEW_PENDING,
});

export const deleteReviewSuccess = (reviewId) => ({
  type: DELETE_REVIEW_SUCCESS,
  payload: reviewId,
});
export const deleteReviewFailure = (message) => ({
  type: DELETE_REVIEW_FAILURE,
  payload: message,
});
export const updateReviewPending = () => ({
  type: UPDATE_REVIEW_PENDING,
});
export const updateReviewSuccess = (review) => ({
  type: UPDATE_REVIEW_SUCCESS,
  payload: review,
});
export const updateReviewFailure = (message) => ({
  type: UPDATE_REVIEW_FAILURE,
  payload: message,
});

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch(deleteReviewPending());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const url = `${API_URL}${reviewId}`;
    const response = await axios.delete(url, config);
    dispatch(deleteReviewSuccess(reviewId));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(deleteReviewFailure(message));
  }
};
export const fetchReviews = (productId) => async (dispatch) => {
  dispatch(getReviewsRequest());
  try {
    const url = `${API_URL}/${productId}`;
    const response = await axios.get(url);
    dispatch(
      getReviewsSuccess({
        reviews: response.data.reviews,
        averageRating: response.data.averageRating,
      })
    );
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(getReviewsFailure(message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  dispatch(createReviewRequest());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.post(API_URL_CREATE, reviewData, config);
    dispatch(createReviewSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(createReviewFailure(message));
  }
};

export const updateReview =
  (reviewId, updatedReviewData) => async (dispatch) => {
    dispatch(updateReviewPending());
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const url = `${API_URL}${reviewId}`;
      const response = await axios.patch(url, updatedReviewData, config);
      dispatch(updateReviewSuccess(response.data));
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(updateReviewFailure(message));
    }
  };
const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };

    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload.reviews,
        averageRating: action.payload.averageRating,
        isLoading: false,
        error: null,
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
        reviews: [],
      };
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
        reviews: [],
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: [...state.reviews, action.payload],
        isSuccess: true,
        message: "",
        reviews: [],
      };
    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
        reviews: [],
      };
    case DELETE_REVIEW_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: state.reviews.filter((review) => review._id !== action.payload),
        isSuccess: true,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
      };
    case UPDATE_REVIEW_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_REVIEW_SUCCESS:
      const updatedReviews = state.reviews
        .filter((review) => review.id !== action.payload.updatedReview.id)
        .concat(action.payload.updatedReview);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        reviews: updatedReviews,
      };

    case UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
