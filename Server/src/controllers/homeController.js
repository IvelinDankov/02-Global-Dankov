import { Router } from "express";
import productService from "../services/productService.js";

const homeController = Router();

homeController.post("/create", async (req, res) => {
  const product = req.body;
  try {
    await productService.createProduct(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

export default homeController;
