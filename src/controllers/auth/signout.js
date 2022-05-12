const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/auth/signout
const signout = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: signout',
    },
  });
};

module.exports = signout;
