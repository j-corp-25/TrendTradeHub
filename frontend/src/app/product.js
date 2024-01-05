import React from "react";
import jwtFecth from "./jwt";
import axios from "axios";

const API_URL = "api/products";

// Action Types

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_RELATED_PRODUCTS_SUCCESS = 'FETCH_RELATED_PRODUCTS_SUCCESS';


// Action Creators
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchSingleProductSuccess = (product) => ({
  type: FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchRelatedProductsSuccess = (relatedProducts) => ({
  type: FETCH_RELATED_PRODUCTS_SUCCESS,
  payload: relatedProducts,
});

// Thunk Action Creator
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/create`, productData);
    const product = await response.data;
    dispatch(addProductSuccess(product));
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/details/${productId}`);
    dispatch(fetchSingleProductSuccess(response.data));
  } catch (error) {
    console.error('Error fetching single product:', error);
  }
};

export const fetchRelatedProducts = (productId) => async (dispatch) => {
  try {
    const selectedProductResponse = await axios.get(`${API_URL}/details/${productId}`);
    const selectedProduct = selectedProductResponse.data;

    const relatedProductsResponse = await axios.get(`${API_URL}/category/${selectedProduct.category}`);
    const relatedProducts = relatedProductsResponse.data.filter(product => product._id !== productId);

    // Dispatch both the selected product and related products to the reducer
    dispatch(fetchRelatedProductsSuccess({ selectedProduct, relatedProducts }));
  } catch (error) {
    console.error('Error fetching related products:', error);
  }
};

//Reducer
const initialState = {
  products: [],
  relatedProducts: { selectedProduct: {}, relatedProducts: [] },
};
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
        };
  
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          products: [...state.products, action.payload],
        };

        case FETCH_SINGLE_PRODUCT_SUCCESS:
          return {
            ...state,
            selectedProduct: action.payload,
          };
        
          case FETCH_RELATED_PRODUCTS_SUCCESS:
            return {
              ...state,
              relatedProducts: action.payload,
            };
  
      default:
        return state;
    }
  };
  
export default productReducer;
