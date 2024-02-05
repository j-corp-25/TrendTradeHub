import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

// @desc Register new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});
// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    image: req.user.image,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// @route PATCH /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  user._id = req.body.id;
  user.email = req.body.email || user.email
  user.name = req.body.name || user.name;

  if (req.body.password) {
    user.password = req.body.password;
  }

  if (req.file && req.file.path) {
    user.image = req.file.path;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
  });
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map(user => ({
      _id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
    }));
    res.status(200).json(formattedUsers);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const findUserProfile = asyncHandler(async (req, res) => {
  const { name } = req.params;

  const user = await User.findOne({ name })
    .select("-password")
    .select("-updatedAt")
    .select("-reviewsWritten")
    .select("-reviewsReceived");

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});



// Add a product to the user's cart
const addToCart = async (req, res) => {
  const { productId,userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      user.save();
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Remove a product from the user's cart
const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const index = user.cart.indexOf(productId);
  if (index !== -1) {
    user.cart.splice(index, 1);
    await user.save();
  }

    res.status(200).json({ message: 'Product removed from cart successfully' });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get the content of the user's cart
const getCartContent = async (req, res) => {
  const {userId} = req.query;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartContent = await user.cart;

    res.status(200).json(cartContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  findUserProfile,
  getAllUsers,
  addToCart,
  removeFromCart,
  getCartContent
};
