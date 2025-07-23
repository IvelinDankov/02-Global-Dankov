import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  imageUrl: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Product = model("Product", productSchema);

export default Product;
