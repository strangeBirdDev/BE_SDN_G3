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









export default {
  getProductsByPageAndCategory,
  findSubProductBySubProductId,
  findProductByProductId,
  findSubProductByStorage,
  testcookie
};
