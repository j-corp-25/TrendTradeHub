// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{
    type: String, 
  }],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
