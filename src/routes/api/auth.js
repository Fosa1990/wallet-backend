const router = require('express').Router();

// http://localhost:8083/api/auth/signup
router.post('/signup', async (req, res, next) => {
  res.json({ message: 'template message: signup' });
});

// http://localhost:8083/api/auth/signin
router.post('/signin', async (req, res, next) => {
  res.json({ message: 'template message: signin' });
});

// http://localhost:8083/api/auth/signout
router.get('/signout', async (req, res, next) => {
  res.json({ message: 'template message: signout' });
});

module.exports = router;
