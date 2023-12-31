import express from "express";
const router = express.Router();
import {createProduct, updateProduct} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

router.post('/', upload, createProduct);
router.put('/:id', upload, updateProduct);

export default router;
