import express from "express";
import createError from "http-errors";
import Blog from "../models/Blog.js";

const getAllBlog = async (req, res, next) => {
  try {
    const listUser = await Blog.find({}).exec();
    res.send(listUser);
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming the id is provided as a route parameter
    const blog = await Blog.findById(id).exec();
    if (!blog) {
      throw createError(404, "Blog not found");
    }
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryId, title, body, images } = req.body; // Assuming these are the fields you want to update
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { categoryId, title, body, images },
      { new: true }
    ).exec();
    if (!updatedBlog) {
      throw createError(404, "Blog not found");
    }
    res.send(updatedBlog);
  } catch (error) {
    next(error);
  }
};

const addNewBlog = async (req, res, next) => {
  try {
    const { categoryId, title, body, images } = req.body;
    const newBlog = new Blog({ categoryId, title, body, images });
    const savedBlog = await newBlog.save();
    res.status(201).send(savedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw createError(404, "Blog not found");
    }
    res.send(deletedBlog);
  } catch (error) {
    next(error);
  }
};

export default { getAllBlog, getBlogById, editBlog, addNewBlog, deleteBlog };
