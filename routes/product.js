import express from "express";
import { productController } from "../controllers/index.js";

// Khai báo đối tượng router
const productRouter = express.Router();

productRouter.get("/", productController.getProductsByPageAndCategory);
productRouter.get("/all", productController.getAllProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.put("/:id", productController.updateProductById);
productRouter.post("/", productController.createProduct);
productRouter.delete("/:id", productController.deleteProductById);
productRouter.get("/find/:id", productController.findProductByProductId);
productRouter.get("/subProduct/:id", productController.findSubProductBySubProductId);
productRouter.get("/subProduct", productController.findSubProductByStorage);
productRouter.get("/cookie/:id", productController.testcookie);

export default productRouter;
