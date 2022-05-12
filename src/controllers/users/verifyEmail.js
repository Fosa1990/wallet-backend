const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { STATUS, HTTP_CODE } = require('../../helpers/constants');

// http://localhost:8081/api/users/verify/:verifyToken
const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;

  const userExist = await User.findOne({ verifyToken });

  if (!userExist) throw new NotFound(`Not found user`);

  userExist.verifyUser(true);
  userExist.verifyToken(null);
  await userExist.save();

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      message: `User: ${userExist.name} successfully verified`,
    },
  });
};

module.exports = verifyEmail;
