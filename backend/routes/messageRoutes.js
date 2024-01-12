import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { sendMessage, getMessages, getConversations } from "../controllers/messageController.js";

router.get("/conversations", protect, getConversations);
router.post("/", protect, sendMessage);
router.get("/:otherUserId", protect, getMessages);

export default router;
