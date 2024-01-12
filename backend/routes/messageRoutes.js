import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controllers/messageController.js";

router.post("/", protect, sendMessage);


export default router;
