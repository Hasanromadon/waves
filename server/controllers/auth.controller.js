// just a function / object
const httpStatus = require('http-status');
const { authService } = require('../services');

const authController = {

  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.getAuthToken(user);
      res.cookie('x-access-token', token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async signin() {
    const hello = await authService.hello();
    console.log(hello);
  },
  async isauth() {
    const hello = await authService.hello();
    console.log(hello);
  },

};

module.exports = authController;
