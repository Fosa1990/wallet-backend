const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/current
const current = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: users/current',
    },
  });
};

module.exports = current;
