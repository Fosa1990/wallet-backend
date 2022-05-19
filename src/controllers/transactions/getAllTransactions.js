const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions
// https://amazing-wallet.herokuapp.com/api/transactions
// METHOD: GET
const getAllTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { _id } = req.user;

  const skip = (page - 1) * limit;
  const numberLimit = Number(limit);

  const transactions = await Transaction.find(
    { owner: _id },
    {},
    {
      skip,
      limit: numberLimit,
    },
  ).populate('owner', '_id name email balance');
  const shownDocuments = transactions.length;
  const totalDocuments = await Transaction.countDocuments({
    owner: _id,
  });
  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: MESSAGE.LOADED_SUCCESSFUL,
      transactions,
      countDocuments: {
        page: Number(page),
        limitDocuments: numberLimit,
        totalDocuments,
        shownDocuments,
      },
    },
  });
};

module.exports = getAllTransactions;
