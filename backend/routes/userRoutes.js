import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.get("/profile",  getUserProfile);
router.patch("/profile",upload.single("image"), updateUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.get("/allUsers", getAllUsers)

export default router;
