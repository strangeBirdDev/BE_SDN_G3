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

export default { getAllUser, getUserByUsernameOrEmail };
