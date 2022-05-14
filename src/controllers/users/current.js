const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/current
// METHOD: GET
const current = async (req, res, next) => {
  const { id } = req.user;
  const userExist = await User.findById(id);

  if (!userExist || !userExist.isVerified) next(Unauthorized());

  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      user: {
        name: userExist.name,
        email: userExist.email,
        avatarURL: userExist.avatarURL,
      },
    },
  });
};

module.exports = current;
