const rateLimit = require('express-rate-limit');
const { HTTP_CODE, STATUS, MESSAGE } = require('../../src/helpers/constants');

const limiter = ({ windowMs, max }) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
      return res.status(HTTP_CODE.TOO_MANY_REQUESTS).json({
        status: STATUS.ERROR,
        code: HTTP_CODE.TOO_MANY_REQUESTS,
        message: MESSAGE.TOO_MANY_REQUESTS,
      });
    },
  });
};

module.exports = limiter;
