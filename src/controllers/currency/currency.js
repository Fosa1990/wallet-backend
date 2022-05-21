const axios = require('axios');
const { PRIVAT_API_URL } = require('../../helpers/constants');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/currency/
// https://amazing-wallet.herokuapp.com/api/currency/
// METHOD: GET
const currency = async (req, res) => {
  const { data } = await axios
    .get(PRIVAT_API_URL.ONLINE)
    .then(res => res)
    .catch(err => err.res);

  res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      data,
      message: MESSAGE.CURRENCY_SUCCESSFUL,
    },
  });
};

module.exports = currency;
