const router = require('express').Router();

// http://localhost:8083/api/users/current
router.get('/current', async (req, res, next) => {
  res.json({ message: 'template message: users/current' });
});

// http://localhost:8083/api/users/avatars
router.patch('/avatars', async (req, res, next) => {
  res.json({ message: 'template message: users/avatars' });
});

// http://localhost:8083/api/users/verify
router.post('/verify', async (req, res, next) => {
  res.json({ message: 'template message: users/verify' });
});

// http://localhost:8083/api/users/verify/:verifyToken
router.get('/verify/:verifyToken', async (req, res, next) => {
  res.json({ message: 'template message: verify/:verifyToken' });
});

module.exports = router;
