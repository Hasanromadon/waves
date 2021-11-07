const httpStatus = require('http-status');
const { User } = require('../models/user');
const { ApiError } = require('../middleware/apiError');

const createUser = async (email, password) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
    }
    const user = new User({
      email, password,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const getAuthToken = (user) => {
  const token = user.generateAuthToken(user);
  return token;
};
module.exports = {
  createUser,
  getAuthToken,
};
