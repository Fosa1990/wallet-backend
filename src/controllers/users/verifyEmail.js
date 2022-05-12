const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/verify/:verifyToken
const verifyEmail = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: verify/:verifyToken',
    },
  });
};

module.exports = verifyEmail;
