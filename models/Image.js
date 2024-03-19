import mongoose, { Schema } from "mongoose";

// Image schema
const imageSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    path: {
      type: String,
      required: [true, "Image path is required"],
      unique: [true, "Image path already existing"],
    },
    title: {
      type: String,
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

// Mapping to Collection 'images'
const Image = mongoose.model("images", imageSchema);
export { Image, imageSchema };
