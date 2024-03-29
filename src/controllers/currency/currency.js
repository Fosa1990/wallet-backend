const axios = require('axios');
const { PRIVATE_API_URL } = require('../../helpers/constants');
const { STATUS, HTTP_CODE, MESSAGE } = require('../../helpers/constants');

// http://localhost:8081/api/currency/
// https://amazing-wallet.onrender.com/api/currency/
// METHOD: GET
const currency = async (req, res) => {
  const { data } = await axios
    .get(PRIVATE_API_URL.ONLINE)
    .then(res => res)
    .catch(err => err.res);

  return res.status(HTTP_CODE.OK).json({
    status: STATUS.SUCCESS,
    code: HTTP_CODE.OK,
    payload: {
      data,
      message: MESSAGE.CURRENCY_SUCCESSFUL,
    },
  });
};

module.exports = currency;
