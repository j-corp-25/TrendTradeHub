import express from 'express';
const router = express.Router();

import upload from '../middleware/upload.js';
import {uploadController} from '../controllers/productController.js';

router.post('/upload-single', upload.single('file'), uploadController.uploadSingle);
router.post('/upload-multiple', upload.array('files', 5), uploadController.uploadMultiple);

/* ------------------------ upload and error handling ----------------------- */
router.post('/upload-single-v2', uploadController.uploadSingleV2);

export default router;
