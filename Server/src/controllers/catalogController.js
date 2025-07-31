import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get("/products", async (req, res) => {
  const sortBy = req.query.sortBy;
  const order = req.query.order === "asc" ? 1 : -1;

  try {
    const sortedProducts = await productService.sortedProducts(sortBy, order);

    res.status(200).json(sortedProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

productController.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.getOne(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

export default productController;
