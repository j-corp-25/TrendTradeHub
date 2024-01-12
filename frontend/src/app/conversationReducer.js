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

const API_URL = "/api/messages/";

const getUserToken = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user ? user.token : null;
};

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
    default:
      return state;
  }
};

export default conversationReducer;
