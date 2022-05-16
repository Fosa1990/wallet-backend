const { Transaction } = require('../../models');
const { User } = require('../../models');
const {
  balanceUpdateTransaction,
} = require('../../service/balanceCalculation');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/transactionId
// METHOD: PUT
// const updateByIdTransaction = async (req, res) => {
//   const transaction = await Transaction.findOneAndUpdate(
//     {
//       _id: req.params.transactionId,
//       owner: req.user._id,
//     },
//     { ...req.body },
//     {
//       new: true,
//     },
//   ).populate('owner', '_id name email');
//   if (transaction) {
//     res.status(HTTP_CODE.OK).json({
//       status: STATUS.SUCCESS,
//       code: HTTP_CODE.OK,
//       payload: {
//         message: 'Transaction updated successfully',
//         transaction,
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

const updateByIdTransaction = async (req, res) => {
  const { _id } = req.user;
  const { transactionType, sum } = req.body;
  const { transactionId } = req.params;

  const checkTransaction = await Transaction.findOne({
    _id: transactionId,
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
    if (
      checkTransaction.transactionType !== transactionType ||
      checkTransaction.sum !== sum
    ) {
      const newBalance = await balanceUpdateTransaction(
        transactionType,
        sum,
        checkTransaction.sum,
        checkTransaction.transactionType,
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
    }
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: transactionId,
        owner: _id,
      },
      { ...req.body },
      {
        new: true,
      },
    ).populate('owner', '_id name email');
    return res.status(HTTP_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: 'Transaction updated successfully',
        transaction,
      },
    });
  }
};

module.exports = updateByIdTransaction;
