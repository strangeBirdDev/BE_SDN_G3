import express from "express";
import { productController } from "../controllers/index.js";

// Khai báo đối tượng router
const productRouter = express.Router();

// productRouter.get("/", productController.getProductsByPageAndCategory);
productRouter.get("/", productController.getAllProduct);

export default productRouter;
