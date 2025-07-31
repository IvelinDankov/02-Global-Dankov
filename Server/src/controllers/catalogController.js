import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get("/products", async (req, res) => {
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  console.log(`Sorting by ${sortBy} in ${req.query.order} (${order})`);

  try {
    const sortedProducts = await productService.sortedProducts(sortBy, order);

    res.status(200).json(sortedProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

export default productController;
