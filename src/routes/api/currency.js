const router = require('express').Router();
const { currency } = require('../../controllers/');
const { tryCatchWrapper } = require('../../middlewares');

router.get('/', tryCatchWrapper(currency));

module.exports = router;
