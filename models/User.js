import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    email: {
      type: String,
      required: [true, "Email is not blank"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

export default User;
