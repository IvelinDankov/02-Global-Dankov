import { Router } from "express";
import homeController from "./controllers/homeController.js";
import productController from "./controllers/catalogController.js";
import userController from "./controllers/userController.js";
import likeController from "./controllers/likeController.js";

const router = Router();

router.use("/", homeController);
router.use("/products", productController);
router.use("/products", likeController);
router.use("/", userController);

export default router;
