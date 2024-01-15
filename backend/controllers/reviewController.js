import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
// @desc GET reviews
// @route GET /api/products/:productId/reviews
// @access PUBLIC
// const getReviews = asyncHandler(async (req, res) => {
//   const productId = req.params.productId;
//   const reviews = await Review.find({ product: productId }).populate(
//     "author",
//     "name"
//   );

//   if (reviews.length > 0) {
//     let averageRating =
//       reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

//     averageRating = parseFloat(averageRating.toFixed(2));

//     res.json({ reviews, averageRating });
//   } else {
//     res.status(404);
//     throw new Error("No reviews found for this product");
//   }
// });

//if no reviews return [] and rating 5
const getReviews = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const reviews = await Review.find({ product: productId }).populate({
    path: "author",
    select: "name image",
  });

  if (reviews.length > 0) {
    let averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    averageRating = parseFloat(averageRating.toFixed(2));

    res.json({ reviews, averageRating });
  } else {
    // If no reviews found, return an empty array for reviews and a default rating of 5
    res.json({ reviews: [], averageRating: 5 });
  }
});

// @desc Create reviews
// @route POST /api/reviews/create
// @access PRIVATE
const createReview = asyncHandler(async (req, res) => {
  // productId is going to be in the params so not needed for validation, product id doesn't need input, its referenced automatically
  const { productId, rating, comment, userId } = req.body;
  // const userId = req.user._id;

  if (rating === undefined || rating === null) {
    res.status(400);
    throw new Error("Rating is required");
  }

  if (!comment) {
    res.status(400);
    throw new Error("Comment is required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const review = await Review.create({
    product: productId,
    author: userId,
    rating,
    comment,
  });

  const user = await User.findById(userId);
  user.reviewsWritten.push(review);
  await user.save();

  if (product.author.toString() !== userId) {
    const productAuthor = await User.findById(product.author);
    productAuthor.reviewsReceived.push(review);
    await productAuthor.save();
  }

  await review.save();
  product.reviews.push(review);
  await product.save();

  res.status(201).json({ message: "Review created successfully", review });
});

// @desc Update Review
// @route POST /api/reviews/:id
// @access PRIVATE
const updateReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  const review = await Review.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.author.toString() !== userId) {
    res.status(401);
    throw new Error("User not authorized to update this review");
  }

  const product = await Product.findById(review.product);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { rating: req.body.rating, comment: req.body.comment },
    { new: true }
  ).populate({
    path: 'author',
    select: 'name image'
  });

  res.status(200).json(updatedReview);
});

// @desc Delete review
// @route POST /api/reviews/:id
// @access PRIVATE
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const userId = req.user.id;

  if (review.author.toString() !== userId) {
    res.status(403);
    throw new Error("User is not authorized to delete this review");
  }

  await Review.findByIdAndDelete(review._id);

  res
    .status(200)
    .json({ message: "Review has been deleted", reviewId: review._id });
});

export { getReviews, createReview, updateReview, deleteReview };
