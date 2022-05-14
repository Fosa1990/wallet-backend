const router = require('express').Router();
const { getAllCategories } = require('../../controllers');

const { validateAuth, tryCatchWrapper } = require('../../middlewares');

// http://localhost:8081/api/categories?year=2022&month=10
router.get('/', validateAuth, tryCatchWrapper(getAllCategories));

module.exports = router;
