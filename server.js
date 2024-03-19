import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import { productRouter, cateRouter } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// Ghi log khi cos request call api
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use("/products", productRouter);
app.use("/categories", cateRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
