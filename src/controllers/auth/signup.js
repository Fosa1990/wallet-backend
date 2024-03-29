const { randomUUID } = require('crypto');
const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');
// const { sendEmail, emailConfig } = require('../../service/emailService');

// http://localhost:8081/api/auth/signup
// https://amazing-wallet.onrender.com/api/auth/signup
// METHOD: POST
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) throw new Conflict(`User with ${email} already exist`);

  const verificationToken = randomUUID();

  const newUser = new User({
    name,
    email,
    verificationToken,
  });
  // TODO: тимчасово верифікований поки виправляємо авторизацію.
  newUser.verifyUser(true);
  // newUser.verifyUser(false);
  newUser.setToBase(true);
  newUser.verifyToken(verificationToken);
  newUser.setHashPassword(password);
  newUser.setAvatar();
  await newUser.save();

  // TODO: тимчасово відключено поки виправляємо авторизацію.
  // const emailData = await emailConfig(
  //   newUser.name,
  //   newUser.email,
  //   newUser.verificationToken,
  // );
  // await sendEmail(emailData);

  return res.status(HTTP_CODE.CREATED).json({
    status: STATUS.CREATED,
    code: HTTP_CODE.CREATED,
    payload: {
      user: {
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
        avatarURL: newUser.avatarURL,
        isVerified: newUser.isVerified,
        isInBase: newUser.isInBase,
        verificationToken: newUser.verificationToken,
      },
      message: `${MESSAGE.USER_CREATED} ${newUser.email}`,
    },
  });
};

module.exports = signup;
