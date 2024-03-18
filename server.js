import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import {productRouter} from './routes/index.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
// Ghi log khi cos request call api
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use('/products',productRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
