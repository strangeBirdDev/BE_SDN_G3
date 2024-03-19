import express from "express";
import createError from "http-errors";
import User from "../models/User.js";

const getUserByUsernameOrEmail = async (usernameOrEmail) => {
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const listUser = await User.find({}).exec();
    res.send(listUser);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { email } = req.params; // Lấy email từ URL hoặc từ body request

    // Lấy thông tin cập nhật từ body request
    const { name, address, city, phone } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Cập nhật thông tin người dùng
    user.name = name || user.name;
    user.address = address || user.address;
    user.city = city || user.city;
    user.phone = phone || user.phone;

    // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAllUser, getUserByUsernameOrEmail, updateProfile };
