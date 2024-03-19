import express from "express";
import createError from "http-errors";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

// userRouter.post("/", userController.login);
userRouter.get("/", userController.getAllUser);
userRouter.get("/:usernameOrEmail", async (req, res, next) => {
  try {
    const { usernameOrEmail } = req.params;
    const user = await userController.getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw createError.NotFound("User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/:email", userController.updateProfile);

export default userRouter;
