import express from "express";
import createError from "http-errors";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

// userRouter.post("/", userController.login);
userRouter.get("/", userController.getAllUser);

export default userRouter;
