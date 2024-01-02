// controllers/productController.js
import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
  try {
    const { author, title, condition, price, category, images } = req.body;

    const newProduct = new Product({
      author,
      title,
      condition,
      price,
      category,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  createProduct,
};
