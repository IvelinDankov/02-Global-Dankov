import Product from "../models/productModel.js";

export default {
  getAllProducts() {
    return Product.find();
  },
  sortedProducts(sortBy, order) {
    return Product.find().sort({ [sortBy]: order });
  },
  getOne(id) {
    return Product.findById(id);
  },
};
