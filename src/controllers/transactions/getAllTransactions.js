const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/getAllTransactions
const getAllTransactions = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: transactions - getAllTransactions',
    },
  });
};

module.exports = getAllTransactions;
