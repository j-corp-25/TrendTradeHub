import axios from "axios";

const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST";
const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

const RESET_MESSAGES = "RESET_MESSAGES";
const API_URL = "/api/messages/";

const getUserToken = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user ? user.token : null;
};
export const resetMessages = () => ({
  type: RESET_MESSAGES,
});
export const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
export const sendMessageSuccess = (message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message,
});
export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});

export const getMessagesRequest = () => ({ type: GET_MESSAGES_REQUEST });
export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});
export const getMessagesFailure = (error) => ({
  type: GET_MESSAGES_FAILURE,
  payload: error,
});

export const sendMessage = (recipientId, message) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };
    const response = await axios.post(
      `${API_URL}`,
      { recipientId, message },
      config
    );
    dispatch(sendMessageSuccess(response.data));
  } catch (error) {
    dispatch(sendMessageFailure(error.message));
  }
};

export const getMessages = (otherUserId) => async (dispatch) => {
  dispatch(getMessagesRequest());
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };
    const response = await axios.get(`${API_URL}${otherUserId}`, config);
    dispatch(getMessagesSuccess(response.data));
  } catch (error) {
    dispatch(getMessagesFailure(error.message));
  }
};

const initialState = {
  messages: [],
  isLoading: false,
  error: "",
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        isLoading: false,
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case RESET_MESSAGES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default messagesReducer;
