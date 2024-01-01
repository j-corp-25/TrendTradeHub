// routes/productRoutes.js
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import Product from '../models/productModel.js';

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
    // acl: 'public-read',
    // contentType: multerS3.AUTO_CONTENT_TYPE,
    // key: (req, file, cb) => {
    //   cb(null, file.originalname);
    // },
  }),
});

// Multiple image upload route
router.post('/create', upload.array('myPic', 3), async (req, res) => {
  try {
    // Extract image URLs from the request
    const imageUrls = req.files?.map(file => file.location);

    // Extract other product details from the request body
    const { title, condition, price, category } = req.body;

    // Validate required fields
    if (!title || !condition || !price || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new product with image URLs
    const newProduct = new Product({
      title,
      condition,
      price,
      category,
      images: imageUrls,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Send the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
