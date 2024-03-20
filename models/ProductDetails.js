import mongoose, { Schema } from "mongoose";

// ProductDetails schema
const productDetailsSchema = new Schema(
    {
        screenTechnology: {
            type: String,
        },
        screenResolution: {
            type: String,
        },
        screenSize: {
            type: String,
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
        },
        batteryAndPower: {
            type: String,
        },
        processor: {
            type: String,
        },
        memory: {
            type: String,
        },
        weight: {
            type: String,
        },
        operatingSystem: {
            type: String,
        },
        __v: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Mapping to Collection 'product_details'
const ProductDetails = mongoose.model("product_details", productDetailsSchema);
export default ProductDetails;
