// models/Product.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const productSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

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
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
},{
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
