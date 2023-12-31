import Product from '../models/productModel.js';
import awsUtils from '../utils/aws.js';

const createProduct = async (req, res) => {
  try {
    const { title, category, price, condition } = req.body;
    const imageKeys = [];

    for (const file of req.files) {
      const key = await awsUtils.s3Upload(file, 'product-images');
      imageKeys.push(key);
    }

    const product = new Product({ title, category, price, condition, imageKeys });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, category, price, condition } = req.body;
    const imageKeys = [];

    const existingProduct = await Product.findById(req.params.id);
    for (const key of existingProduct.imageKeys) {
      await awsUtils.s3Delete(key);
    }

    for (const file of req.files) {
      const key = await awsUtils.s3Upload(file, 'product-images');
      imageKeys.push(key);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, category, price, condition, imageKeys },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { createProduct, updateProduct };
