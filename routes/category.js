import express from "express";
import { cateController } from "../controllers/index.js";

const cateRouter = express.Router();

cateRouter.get("/", cateController.getAllCate);

export default cateRouter;
