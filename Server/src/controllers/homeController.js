import { Router } from "express";
import productService from "../services/productService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.post("/create", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const product = req.body;
  try {
    await productService.createProduct(product, userId);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

export default homeController;
