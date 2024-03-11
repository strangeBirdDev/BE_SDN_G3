import mongoose, { Schema } from "mongoose";

// ProductDetails schema
const productDetailsSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        screenTechnology: {
            type: String,
        },
        screenResolution: {
            type: String,
        },
        screenSize: {
            type: String,
            require: true,
        },
        surfaceMaterial: {
            type: String,
        },
        otherUtilities: {
            type: String,
        },
        capacity: {
            type: String,
        },
        connection: {
            type: String,
        },
        backCamera: {
            type: String,
        },
        frontCamera: {
            type: String,
        },
        ram: {
            type: String,
            require: true,
        },
        batteryAndPower: {
            type: String,
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
