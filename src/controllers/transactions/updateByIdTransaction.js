const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/updateByIdTransaction
const updateByIdTransaction = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: transactions - updateByIdTransaction',
    },
  });
};

module.exports = updateByIdTransaction;
