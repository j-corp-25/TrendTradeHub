import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc Register new user
// @route POST /api/users/register
// @access Public
const registerUser = (req, res) => {
  res.status(200).json({
    message: "Register User",
  });
};
// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Login User",
  });
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Logout User",
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Profile Fetched",
  });
});

// @desc Update user profile
// @route PATCH /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Profile Updated",
  });
});
export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
