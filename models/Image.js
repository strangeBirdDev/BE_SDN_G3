import mongoose, { Schema } from "mongoose";

// Image schema
const imageSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        path: {
            type: String,
           
        },
        title: {
            type: String,
          
        },
        __v: {
            type: Number,
         
        },
    },
    // {
    //     timestamps: true,
    // }
);

// Mapping to Collection 'images'
const Image = mongoose.model("images", imageSchema);
export {Image, imageSchema};
