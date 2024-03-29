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
  findUserProfile,
  getAllUsers,
  addToCart,
  getCartContent,
  removeFromCart
  
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.patch("/profile", upload.single("image"), updateUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.get("/profile/:name",findUserProfile)
router.get("/allUsers", getAllUsers)
router.post("/addToCart", addToCart);
router.get("/getCart", getCartContent);
router.delete("/removeFromCart", removeFromCart);


export default router;
