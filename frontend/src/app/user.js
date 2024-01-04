export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

const API_URL = "/api/users/register";
const API_URL_LOGIN = "/api/users/login";

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


  export const register = (userData) => async (dispatch) => {
    try {
      const response = await axios.post(API_URL, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(registerSuccess(response.data));
      }
    } catch (error) {
      dispatch(registerFail());
      dispatch(setMessage(error.toString()));
    }
  };

  export const login = (userData) => async (dispatch) => {
    try {
      const response = await axios.post(API_URL_LOGIN, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(loginSuccess(response.data));
      }
    } catch (error) {
      dispatch(loginFail());
      dispatch(setMessage(error.toString()));
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
          message: '',
        };
      default:
        return state;
    }
  };

  export default authReducer;
