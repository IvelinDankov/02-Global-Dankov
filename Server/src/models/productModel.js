import { Schema, Types, model } from "mongoose";
import User from "./userModel.js";

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  weight: { type: Number },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Types.ObjectId,
    ref: "User",
  },
});
const Product = model("Product", productSchema);

export default Product;
