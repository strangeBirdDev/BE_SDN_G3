import mongoose, { Schema } from "mongoose";
import Category from "./Category.js";
import {imageSchema} from "./Image.js";
import ProductDetails from "./ProductDetails.js"

// Sub-product
const subProducts = new Schema({
    _id: Schema.Types.ObjectId,
    subName: {
        type: String,
        require: true,
        unique: [true, 'Product name already existing'],
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        require: true,
    },
    memory: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    discountPrice: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
});

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
        color: {
            type: Array,
            require: true,
        },
        storage: {
            type: Array,
            require: true,
        },
        subProducts: [subProducts],
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
