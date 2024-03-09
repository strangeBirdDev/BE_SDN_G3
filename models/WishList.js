import mongoose, { Schema } from "mongoose";
import Product from "./Product";
import User from "./User";

// WishList schema
const wishListSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        products: [Product],
        user: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: User,
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

// Mapping to Collection 'wish_lists'
const WishList = mongoose.model("wish_lists", wishListSchema);
export default WishList;
