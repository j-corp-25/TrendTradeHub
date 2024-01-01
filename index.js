import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const app = express();

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

// Express routes
app.post('/upload', upload.single('myPic'), (req, res) => {
  console.log(req.file);
  res.send('Successfully uploaded!');
});

app.post('/multiple', upload.array('myPic', 3), (req, res, next) => {
  console.log(req.files.length); // Fix: use req.files.length instead of req.files
  res.send(`Successfully uploaded files: ${req.files.length}`);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
