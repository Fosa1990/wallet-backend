const router = require('express').Router();

// http://localhost:8083/api/categories/getAll
router.get('/', async (req, res, next) => {
  res.json({ message: 'template message: categories - getAll' });
});

module.exports = router;
