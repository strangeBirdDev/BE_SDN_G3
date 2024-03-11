import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import AuthRouter from "./routes/Auth.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// Ghi log khi cos request call api
app.use(morgan("dev"));
app.use(express.json());

// Router:
app.get("/", (req, res) => {
    res.send("Hello from Express");
});

app.use("/auth", AuthRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
