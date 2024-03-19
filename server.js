import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import { verifyAccessToken } from "./helpers/jwt_helper.js";
import {
  blogRouter,
  cateRouter,
  productRouter,
  userRouter,
} from "./routes/index.js";
import cors from "cors";
import AuthRouter from "./routes/Auth.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// Ghi log khi cos request call api
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Wildcard is NOT for Production
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/", AuthRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/categories", cateRouter);
app.use("/products", productRouter);

// Chỉ định middleware kiểm soát requests không hợp lệ
app.use(async (req, res, next) => {
  next(createError.NotFound()); // Có thể bổ sung message trong hàm NotFound
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
