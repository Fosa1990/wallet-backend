const router = require('express').Router();
const { current, reVerify, verifyEmail, avatar } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  tryCatchWrapper,
} = require('../../middlewares');
const { validationEmail } = require('../../service/validation');

// http://localhost:8081/api/users/current
router.get('/current', validateAuth, tryCatchWrapper(current));

// http://localhost:8081/api/users/avatar
router.patch('/avatars', tryCatchWrapper(avatar));

// http://localhost:8081/api/users/verify
router.post(
  '/verify',
  validateBody(validationEmail),
  tryCatchWrapper(reVerify),
);

// http://localhost:8081/api/users/verify/:verificationToken
router.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));

module.exports = router;
