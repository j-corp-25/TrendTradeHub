// controllers/productController.js
import Product from '../models/productModel.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const formattedProducts = products.map(product => ({
      _id: product._id,
      title: product.title,
      condition: product.condition,
      price: product.price,
      category: product.category,
      images: product.images,
      author: product.author,
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files?.map(file => file.location);
    const { author, title, condition, price, category } = req.body;

    if (!title || !condition || !price || !category || !author) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = new Product({
      author,
      title,
      condition,
      price,
      category,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { title, condition, price, category } = req.body;
    console.log(title, condition, price, category);

    if (title) product.title = title;
    if (condition) product.condition = condition;
    if (price) product.price = price;
    if (category) product.category = category;

    const updatedProduct = await product.save();
    console.log(product === updatedProduct);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllProducts, createProduct, updateProduct, deleteProduct };
