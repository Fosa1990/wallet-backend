const { Transaction } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/transactions/categories?year=2022&month=10/getAllCategories
const getAllCategories = async (req, res) => {
  const { year, month } = req.query;
  // const year = '2022';
  // const month = '07';

  const categories = await Transaction.aggregate([
    {
      $facet: {
        transactionType: [
          {
            $match: {
              owner: req.user._id,
              date: {
                $gte: new Date(`${year}-${month}-01`),
                $lte: new Date(`${year}-${month}-31`),
              },
            },
          },
          {
            $group: {
              _id: '$transactionType',
              totalSum: {
                $sum: '$balance',
              },
            },
          },
        ],
        category: [
          {
            $match: {
              owner: req.user._id,
              date: {
                $gte: new Date(`${year}-${month}-01`),
                $lte: new Date(`${year}-${month}-31`),
              },
            },
          },
          {
            $group: {
              _id: '$category',
              totalSum: {
                $sum: '$balance',
              },
            },
          },
        ],
      },
    },
  ]);
  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'Categories loaded successfully',
      categories,
    },
  });
};

module.exports = getAllCategories;
