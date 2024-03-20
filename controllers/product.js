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
    const id = req.params.id;
    const subProduct = await Product.aggregate([
      { $unwind: '$subProducts' },
      {
        $match:
        {
          'subProducts._id': new mongoose.Types.ObjectId(id)
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
    const id = req.query.productId;
    const storage = req.query.storage;
    const subProduct = await Product
      .aggregate([
        { $unwind: '$subProducts' },
        {
          $match:
          {
            '_id': new mongoose.Types.ObjectId(id),
            'subProducts.storage': storage
          }
        },
        { $project: { subProducts: 1, _id: 0 } },
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

const findSubProductByStorageAndColor = async (req, res) => {
  try {
    const id = req.query.productId;
    const storage = req.query.storage;
    const color = req.query.color;
    const subProduct = await Product
      .aggregate([
        { $unwind: '$subProducts' },
        {
          $match:
          {
            '_id': new mongoose.Types.ObjectId(id),
            'subProducts.storage': storage,
            'subProducts.color': color

          }
        },
        { $project: { subProducts: 1, _id: 0 } },
        {
          $sort: { 'subProducts.quantity': -1 }
        }
      ]);



    res.status(200).json(subProduct[0]);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}



const findProductByProductId = async (req, res) => {
  try {

    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new Error('Sub-product not found');
    }
    const p = {
      name: product.name,
      color: product.color,
      storage: product.storage,
      subProducts: product.subProducts
    };

    res.status(200).json(p);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString()
    });
  }
}

function parseCookieData(cookieData) {
  const cartItems = cookieData.split(';');
  return cartItems.map(item => {
    const [productId, subProductId, quantity] = item.split(':');
    return { productId, subProductId, quantity };
  });
}

const setCartProductsFromCookie = async (req, res) => {
  try {
    const productId = req.query.productId;
    const subProductId = req.query.subProductId;
    const quantity = req.query.quantity; // Lấy quantity từ query parameters

    // Lấy giá trị của cookie "cart" từ request headers
    const cartCookie = req.cookies.cart || '';


    console.log(cartCookie)

    // Tạo một mảng cartItems chứa thông tin sản phẩm từ cookie
    const cartItems = parseCookieData(cartCookie);
    const validCartItems = cartItems.filter(item => item.productId && item.productId.length > 0);

    // Tạo chuỗi mới để cập nhật cookie
    let newCookieData = '';

    // Thêm sản phẩm mới vào cartItems
    if (productId && subProductId && quantity) {
      validCartItems.push({ productId, subProductId, quantity });
    }

    console.log(validCartItems)

    // Tạo chuỗi mới từ cartItems
    validCartItems.forEach((item, index) => {
      if (index !== 0) {
        newCookieData += ';';
      }
      newCookieData += `${item.productId}:${item.subProductId}:${item.quantity}`;
    });

    console.log(newCookieData)
    // Ghi đè cookie mới với chuỗi mới
    res.cookie('cart', newCookieData, { maxAge: 2 * 60 * 60 * 60 });

    // Trả về các sản phẩm trong giỏ hàng

    // Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json("success");
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProductsFromCookie = async (req, res) => {
  try {

    const subProductId = req.query.subProductId;


    // Lấy giá trị của cookie "cart" từ request headers
    const cartCookie = req.cookies.cart || '';


    console.log(cartCookie)

    // Tạo một mảng cartItems chứa thông tin sản phẩm từ cookie
    const cartItems = parseCookieData(cartCookie);
    const validCartItems = cartItems.filter(item => item.subProductId && item.subProductId.length > 0);

    // Tạo chuỗi mới để cập nhật cookie
    let newCookieData = '';

    
    // Tạo chuỗi mới từ cartItems
    validCartItems.forEach((item, index) => {
      if (item.subProductId !== subProductId) {
        if (index !== 0) {
          newCookieData += ';';
        }
        newCookieData += `${item.productId}:${item.subProductId}:${item.quantity}`;
      }
    });

    console.log(newCookieData)
    // Ghi đè cookie mới với chuỗi mới
    res.cookie('cart', newCookieData, { maxAge: 2 * 60 * 60 * 60 });

    // Trả về các sản phẩm trong giỏ hàng

    // Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json("success");
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getCartProductsFromCookie = async (req, res) => {
  try {

    const cartCookie = req.cookies.cart || '';
    // Tạo một mảng cartItems chứa thông tin sản phẩm từ cookie
    const cartItems = parseCookieData(cartCookie);

    // Trả về các sản phẩm trong giỏ hàng
    const promises = cartItems.map(async (item) => {
      const product = await Product.findById(new mongoose.Types.ObjectId(item.productId));
      const subProduct = product.subProducts.find(sub => sub._id.toString() === item.subProductId);
      return { ...subProduct.toObject(), quantity: item.quantity };
    });

    const cartProducts = await Promise.all(promises);

    // Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json(cartProducts);
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};











export default {
  getProductsByPageAndCategory,
  findSubProductBySubProductId,
  findProductByProductId,
  findSubProductByStorage,
  findSubProductByStorageAndColor,
  getCartProductsFromCookie,
  setCartProductsFromCookie,
  deleteProductsFromCookie,
};
