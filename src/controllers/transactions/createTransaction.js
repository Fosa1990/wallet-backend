const { Transaction } = require("../../models");
const { STATUS, HTTP_CODE } = require("../../helpers/constants");

// http://localhost:8081/api/transactions/createTransaction
const createTransaction = async (req, res, next) => {
  const { body } = req;
  const transaction = await Transaction.create(body);
  res.status(201).json({
    status: STATUS.CREATED,
    code: HTTP_CODE.CREATED,
    payload: {
      message: "Transaction created successfully",
      transaction,
    },
  });
};

module.exports = createTransaction;
