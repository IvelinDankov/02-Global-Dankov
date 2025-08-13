import { Router } from "express";
import productService from "../services/productService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import errorMsg from "../utils/errorMsg.js";

const productController = Router();

productController.get("/", async (req, res) => {
  const sortBy = req.query.sortBy;
  const order = req.query.order === "asc" ? 1 : -1;

  try {
    const sortedProducts = await productService.sortedProducts(sortBy, order);

    res.status(200).json(sortedProducts);
  } catch (err) {
    const error = errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

productController.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.getOne(id);

    res.status(200).json(product);
  } catch (err) {
    const error = errorMsg(err);
    res.status(500).json({ message: error.message, error: error });
  }
});
productController.delete("/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const product = await productService.getOne(id);

    if (String(product.owner) !== userId) {
      throw new Error("Could not remove product!");
    } else {
      await productService.remove(id);
    }
  } catch (err) {
    const error = errorMsg(err);
    res.status(404).json({ message: error, error: error });
  }
});

productController.put("/edit/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const userId = req.user.id;

  // const product = req;

  // console.log(`ProductId: ${id} ProductBody ${product}`);

  try {
    let product = await productService.getOne(id);

    if (userId !== String(product.owner)) {
      throw new Error("Could not update product!");
    } else {
      await productService.updateProduct(id, updatedProduct);
    }
    res.status(200).json(product);
  } catch (err) {
    const error = errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

export default productController;
