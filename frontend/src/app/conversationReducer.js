const GET_CONVERSATIONS_REQUEST = "GET_CONVERSATIONS_REQUEST";
const GET_CONVERSATIONS_SUCCESS = "GET_CONVERSATIONS_SUCCESS";
const GET_CONVERSATIONS_FAILURE = "GET_CONVERSATIONS_FAILURE";
const RESET_CONVERSATIONS = "RESET_CONVERSATIONS";

const initialConversationsState = {
    conversations: [],
    isLoading: false,
    error: ""
  };

const API_URL = "/api/messages/conversations"

const getUserToken = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user ? user.token : null;
  };
