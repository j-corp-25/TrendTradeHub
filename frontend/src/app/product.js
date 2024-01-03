import React from "react";
import jwtFetch from "./jwt";

const API_URL = 'http://localhost:4000/api/products'; // Replace with your API endpoint

// Action Types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

// Action Creators
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

// Thunk Action Creator
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/create`, productData);
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
