export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

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
