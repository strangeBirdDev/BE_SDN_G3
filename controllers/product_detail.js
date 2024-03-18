import ProductDetails  from "../models/ProductDetails.js";
import express, { response } from "express";
import createError from "http-errors";

const getAllProductDetails = async (req, res, next) => {
    try {
        const list = await ProductDetails.find({}).exec();
        res.send(list);
    } catch (error) {
        next(error);
    }
};

const getProductDetailById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product_detail = await ProductDetails.findById(id).exec();
        if(!product_detail)
        {
            throw createError(404, "Product Detail not found");
        }
        res.send(product_detail);
    } catch (error) {
        next(error);
    };
}

const createNewProductDetail = async (req, res, next) => {
    try {
        const { screenTechnology, screenResolution, screenSize, surfaceMaterial, otherUtilities, capacity, connection, backCamera, frontCamera, ram, batteryAndPower } = req.body;
        
        // Remove _id from the object
        const newProductDetail = new ProductDetails({
            screenTechnology,
            screenResolution,
            screenSize,
            surfaceMaterial,
            otherUtilities,
            capacity,
            connection,
            backCamera,
            frontCamera,
            ram,
            batteryAndPower
        });

        const saveProductDetail = await newProductDetail.save();
        res.status(201).send(saveProductDetail);
    } catch (error) {
        next(error);
    }
}


const deleteProductDetailById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteProductDetail = await ProductDetails.findByIdAndDelete(id).exec();
        if (!deleteProductDetail) {
            throw createError(404, "Product Detail not found");
        }
        res.send(deleteProductDetail); 
    } catch (error) {
        next(error);
    }
}

const editProductDetailById = async (req, res, next) => {
    try {
        const { id} = req.params;
        const {screenTechnology, screenResolution, screenSize,surfaceMaterial, otherUtilities, capacity, connection, backCamera, frontCamera, ram, batteryAndPower} = req.body;
        const updateData = await ProductDetails.findByIdAndUpdate(id,
            {screenTechnology, screenResolution, screenSize,surfaceMaterial, otherUtilities, capacity, connection, backCamera, frontCamera, ram, batteryAndPower},
            {new: true} ).exec();
            if(!updateData){
                throw createError(404, "Product Detail not found");
            }
            res.send(updateData);
    } catch (error) {
        next(error);
    }
}; 

export default { deleteProductDetailById, createNewProductDetail, getAllProductDetails, getProductDetailById, editProductDetailById };