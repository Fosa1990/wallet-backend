const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/createTransaction
const createTransaction = async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    owner: req.user._id,
  });
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
