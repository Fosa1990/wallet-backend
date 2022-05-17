const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions
// METHOD: GET
const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({ owner: req.user._id }).populate(
    'owner',
    '_id name email balance',
  );
  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: MESSAGE.LOADED_SUCCESSFUL,
      transactions,
    },
  });
};

module.exports = getAllTransactions;
