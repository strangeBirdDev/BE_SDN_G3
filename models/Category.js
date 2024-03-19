import mongoose, { Schema } from "mongoose";

// Category schema
const categorySchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name already existing"],
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

// Mapping to Collection 'Products'
const Category = mongoose.model("categories", categorySchema);
export default Category;
