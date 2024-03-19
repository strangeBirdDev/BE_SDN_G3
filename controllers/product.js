import Product from "../models/Product.js"
import Categories from "../models/Category.js"
import mongoose from "mongoose";

const getProductsByPageAndCategory = async (req, res) => {
  try {
    const category = await Categories.findOne({ name: req.query.category });
    console.log(category._id);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 4;
    const skip = (page - 1) * limit;
    // const products = await Product.find({category:category._id}).select('subProducts -_id');
    // // const subProduct = products.map(product => product.subProducts).flat().skip(skip).limit(limit);
    // .skip(skip).limit(limit)

    const products = await Product.aggregate([
      {
        $unwind: '$subProducts'
      },
      {
        $match: {
          category: {
            $eq: category._id,

          }
        }
      },
      {
        $project: { 'subProducts': 1, name: 1 }
      },
      {
        $sort: { 'subProducts.quantity': -1 } // Sắp xếp theo quantity giảm dần
      },
      {
        $limit: 100
      }
    ]).skip(skip).limit(limit);

    // const subProduct = products.map(product => product.subProducts)



    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}

const findSubProductBySubProductId = async (req, res) => {
  try {
    // const {id}=req.body.subProductId;
    const id=req.params.id;
    const subProduct = await Product.aggregate([
      { $unwind: '$subProducts' }, 
      {
        $match:
          { 
            'subProducts._id':new mongoose.Types.ObjectId(id)
          }
      },
      { $project: { _id: 0, subProducts: 1 } } // Chỉ trả về subProduct
    ]);

    if (subProduct.length === 0) {
      throw new Error('Sub-product not found');
    }

    res.status(200).json(subProduct[0].subProducts);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}

const findSubProductByStorage = async (req, res) => {
  try {
    const id=req.query.productId;
    const storage=req.query.storage;
    const subProduct = await Product
    .aggregate([
      { $unwind: '$subProducts' }, 
      {
        $match:
          { '_id':new mongoose.Types.ObjectId(id),
            'subProducts.memory':storage
          }
      },
      { $project: {subProducts: 1 ,_id:0} },
      {
        $sort: { 'subProducts.quantity': -1 } 
      }
    ]);

    // if (subProduct.length === 0) {
    //   throw new Error('product not found');
    // }

    res.status(200).json(subProduct);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}


const findProductByProductId = async (req, res) => {
  try {
 
    const id=req.params.id;
    const product = await Product.findOne({_id:id});

    if (!product) {
      throw new Error('Sub-product not found');
    }
    const p = {
      name: product.name,
      color: product.color,
      memory: product.memory,
      subProducts:product.subProducts  
    };

    res.status(200).json(p);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}


const testcookie = async (req, res) => {
  try {
 
    const id=req.params.id;
    const product = await Product.findOne({_id:id});

    if (!product) {
      throw new Error('Sub-product not found');
    }
    res.cookie('product', product, { maxAge: 900000});

    res.send('Cookie đã được tạo!');
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}


const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category').populate('productDetails');
    res.send(products);
  } catch (error) {
    next(error);
  }
}

// U: Update a product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // Update the product with the provided productId and ensure new option is set to true
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Send the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ error: error.toString() });
  }
}

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      color,
      memory,
      subProducts,
      status,
      year,
      productDetails
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      color,
      memory,
      subProducts,
      status,
      year,
      productDetails
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
}

// Make sure to attach this function to the appropriate route in your Express app

const deleteProductById = async (req, res, next) => {
  try {
      const { id } = req.params;
      const deleteProduct = await Product.findByIdAndDelete(id).exec();
      if (!deleteProduct) {
          throw createError(404, "Product not found");
      }
      res.send(deleteProduct); 
  } catch (error) {
      next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id).exec();
    if(!products) {
      throw createError(404, "Product not found");
    }
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export default {   findSubProductBySubProductId,
  findProductByProductId,
  findSubProductByStorage,
  testcookie, deleteProductById, createProduct, updateProductById, getProductsByPageAndCategory, getAllProduct, getProductById };
