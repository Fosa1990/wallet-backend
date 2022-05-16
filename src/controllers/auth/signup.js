const { randomUUID } = require('crypto');
const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');
const { sendEmail, emailConfig } = require('../../service/emailService');

// http://localhost:8081/api/auth/signup
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
  newUser.verifyUser(false);
  newUser.verifyToken(verificationToken);
  newUser.setHashPassword(password);
  newUser.setAvatar();
  await newUser.save();

  const emailData = await emailConfig(
    newUser.name,
    newUser.email,
    newUser.verificationToken,
  );
  await sendEmail(emailData);

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
        verificationToken: newUser.verificationToken,
      },
    },
  });
};

module.exports = signup;
