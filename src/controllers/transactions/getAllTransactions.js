const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions
// https://amazing-wallet.herokuapp.com/api/transactions
// METHOD: GET
const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({ owner: req.user._id }).populate(
    'owner',
    '_id name email',
  );
  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'Transactions loaded successfully',
      transactions,
    },
  });
};

module.exports = getAllTransactions;
