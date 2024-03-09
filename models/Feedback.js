import mongoose, { Schema } from "mongoose";
import Product from "./Product";

// Feedback schema
const feedbackSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: Product,
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            require: true,
            min: [0, "Rating must be > 0"],
            max: [5, "Rating must be < 5"],
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

// Mapping to Collection 'feedbacks'
const Feedback = mongoose.model("feebacks", feedbackSchema);
export default Feedback;
