const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/categories/getAllCategories
const getAllCategories = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: categories - getAllCategories',
    },
  });
};

module.exports = getAllCategories;
