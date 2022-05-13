const { Transaction } = require("../../models");
const { STATUS, HTTP_CODE } = require("../../helpers/constants");

// http://localhost:8081/api/transactions/categories/getAllCategories
const getAllCategories = async (req, res, next) => {
  // const { body } = req.body;
  const categories = await Transaction.aggregate([
    {
      $facet: {
        transactionType: [
          {
            $match: {
              date: {
                $gte: new Date("Sun, 01 Jan 2022 00:00:00 GMT"),
                $lte: new Date("Sun, 01 Dec 2022 00:00:00 GMT"),
              },
            },
          },
          {
            $group: {
              _id: "$transactionType",
              totalSum: {
                $sum: "$balance",
              },
            },
          },
        ],
        category: [
          {
            $match: {
              date: {
                $gte: new Date("Sun, 01 Jan 2022 00:00:00 GMT"),
                $lte: new Date("Sun, 01 Dec 2022 00:00:00 GMT"),
              },
            },
          },
          {
            $group: {
              _id: "$category",
              totalSum: {
                $sum: "$balance",
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
      message: "Categories loaded successfully",
      categories,
    },
  });
};

module.exports = getAllCategories;
