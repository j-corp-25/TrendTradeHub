import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  imageKeys: [{ type: String, required: false }],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
