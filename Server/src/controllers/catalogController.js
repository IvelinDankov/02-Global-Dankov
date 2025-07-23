import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get("/products", async (req, res) => {
  try {
    const allProducts = await productService.getAllProducts();

    console.log(allProducts);

    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

export default productController;
