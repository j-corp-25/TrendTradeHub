import axios from "axios";
import { getUserToken } from "./userToken";
const GET_CONVERSATIONS_REQUEST = "GET_CONVERSATIONS_REQUEST";
const GET_CONVERSATIONS_SUCCESS = "GET_CONVERSATIONS_SUCCESS";
const GET_CONVERSATIONS_FAILURE = "GET_CONVERSATIONS_FAILURE";
const RESET_CONVERSATIONS = "RESET_CONVERSATIONS";

export const getConversationsRequest = () => ({
  type: GET_CONVERSATIONS_REQUEST,
});
export const getConversationsSuccess = (conversations) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  payload: conversations,
});
export const getConversationsFailure = (error) => ({
  type: GET_CONVERSATIONS_FAILURE,
  payload: error,
});
export const resetConversations = () => ({
  type: RESET_CONVERSATIONS,
});

const initialState = {
  conversations: [],
  isLoading: false,

  error: "",
};

const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";

export const updateLastMessage = (conversationId, lastMessage) => ({
  type: UPDATE_LAST_MESSAGE,
  payload: { conversationId, lastMessage },
});
const API_URL = "/api/messages/";



export const getConversations = () => async (dispatch) => {
  dispatch(getConversationsRequest());
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` },
    };
    const response = await axios.get(`${API_URL}conversations`, config);
    dispatch(getConversationsSuccess(response.data));
  } catch (error) {
    dispatch(getConversationsFailure(error.message));
  }
};

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
        isLoading: false,
      };
    case GET_CONVERSATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case RESET_CONVERSATIONS:
      return { ...initialState };
    case UPDATE_LAST_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation._id === action.payload.conversationId
            ? { ...conversation, lastMessage: action.payload.lastMessage }
            : conversation
        ),
      };
    default:
      return state;
  }
};

export default conversationReducer;
