import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log("Authorization Header:", req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      // console.log("Extracted Token:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("JWT_SECRET:", process.env.JWT_SECRET);
      // console.log("Decoded Token:", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("Fetched User:", req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }


  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
