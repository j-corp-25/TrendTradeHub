import axios from "axios";

const GET_REVIEWS_REQUEST = "GET_REVIEWS_REQUEST";
const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
const GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE";

const CREATE_REVIEW_REQUEST = "CREATE_REVIEW_REQUEST";
const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
const CREATE_REVIEW_FAILURE = "CREATE_REVIEW_FAILURE";

const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const API_URL = "/api/reviews/";
const API_CURL_CREATE = "/api/reviews/create";

//this gets the token from the user object in local storage
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const userToken = user ? user.token : null;

export const getReviewsRequest = () => ({
  type: GET_REVIEWS_REQUEST,
});
export const getReviewsSuccess = (reviews) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: reviews,
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

export const fetchReviews = (productId) => async (dispatch) => {
  dispatch(getReviewsRequest());
  try {
    const url = `${API_URL}/${productId}/reviews`
    const response = await axios.get(url);
    dispatch(getReviewsSuccess(response.data));
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

    const response = await axios.post(API_CURL_CREATE, reviewData, config);
    dispatch(createReviewSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(createReviewFailure(message));
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
        isLoading: false,
        reviews: action.payload,
        isSuccess: true,
        message: ""
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: [...state.reviews, action.payload],
        isSuccess: true,
        message: "",
      };
    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
