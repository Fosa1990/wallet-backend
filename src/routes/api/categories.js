const router = require("express").Router();
const { getAllCategories } = require("../../controllers");

const { tryCatchWrapper } = require("../../middlewares");

// http://localhost:8081/api/transactions/categories/getAllCategories
router.get("/", tryCatchWrapper(getAllCategories));

module.exports = router;
