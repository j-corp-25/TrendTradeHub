import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

const uploadMiddleware = upload.array('images', 5); // 'images' is the field name for multiple file uploads

export default uploadMiddleware;
