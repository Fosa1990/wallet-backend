const { Transaction } = require('../../models');
const { User } = require('../../models');
const {
  balanceDeleteTransaction,
} = require('../../service/balanceCalculation');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/transactionId
// METHOD: DELETE
// const deleteTransaction = async (req, res) => {
//   const transaction = await Transaction.findOneAndRemove({
//     _id: req.params.transactionId,
//     owner: req.user._id,
//   });
//   if (transaction) {
//     res.status(HTTP_CODE.OK).json({
//       status: STATUS.SUCCESS,
//       code: HTTP_CODE.OK,
//       payload: {
//         message: 'Transaction deleted successfully',
//       },
//     });
//   } else {
//     return res.status(HTTP_CODE.NOT_FOUND).json({
//       status: STATUS.ERROR,
//       code: HTTP_CODE.NOT_FOUND,
//       payload: {
//         message: MESSAGE.NOT_FOUND,
//       },
//     });
//   }
// };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteTransaction = async (req, res) => {
  const { _id } = req.user;

  const checkTransaction = await Transaction.findOneAndRemove({
    _id: req.params.transactionId,
    owner: _id,
  });
  if (!checkTransaction) {
    return res.status(HTTP_CODE.NOT_FOUND).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.NOT_FOUND,
      payload: {
        message: MESSAGE.NOT_FOUND,
      },
    });
  } else {
    const newBalance = await balanceDeleteTransaction(
      checkTransaction.transactionType,
      checkTransaction.sum,
    );

    await Transaction.updateMany(
      {
        $and: [
          { owner: _id },
          { createdAt: { $gte: checkTransaction.createdAt } },
        ],
      },
      { $inc: { balance: newBalance } },
    );

    await User.updateOne(
      { _id },
      {
        $inc: { balance: newBalance },
      },
    );

    return res.status(HTTP_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: 'Transaction deleted successfully',
      },
    });
  }
};

module.exports = deleteTransaction;
