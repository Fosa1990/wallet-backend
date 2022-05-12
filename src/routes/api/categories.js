const router = require('express').Router();
const { getAllCategories } = require('../../controllers');

// http://localhost:8081/api/categories/getAll
router.get('/', getAllCategories);

module.exports = router;
