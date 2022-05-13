const router = require('express').Router();
const { getAllCategories } = require('../../controllers');

const { validateAuth, tryCatchWrapper } = require('../../middlewares');

// http://localhost:8081/api/transactions/categories/getAllCategories
router.get('/', validateAuth, tryCatchWrapper(getAllCategories));

module.exports = router;
