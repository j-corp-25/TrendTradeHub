import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

// @desc GET reviews
// @route GET /api/products/:productId/reviews
// @access PUBLIC
const getReviews = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const reviews = await Review.find({ product: productId });

  if (reviews.length > 0) {
    res.json(reviews);
  } else {
    res.status(404);
    throw new Error("No reviews found for this product");
  }
});

// @desc Create reviews
// @route POST /api/reviews/create
// @access PRIVATE
const createReview = asyncHandler(async (req, res) => {
  // productId is going to be in the params so not needed for validation, product id doesnt need input, its referenced automatically
  const { productId, rating, comment } = req.body;
  const userId = req.user._id;

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

  await review.save();

  product.reviews.push(review._id);
  await product.save();

  res.status(201).json({ message: "Review created successfully", review });
});

// @desc Update Review
// @route POST /api/reviews/:id
// @access PRIVATE



// @desc Delete review
// @route POST /api/reviews/:id
// @access PRIVATE


export {
    getReviews,
    createReview
}
