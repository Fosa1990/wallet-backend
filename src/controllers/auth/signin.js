const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/auth/signin
const signin = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: signin',
    },
  });
};

module.exports = signin;
