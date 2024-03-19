import express from "express";
import { productdetailController } from "../controllers/index.js";

const prodeRouter = express.Router();

prodeRouter.get("/", productdetailController.getAllProductDetails);
prodeRouter.post("/", productdetailController.createNewProductDetail);
prodeRouter.delete("/:id", productdetailController.deleteProductDetailById);
prodeRouter.get("/:id", productdetailController.getProductDetailById);
prodeRouter.put("/:id", productdetailController.editProductDetailById);

export default prodeRouter;
