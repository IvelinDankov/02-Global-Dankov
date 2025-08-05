import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get("/", async (req, res) => {
  const sortBy = req.query.sortBy;
  const order = req.query.order === "asc" ? 1 : -1;

  try {
    const sortedProducts = await productService.sortedProducts(sortBy, order);

    res.status(200).json(sortedProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

productController.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.getOne(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});
productController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.remove(id);
    if (!product) {
    }
  } catch (err) {
    res.status(404).json({ message: "Could not delete Product", error: err });
  }
});

productController.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  // const product = req;

  // console.log(`ProductId: ${id} ProductBody ${product}`);

  try {
    const product = await productService.updateProduct(id, updatedProduct);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

export default productController;
