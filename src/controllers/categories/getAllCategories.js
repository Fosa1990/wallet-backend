const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/categories?year=2022&month=10
// https://amazing-wallet.herokuapp.com/api/categories?year=2022&month=10
// METHOD: GET
const getAllCategories = async (req, res) => {
  const { year, month } = req.query;

  const match = {
    $match: {
      owner: req.user._id,
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-31`),
      },
    },
  };

  const categories = await Transaction.aggregate([
    {
      $facet: {
        transactionType: [
          match,
          {
            $group: {
              _id: '$transactionType',
              totalSum: {
                $sum: '$sum',
              },
            },
          },
        ],
        category: [
          match,
          {
            $group: {
              _id: '$category',
              totalSum: {
                $sum: '$sum',
              },
            },
          },
        ],
      },
    },
  ]);

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: MESSAGE.LOADED_SUCCESSFUL,
      categories,
    },
  });
};

module.exports = getAllCategories;
