// routes/productRoutes.js
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import Product from '../models/productModel.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';


dotenv.config();

const router = express.Router();

// Configure AWS S3 SDK (update authentication)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const myBucket = process.env.AWS_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
  }),
});


router.get('/all', getAllProducts);
router.post('/create', upload.array('myPic', 3), createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);




export default router;
