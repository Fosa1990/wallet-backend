const { Transaction } = require("../../models");
const { STATUS, HTTP_CODE, MESSAGE } = require("../../helpers/constants");

// http://localhost:8081/api/transactions/getByIdTransaction
const getByIdTransaction = async (req, res, next) => {
  const { transactionId: _id } = req.params;
  const transaction = await Transaction.findById(_id);
  if (transaction) {
    res.status(HTTP_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: "Transaction loaded successfully",
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
