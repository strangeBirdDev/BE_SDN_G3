import express from "express";
import createError from "http-errors";
import { blogController } from "../controllers/index.js";

const blogRouter = express.Router();

// userRouter.post("/", userController.login);
blogRouter.get("/", blogController.getAllBlog);
blogRouter.get("/:id", blogController.getBlogById);

export default blogRouter;
