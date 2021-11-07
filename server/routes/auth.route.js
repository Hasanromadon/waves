const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
// api/auth/..
router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.get('/isauth', authController.isauth);

module.exports = router;
