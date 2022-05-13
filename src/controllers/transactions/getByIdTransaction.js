const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/getByIdTransaction
const getByIdTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.transactionId,
    owner: req.user._id,
  }).populate('owner', '_id name email');
  if (transaction) {
    res.status(HTTP_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: 'Transaction loaded successfully',
        transaction,
      },
    });
  } else {
    res.status(HTTP_CODE.NOT_FOUND).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.NOT_FOUND,
      payload: {
        message: MESSAGE.NOT_FOUND,
      },
    });
  }
};

module.exports = getByIdTransaction;
