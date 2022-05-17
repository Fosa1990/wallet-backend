const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');
// const { FRONTEND_URL } = process.env;

// http://localhost:8081/api/users/verify/:verificationToken
// METHOD: GET
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const userExist = await User.findOne({ verificationToken });

  if (!userExist) throw new NotFound(`Not found user`);

  userExist.verifyUser(true);
  userExist.verifyToken(null);
  await userExist.save();

  // TODO: add redirect to login frontend page
  // return res.redirect(
  //   `${FRONTEND_URL}/api/auth/login?email=${userExist.email}&isVerified=${userExist.isVerified}`,
  // );

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: `User: ${userExist.name} successfully verified`,
    },
  });
};

module.exports = verifyEmail;
