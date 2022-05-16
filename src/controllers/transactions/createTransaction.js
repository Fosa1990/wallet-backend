const { Transaction } = require('../../models');
const { User } = require('../../models');
const {
  balanceCreateTransaction,
} = require('../../service/balanceCalculation');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions
// METHOD: POST
const createTransaction = async (req, res) => {
  const { balance, _id } = req.user;
  const { transactionType, sum } = req.body;

  const newBalance = await balanceCreateTransaction(
    transactionType,
    balance,
    sum,
  );

  const transaction = new Transaction({
    ...req.body,
    balance: newBalance,
    owner: _id,
  });
  await transaction.save();

  const user = await User.findById(_id);
  user.setBalance(newBalance);
  await user.save();

  res.status(HTTP_CODE.CREATED).json({
    status: STATUS.CREATED,
    code: HTTP_CODE.CREATED,
    payload: {
      message: 'Transaction created successfully',
      transaction,
    },
  });
};

module.exports = createTransaction;
