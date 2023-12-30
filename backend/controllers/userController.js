import User from "../models/userModel.js";

const registerUser = (req, res) => {
  res.status(200).json({
    message: "Register User",
  });
};
const loginUser = (req, res) => {
  res.status(200).json({
    message: "Login User",
  });
};
const logoutUser = (req, res) => {
  res.status(200).json({
    message: "Logout User",
  });
};
const getUserProfile = (req, res) => {
  res.status(200).json({
    message: "User Profile Fetched",
  });
};
const updateUserProfile = (req, res) => {
  res.status(200).json({
    message: "User Profile Updated",
  });
};
export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
