const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/auth/signup
const signup = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: signup',
    },
  });
};

module.exports = signup;
