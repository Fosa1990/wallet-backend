const { Transaction } = require("../../models");
const { STATUS, HTTP_CODE } = require("../../helpers/constants");

// http://localhost:8081/api/transactions/getAllTransactions
const getAllTransactions = async (req, res, next) => {
  const transactions = await Transaction.find({});
  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: "Transactions loaded successfully",
      transactions,
    },
  });
};

module.exports = getAllTransactions;
