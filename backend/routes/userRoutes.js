import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);

export default router;
