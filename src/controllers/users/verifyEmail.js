const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { FRONTEND_URL /*, LOCAL_3000 */ } = process.env;
// const {  /* FRONTEND_URL, */ LOCAL_3000 } = process.env;

// http://localhost:8081/api/users/verify/:verificationToken
// https://amazing-wallet.onrender.com/api/users/verify/:verificationToken

// METHOD: GET
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const userExist = await User.findOne({ verificationToken });

  if (!userExist) throw new NotFound(`Not found user`);

  userExist.verifyUser(true);
  userExist.verifyToken(null);
  await userExist.save();

  return res.redirect(
    `${FRONTEND_URL}/verify?email=${userExist.email}&name=${userExist.name}&isVerified=${userExist.isVerified}`,
  );
  // return res.redirect(
  //   `${LOCAL_3000}/verify?email=${userExist.email}&name=${userExist.name}&isVerified=${userExist.isVerified}`,
  // );
};

module.exports = verifyEmail;
