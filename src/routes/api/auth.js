const router = require('express').Router();
const { signup, signin, signout } = require('../../controllers');

// http://localhost:8081/api/auth/signup
router.post('/signup', signup);

// http://localhost:8081/api/auth/signin
router.post('/signin', signin);

// http://localhost:8081/api/auth/signout
router.get('/signout', signout);

module.exports = router;
