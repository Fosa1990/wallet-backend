const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/auth/signin
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  const userNotExistCondition =
    !userExist || !userExist.isVerified || !userExist.comparePassword(password);

  if (userNotExistCondition) {
    throw new Unauthorized(MESSAGE.SIGNIN_FAILED);
  }

  userExist.setToken();
  await userExist.save();

  res.json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      token: userExist.token,
      user: {
        name: userExist.name,
        email: userExist.email,
        avatarURL: userExist.avatarURL,
      },
    },
  });
};

module.exports = signin;
