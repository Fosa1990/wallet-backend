const router = require('express').Router();
const { signup, signin, signout } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  tryCatchWrapper,
} = require('../../middlewares');
const {
  validationSignupUser,
  validationSigninUser,
} = require('../../service/validation');

// http://localhost:8081/api/auth/signup
router.post(
  '/signup',
  validateBody(validationSignupUser),
  tryCatchWrapper(signup),
);

// http://localhost:8081/api/auth/signin
router.post(
  '/signin',
  validateBody(validationSigninUser),
  tryCatchWrapper(signin),
);

// http://localhost:8081/api/auth/signout
router.get('/signout', validateAuth, tryCatchWrapper(signout));

module.exports = router;
