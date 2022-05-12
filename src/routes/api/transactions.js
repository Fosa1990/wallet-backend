const router = require("express").Router();
const {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
} = require("../../controllers");

const { tryCatchWrapper } = require("../../middlewares");

// http://localhost:8081/api/transactions/createTransaction
router.post("/", tryCatchWrapper(createTransaction));

// http://localhost:8081/api/transactions/getAllTransactions
router.get("/", tryCatchWrapper(getAllTransactions));

// http://localhost:8081/api/transactions/getTransactionById
router.get("/:transactionId", tryCatchWrapper(getByIdTransaction));

// http://localhost:8081/api/transactions/deleteTransaction
router.delete("/:transactionId", tryCatchWrapper(deleteTransaction));

// http://localhost:8081/api/transactions/updateByIdTransaction
router.put("/:transactionId", tryCatchWrapper(updateByIdTransaction));

module.exports = router;
