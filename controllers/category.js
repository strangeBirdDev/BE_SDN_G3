import express from "express";
import createError from "http-errors";
import Category from "../models/Category.js";

const getAllCate = async (req, res, next) => {
  try {
    const list = await Category.find({}).exec();
    res.send(list);
  } catch (error) {
    next(error);
  }
};

export default { getAllCate };
