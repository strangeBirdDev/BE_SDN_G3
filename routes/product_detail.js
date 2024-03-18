import express from "express";
import { productdetailController } from "../controllers/index.js";

const prodeRouter = express.Router();

prodeRouter.get("/", productdetailController.getAllProductDetails);
prodeRouter.get("/:id", productdetailController.getProductDetailById);
prodeRouter.put("/:id", productdetailController.editProductDetailById);

export default prodeRouter;
