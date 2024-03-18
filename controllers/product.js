import Product from "../models/Product.js";
import Categories from "../models/Category.js";

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
        $unwind: "$subProducts",
      },
      {
        $match: {
          category: {
            $eq: category._id,
          },
        },
      },
      {
        $project: { subProducts: 1, _id: 0 },
      },
      {
        $sort: { "subProducts.quantity": -1 }, // Sắp xếp theo quantity giảm dần
      },
      {
        $limit: 100,
      },
    ])
      .skip(skip)
      .limit(limit);

    const subProduct = products.map((product) => product.subProducts);

    res.status(200).json(subProduct);
  } catch (error) {
    res.status(500).json({
      message_err: error.toString(),
    });
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category').populate('productDetails');
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export default { getProductsByPageAndCategory, getAllProduct };
