import axios from "axios";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

const API_URL = "/api/users/register";
const API_URL_LOGIN = "/api/users/login";

const user = JSON.parse(localStorage.getItem("user"));

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFail = () => ({
  type: REGISTER_FAIL,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

const registerAuth = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const loginAuth = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logoutAuth = () => {
  localStorage.removeItem("user");
};
const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return error.message || error.toString();
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await registerAuth(userData);
    dispatch(registerSuccess(response));
  } catch (error) {
    dispatch(registerFail());
    const errorMessage = getErrorMessage(error);
    dispatch(setMessage(errorMessage));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await loginAuth(userData);
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFail());
    const errorMessage = getErrorMessage(error);
    dispatch(setMessage(errorMessage));
  }
};

export const performLogout = () => (dispatch) => {
  logoutAuth();
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
    case REGISTER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isError: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isError: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
