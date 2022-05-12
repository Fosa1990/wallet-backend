const router = require("express").Router();
const { getAllCategories } = require("../../controllers");

const { Category } = require("../../models");

// http://localhost:8081/api/categories/getAll
router.get("/", getAllCategories);

// http://localhost:8081/api/transactions/createTransaction
router.post("/", async (req, res, next) => {
  const { body } = req;
  const cat = await Category.create(body);
  res.json({
    status: "ок",
    code: 200,
    payload: {
      message: "Transaction created successfully",
      cat,
    },
  });
});

module.exports = router;
