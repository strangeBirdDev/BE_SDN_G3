import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
