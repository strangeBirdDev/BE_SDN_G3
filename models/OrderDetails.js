import mongoose, { Schema } from "mongoose";
import Product from "./Product";

// OrderDetails schema
const orderDetailsSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        product: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: Product,
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

// Mapping to Collection 'order_details'
const OrderDetails = mongoose.model("order_details", orderDetailsSchema);
export default OrderDetails;
