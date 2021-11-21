const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { ApiError } = require('../middleware/apiError');
require('dotenv').config();

const validateToken = async (token) => jwt.verify(token, process.env.DB_SECRET);

const findUserByEmail = async (email) => await User.findOne({ email });

const findUserById = async (_id) => await User.findById(_id);

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          ...req.body.data, /// make sure to validate what you want to patch !!!!!!
        },
      },
      { new: true },
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserEmail = async (req) => {
  try {
    if (await User.emailTaken(req.body.newemail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, email: req.user.email },
      {
        $set: {
          email: req.body.newemail,
          verified: false,
        },
      },
      { new: true },
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  validateToken,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
};
