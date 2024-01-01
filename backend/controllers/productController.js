// controllers/productController.js
import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
  try {
    const { title, condition, price, category } = req.body;

    const newProduct = new Product({
      title,
      condition,
      price,
      category,
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
