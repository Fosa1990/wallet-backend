const { Transaction } = require('../../models');
const { User } = require('../../models');
const {
  balanceCreateTransaction,
  balanceCreateUpdateTransaction,
} = require('../../service/balanceCalculation');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions
// https://amazing-wallet.onrender.com/api/transactions
// METHOD: POST
const createTransaction = async (req, res) => {
  const { balance, _id } = req.user;
  const { date, transactionType, category, sum, comment } = req.body;

  const checkTransaction = await Transaction.findOne({
    date: { $lt: date },
    owner: _id,
  }).sort({ date: -1 });

  let balanceTransaction = null;

  if (checkTransaction) {
    balanceTransaction = checkTransaction.balance;
  } else if (!checkTransaction && balance !== 0) {
    balanceTransaction = 0;
  } else {
    balanceTransaction = balance;
  }

  const newBalanceCreate = await balanceCreateTransaction(
    transactionType,
    balanceTransaction,
    sum,
  );

  const transaction = new Transaction({
    date,
    transactionType,
    category,
    sum,
    comment,
    balance: newBalanceCreate,
    owner: _id,
  });
  await transaction.save();

  const newBalanceUpdate = await balanceCreateUpdateTransaction(
    transactionType,
    sum,
  );

  await User.updateOne(
    { _id },
    {
      $inc: { balance: newBalanceUpdate },
    },
  );

  await Transaction.updateMany(
    {
      $and: [{ owner: _id }, { date: { $gt: date } }],
    },
    { $inc: { balance: newBalanceUpdate } },
  );

  return res.status(HTTP_CODE.CREATED).json({
    status: STATUS.CREATED,
    code: HTTP_CODE.CREATED,
    payload: {
      message: MESSAGE.CREATED_SUCCESSFUL,
      transaction,
    },
  });
};

module.exports = createTransaction;
