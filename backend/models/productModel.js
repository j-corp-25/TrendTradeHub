const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  imageKeys: [{ type: String, required: true }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
