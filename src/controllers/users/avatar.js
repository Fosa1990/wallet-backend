const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/avatar
// https://amazing-wallet.onrender.com/api/users/avatar
// METHOD: PATCH
const avatar = async (req, res, next) => {
  return res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: users/avatars',
    },
  });
};

module.exports = avatar;
