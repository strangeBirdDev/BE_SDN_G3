import express from "express";
import { productController } from "../controllers/index.js";

// Khai báo đối tượng router
const productRouter = express.Router();

// productRouter.get("/", productController.getProductsByPageAndCategory);
productRouter.get("/", productController.getAllProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.put("/:id", productController.updateProductById);
productRouter.post("/", productController.createProduct);
productRouter.delete("/:id", productController.deleteProductById);

export default productRouter;
