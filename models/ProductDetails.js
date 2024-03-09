import mongoose, { Schema } from "mongoose";
import Image from "./Image";

// ProductDetails schema
const productDetailsSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        images: [Image],
        color: {
            type: String,
            require: true,
        },
        screen: {
            type: String,
            require: true,
        },
        ram: {
            type: String,
            require: true,
        },
        memory: {
            type: String,
            require: true,
        },
        battery: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        __v: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Mapping to Collection 'product_details'
const ProductDetails = mongoose.model("product_details", productDetailsSchema);
export default ProductDetails;
