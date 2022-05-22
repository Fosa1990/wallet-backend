const { HTTP_CODE, STATUS, MESSAGE } = require('../../helpers/constants');

const routesErrorhandler = (req, res) => {
  return res.status(HTTP_CODE.NOT_FOUND).json({
    status: STATUS.ERROR,
    code: HTTP_CODE.NOT_FOUND,
    payload: {
      message: MESSAGE.NOT_FOUND,
      tooltip: MESSAGE.TOOLTIP_ROUTES,
    },
  });
};

module.exports = routesErrorhandler;
