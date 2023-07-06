const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/users/current
// https://amazing-wallet.onrender.com/api/users/current
// METHOD: GET
const current = async (req, res) => {
  const { id } = req.user;
  const userExist = await User.findById(id);

  if (!userExist || !userExist.isVerified)
    throw new Unauthorized(MESSAGE.NOT_AUTHORIZED);

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      token: userExist.token,
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        balance: userExist.balance,
        avatarURL: userExist.avatarURL,
      },
      message: MESSAGE.USER_CURRENT,
    },
  });
};

module.exports = current;
