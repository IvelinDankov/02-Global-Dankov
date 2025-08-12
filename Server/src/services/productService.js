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
  remove(id) {
    return Product.findByIdAndDelete(id);
  },
  updateProduct(id, newProduct) {
    return Product.findByIdAndUpdate(id, newProduct);
  },
  createProduct(product, ownerId) {
    return Product.create({ ...product, owner: ownerId });
  },
  async like(productId, userId) {
    return Product.findByIdAndUpdate(
      productId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  },
};
