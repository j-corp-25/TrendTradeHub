import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controllers/messageController.js";
import { getMessages } from "../controllers/messageController.js";

router.post("/", protect, sendMessage);
router.get("/:otherUserId", protect, getMessages);

export default router;
