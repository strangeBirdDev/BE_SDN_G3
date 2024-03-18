import express from "express";
import createError from "http-errors";
import User from "../models/User.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw createError.BadRequest(`Invalid Username/Password`);

    const existUser = await User.findOne({ email: email }).exec();
    if (!existUser) throw createError.NotFound("User not registered");

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) throw createError.Unauthorized("Username/Password not valid");

    const accessToken = await signAccessToken(existUser.id);
    const refreshToken = await signRefreshToken(existUser.id);

    // res.send({email, password});
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const listUser = User.find({}).exec();
    res.send(listUser);
  } catch (error) {
    next(error);
  }
};

export default { login, getAllUser };
