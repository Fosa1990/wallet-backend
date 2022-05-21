const { Transaction } = require('../../models');
const { User } = require('../../models');
const {
  balanceUpdateTransaction,
} = require('../../service/balanceCalculation');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/transactionId
// https://amazing-wallet.herokuapp.com/api/transactions/transactionId
// METHOD: PUT
const updateByIdTransaction = async (req, res) => {
  const { _id } = req.user;
  const { date, transactionType, category, sum, comment } = req.body;
  const { transactionId } = req.params;

  const normalizedSum = Number(sum).toFixed(2);
  const numberSum = Number(normalizedSum);

  const checkTransaction = await Transaction.findOne({
    _id: transactionId,
    owner: _id,
  });

  const numberCheckTransactionSum = Number(checkTransaction.sum);

  if (!checkTransaction) {
    return res.status(HTTP_CODE.NOT_FOUND).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.NOT_FOUND,
      payload: {
        message: MESSAGE.NOT_FOUND,
      },
    });
  } else {
    if (
      checkTransaction.transactionType !== transactionType ||
      numberCheckTransactionSum !== numberSum
    ) {
      const newBalance = await balanceUpdateTransaction(
        transactionType,
        numberSum,
        numberCheckTransactionSum,
        checkTransaction.transactionType,
      );

      await Transaction.updateMany(
        {
          $and: [{ owner: _id }, { date: { $gte: checkTransaction.date } }],
        },
        { $inc: { balance: newBalance } },
      );

      await User.updateOne(
        { _id },
        {
          $inc: { balance: newBalance },
        },
      );
    }
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: transactionId,
        owner: _id,
      },
      { date, transactionType, category, sum, comment },
      {
        new: true,
      },
    ).populate('owner', '_id name email balance');
    return res.status(HTTP_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: MESSAGE.UPDATED_SUCCESSFUL,
        transaction,
      },
    });
  }
};

module.exports = updateByIdTransaction;
