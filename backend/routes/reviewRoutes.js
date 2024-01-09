import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

router.post("/create", createReview);
router.get("/:productId", getReviews);
router.patch("/:id", protect, updateReview);
router.delete("/:id",protect,deleteReview)

export default router;
