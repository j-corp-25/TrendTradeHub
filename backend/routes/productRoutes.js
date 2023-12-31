const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

// Routes
router.post('/', upload, productController.createProduct);
router.put('/:id', upload, productController.updateProduct);

module.exports = router;
