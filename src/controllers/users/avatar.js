const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/avatar
const avatar = async (req, res, next) => {
  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: 'template message: users/avatars',
    },
  });
};

module.exports = avatar;
