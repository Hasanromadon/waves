require('dotenv').config();
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { ApiError } = require('../middleware/apiError');
const { Product } = require('../models/product');

cloudinary.config({
  cloud_name: 'dwfrpd7dh',
  api_key: '449742361475458',
  api_secret: process.env.CN_API_SECRET,
});

const addProduct = async (body) => {
  try {
    const product = new Product({
      ...body,
    });
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
const picUpload = async (req) => {
  try {
    const upload = await cloudinary.uploader.upload(req.files.file.path, {
      public_id: `${Date.now()}`,
      folder: 'waves_upload',
    });
    return {
      public_id: upload.public_id,
      url: upload.url,
    };
  } catch (error) {
    throw new Error(error);
  }
};
const allProducts = async (req) => {
  try {
    const products = await Product
      .find({})
      .populate('brand')
      .sort([[req.query.sortBy, req.query.order]])
      .limit(+req.query.limit);
    return products;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
};
const getProductById = async (_id) => {
  try {
    const product = await Product.findById(_id).populate('brand');
    return product;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
};
const updateProductById = async (_id, body) => {
  try {
    const product = await Product.findByIdAndUpdate({ _id },
      { $set: body }, { new: true });
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

    return product;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteProductById = async (_id) => {
  try {
    const product = await Product.findByIdAndRemove(_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');

    return product;
  } catch (error) {
    throw new Error(error);
  }
};
const paginateProducts = async (req) => {
  try {
    const aggQueryArray = [];

    if (req.body.keywords && req.body.keywords !== '') {
      const re = new RegExp(`${req.body.keywords}`, 'gi');
      aggQueryArray.push({ $match: { model: { $regex: re } } }); // cari berdasarkan model atau type
    }

    if (req.body.brand && req.body.brand.length > 0) {
      const newBrandArray = req.body.brand.map((item) => (
        mongoose.Types.ObjectId(item)
      ));

      aggQueryArray.push({
        $match:
        { brand: { $in: newBrandArray } },
      }); // cari berdasarkan objectIDBrand
    }
    if (req.body.frets && req.body.frets.length > 0) {
      aggQueryArray.push({
        $match: { frets: { $in: req.body.frets } },
      });
    }

    if ((req.body.min && req.body.min > 0) || (req.body.max && req.body.max < 5000)) {
      /// { $range: { price:[0,100 ]}} /// not supported

      if (req.body.min) {
        aggQueryArray.push({ $match: { price: { $gt: req.body.min } } });
        /// minimum price , guitar with a price greater than xxx
      }
      if (req.body.max) {
        aggQueryArray.push({ $match: { price: { $lt: req.body.max } } });
        /// maximum price , guitar with a price lower than xxx
      }
    }

    /// / add populate
    aggQueryArray.push(
      {
        $lookup:
              {
                from: 'brands',
                localField: 'brand',
                foreignField: '_id',
                as: 'brand',
              },
      },
      { $unwind: '$brand' }, // agar returnnya tidak didalam array, tp object aja
    );

    const aggQuery = Product.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 2,
      sort: { date: 'desc' },
    };
    const products = await Product.aggregatePaginate(aggQuery, options);
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  picUpload,
  addProduct,
  allProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  paginateProducts,
};
