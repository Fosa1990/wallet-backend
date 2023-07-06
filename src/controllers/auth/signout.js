const { User } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/auth/signout
// https://amazing-wallet.onrender.com/api/auth/signout
// METHOD: GET
const signout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  return res.status(HTTP_CODE.NO_CONTENT).json({
    status: STATUS.OK,
    code: HTTP_CODE.NO_CONTENT,
  });
};

module.exports = signout;
