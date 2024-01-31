import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content: [productSchema],
    // content: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //   ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
