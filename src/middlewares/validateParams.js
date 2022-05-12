const { HTTP_CODE, STATUS } = require('../helpers/constants');

const validateParams = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log('__VALIDATE_PARAMS_ERROR__: ', error.details);
    return res.status(HTTP_CODE.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_CODE.BAD_REQUEST,
      payload: {
        message: error.message,
      },
    });
  }
};

module.exports = validateParams;
