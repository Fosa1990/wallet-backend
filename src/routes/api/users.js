const router = require('express').Router();
const { current, reVerify, verifyEmail, avatar } = require('../../controllers');

// http://localhost:8081/api/users/current
router.get('/current', current);

// http://localhost:8081/api/users/avatar
router.patch('/avatars', avatar);

// http://localhost:8081/api/users/verify
router.post('/verify', reVerify);

// http://localhost:8081/api/users/verify/:verifyToken
router.get('/verify/:verifyToken', verifyEmail);

module.exports = router;
