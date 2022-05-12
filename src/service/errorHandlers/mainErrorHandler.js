const { HTTP_CODE, STATUS, MESSAGE } = require("../../helpers/constants");

const mainErrorHandler = (err, req, res, next) => {
  const { status, stack, message } = err;

  const statusCode = status || HTTP_CODE.INTERNAL_SERVER_ERROR;
  const statusText = status || STATUS.FAIL;
  const statusMessage = message || MESSAGE.INTERNAL_SERVER_ERROR;

  console.log("__MAIN_ERROR_HANDLER__: ", stack);

  res.status(statusCode).json({
    status: statusText,
    code: statusCode,
    payload: {
      message: statusMessage,
    },
  });
};

module.exports = mainErrorHandler;
