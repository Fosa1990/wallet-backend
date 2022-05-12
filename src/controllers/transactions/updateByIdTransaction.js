const { Transaction } = require("../../models");
const { STATUS, HTTP_CODE, MESSAGE } = require("../../helpers/constants");

// http://localhost:8081/api/transactions/updateByIdTransaction
const updateByIdTransaction = async (req, res, next) => {
  const { transactionId: _id } = req.params;
  const { body } = req;
  const transaction = await Transaction.findByIdAndUpdate(_id, body, {
    new: true,
  });
  if (transaction) {
    res.json({
      status: STATUS.SUCCESS,
      code: HTTP_CODE.OK,
      payload: {
        message: "Transaction updated successfully",
        transaction,
      },
    });
  } else {
    return res.status(404).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.NOT_FOUND,
      payload: {
        message: MESSAGE.NOT_FOUND,
      },
    });
  }
};

module.exports = updateByIdTransaction;
