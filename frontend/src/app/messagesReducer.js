import axios from 'axios';


const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

const GET_CONVERSATIONS_REQUEST = 'GET_CONVERSATIONS_REQUEST';
const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
const GET_CONVERSATIONS_FAILURE = 'GET_CONVERSATIONS_FAILURE';


const API_URL = '/api/messages'

const getUserToken = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user ? user.token : null;
  };

export const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
export const sendMessageSuccess = message => ({ type: SEND_MESSAGE_SUCCESS, payload: message });
export const sendMessageFailure = error => ({ type: SEND_MESSAGE_FAILURE, payload: error });

export const getMessagesRequest = () => ({ type: GET_MESSAGES_REQUEST });
export const getMessagesSuccess = messages => ({ type: GET_MESSAGES_SUCCESS, payload: messages });
export const getMessagesFailure = error => ({ type: GET_MESSAGES_FAILURE, payload: error });

export const getConversationsRequest = () => ({ type: GET_CONVERSATIONS_REQUEST });
export const getConversationsSuccess = conversations => ({ type: GET_CONVERSATIONS_SUCCESS, payload: conversations });
export const getConversationsFailure = error => ({ type: GET_CONVERSATIONS_FAILURE, payload: error });

