const { Transaction } = require('../models/transaction');
const { User } = require('../models/user');

const addTransaction = async (req) => {
  try {
    const transaction = new Transaction({
      userID: req.user._id,
      userEmail: req.user.email,
      orderID: req.body.order.id,
      orderData: req.body.order.purchase_units,
    });
    await transaction.save();

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          history: [
            {
              transactionId: transaction._id,
              date: transaction.date,
              orderID: req.body.order.id,
              amount: transaction.orderData[0].amount.value,
              items: transaction.orderData[0].items,
            },
          ],
        },
      },
      { new: true },
    );

    /// error
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addTransaction,
};
