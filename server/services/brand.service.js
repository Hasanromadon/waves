const httpStatus = require('http-status');
const { Brand } = require('../models/brand');
const { ApiError } = require('../middleware/apiError');

const addBrand = async (brandname) => {
  try {
    const brand = new Brand({
      name: brandname,
    });
    await brand.save();
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

const getBrandById = async (id) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBrandById = async (id) => {
  try {
    const brand = await Brand.findByIdAndRemove(id);
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

const getBrands = async (args) => {
  try {
    const order = args.order ? args.order : 'desc';
    const limit = args.limit ? args.limit : 5;

    const brands = await Brand
      .find({})
      .sort([
        ['_id', order],
      ])
      .limit(limit);

    if (!brands) throw new ApiError(httpStatus.NOT_FOUND, 'Brands not found');
    return brands;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addBrand,
  getBrandById,
  deleteBrandById,
  getBrands,
};
