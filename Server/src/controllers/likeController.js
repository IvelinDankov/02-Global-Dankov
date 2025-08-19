import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import productService from "../services/productService.js";

const likeController = Router();

likeController.get("/isLiked/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  try {
    let product = await productService.getOne(productId);

    const isLiked = product.likes.some((id) => userId === id.toString());

    if (isLiked) {
      return res.status(200).json({ isLiked: true });
    }

    if (userId) {
      return res.status(200).json({ isLiked: false });
    } else {
      return res.status(200).json({ isLiked: null });
    }
  } catch (err) {
    const error = await errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

likeController.post("/like/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const userId = req.user?.id;
  try {
    let product = await productService.getOne(id);

    const isLiked = product.likes.some((id) => userId === id.toString());

    if (isLiked) {
      throw new Error("You already liked this product!");
    }
    await productService.like(id, userId);
    product = await productService.getOne(id);

    res.json({ likes: product.likes, message: "Like successful" });
  } catch (err) {
    const error = errorMsg(err);
    res.status(404).json({ message: error, error: error });
  }
});

likeController.delete("/like/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    let product = await productService.getOne(id);

    const isLiked = product.likes.some((id) => userId === id.toString());

    if (!isLiked) {
      throw new Error("You have no liked this product");
    }
    await productService.unlike(userId, id);
    product = await productService.getOne(id);

    res.json({ likes: product.likes, message: "Unlike success!" });
  } catch (err) {
    const error = await errorMsg(err);
    res.status(404).json({ message: error, error: error });
  }
});

export default likeController;
