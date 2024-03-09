import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import ProductDetails from "./ProductDetails";

// Order schema
const orderSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User,
        },
        products: [ProductDetails],
        quantity: {
            type: Number,
            require: true,
        },
        totalPrice: {
            type: Number,
            require: true,
        },
        addressShipping: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
        },
        __v: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Mapping to Collection 'orders'
const Order = mongoose.model("orders", orderSchema);
export default Order;
