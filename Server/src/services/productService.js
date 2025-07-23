import Product from "../models/productModel.js";

export default {
  getAllProducts() {
    return Product.find();
  },
};
