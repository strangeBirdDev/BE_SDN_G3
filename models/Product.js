import mongoose, { Schema } from "mongoose";
import Category from "./Category.js";

// Product schema
const productSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: [true, "Product name is required"],
            unique: [true, "Product name already existing"],
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: Category,
        },
        status: {
            type: String,
            require: true,
        },
        year: {
            type: Number,
            require: true,
        },
        productDetails: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: ProductDetails,
        },
        __v: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Mapping to Collection 'Products'
const Product = mongoose.model("products", productSchema);
export default Product;
