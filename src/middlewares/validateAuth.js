const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const { HTTP_CODE, MESSAGE } = require('../helpers/constants');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const validateAuth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization?.split(' ');

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    const checkTokenBearerUser =
      bearer !== MESSAGE.BEARER || !user || !user.token;
    if (checkTokenBearerUser) {
      throw new Unauthorized(MESSAGE.NOT_AUTHORIZED);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.message === MESSAGE.INVALID_SIGNATURE || MESSAGE.JWT_EXPIRED) {
      err.status = HTTP_CODE.UNAUTHORIZED;
    }
  }
};

module.exports = validateAuth;
