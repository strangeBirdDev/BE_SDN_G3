import express from "express";
import { blogController } from "../controllers/index.js";

const blogRouter = express.Router();

blogRouter.get("/", blogController.getAllBlog);
blogRouter.get("/:id", blogController.getBlogById);
blogRouter.put("/:id", blogController.editBlog);
blogRouter.post("/", blogController.addNewBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;
