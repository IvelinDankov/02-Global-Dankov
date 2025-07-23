import { Router } from "express";
import homeController from "./controllers/homeController.js";
import productController from "./controllers/catalogController.js";

const router = Router();

router.use("/", homeController);
router.use(productController);

export default router;
