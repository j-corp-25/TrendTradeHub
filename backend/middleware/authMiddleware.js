import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// const protect = asyncHandler(async (req, res, next) => {
//     let token

//     if(req.headers.authorization && req.headers)
// });

export { protect };
