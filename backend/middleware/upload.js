import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
// import s3 from '../utils/aws.js';
import AWS from 'aws-sdk';
const myBucket = process.env.AWS_BUCKET_NAME;
const s3 = new AWS.S3();
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

export default upload;
