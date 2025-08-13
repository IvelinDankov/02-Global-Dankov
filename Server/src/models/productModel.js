import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLenght: [4, "Name must be at least 4 characters long!"],
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  rating: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});
const Product = model("Product", productSchema);

export default Product;
