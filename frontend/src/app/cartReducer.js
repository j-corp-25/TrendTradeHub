import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

// Action Types
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const ADD_CART_SUCCESS = "ADD_CART_SUCCESS";
export const REMOVE_CART_SUCCESS = "REMOVE_CART_SUCCESS";

// Action Creators
export const fetchCartSuccess = (products) => ({
  type: FETCH_CART_SUCCESS,
  payload: products,
});

export const addCartSuccess = (product) => ({
  type: ADD_CART_SUCCESS,
  payload: product,
});

export const removeCartSuccess = (product) => ({
  type: REMOVE_CART_SUCCESS,
  payload: product,
});

// Thunk Action Creator
export const fetchCart = (userId) => async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/getCart`, {
        params: {
          userId: userId,
        },});
      dispatch(fetchCartSuccess(response.data));
    } catch (error) {
      console.error("Error fetching cart content:", error);
    }
};

export const addToCart = (productId, userId) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/addToCart`, { productId, userId });
    dispatch(addCartSuccess(productId));
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export const removeFromCart = (productId, userId) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/removeFromCart`, { productId, userId });
    dispatch(removeCartSuccess(productId));
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

// Reducer
const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_CART_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter((productId) => productId !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
