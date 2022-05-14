const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, emailConfig } = require('../../service/emailService');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/users/verify
// METHOD: POST
const reVerify = async (req, res, next) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist && userExist.isVerified)
    throw new BadRequest(MESSAGE.REVERIFY_FAIL);

  if (!userExist) throw new NotFound(MESSAGE.NOT_FOUND);

  const emailData = await emailConfig(
    userExist.name,
    userExist.email,
    userExist.verificationToken,
  );
  await sendEmail(emailData);

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: `Verification email sent to ${userExist.email}`,
    },
  });
};

module.exports = reVerify;
