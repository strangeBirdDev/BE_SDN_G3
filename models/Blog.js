import mongoose, { Schema } from "mongoose";

// Blog schema
const blogSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    title: {
      type: String,
      required: [true, "Blog title is required"],
      unique: [true, "Blog title already existing"],
    },
    body: {
      type: String,
      required: true,
    },
    images: {
      type: Schema.Types.ObjectId,
      ref: "images",
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

// Mapping to Collection 'blogs'
const Blog = mongoose.model("blogs", blogSchema);
export default Blog;
