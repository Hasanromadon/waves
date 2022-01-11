const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth('createAny', 'transaction'), transactionController.addTransaction);

module.exports = router;
