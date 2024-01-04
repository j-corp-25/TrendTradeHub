import axios from "axios";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";
const RESET = "RESET";

const API_URL = "/api/users/register";
const API_URL_LOGIN = "/api/users/login";

const user = JSON.parse(localStorage.getItem("user"));


export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
export const registerFailure = (message) => ({
  type: REGISTER_FAILURE,
  payload: message,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  payload: message,
});

export const logout = () => ({ type: LOGOUT });
export const reset = () => ({ type: RESET });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(API_URL, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch(registerSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(registerFailure(message));
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(API_URL_LOGIN, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(registerFailure(message));
  }
};

export const performLogout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        user: null,
      };
    case LOGOUT:
      return { ...initialState, user: null };
    case RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,

      };
    default:
      return state;
  }
};

export default authReducer;
