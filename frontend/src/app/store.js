import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productReducer from "./productReducer";
import authReducer from "./userReducer";
import reviewReducer from "./reviewsReducer";
import conversationReducer from "./conversationReducer"
import messagesReducer from "./messagesReducer"
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer,
  messages: messagesReducer,
  conversations: conversationReducer,
  cart: cartReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
