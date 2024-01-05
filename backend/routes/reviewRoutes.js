import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";

router.post("/create", protect, createReview);
router.get("/:productId/reviews", getReviews);
router.patch("/:id", protect, updateReview);

export default router;
