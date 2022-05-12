const router = require('express').Router();
const {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
} = require('../../controllers');

// http://localhost:8081/api/transactions/createTransaction
router.post('/', createTransaction);

// http://localhost:8081/api/transactions/getAllTransactions
router.get('/', getAllTransactions);

// http://localhost:8081/api/transactions/getTransactionById
router.get('/:transactionId', getByIdTransaction);

// http://localhost:8081/api/transactions/deleteTransaction
router.delete('/:transactionId', deleteTransaction);

// http://localhost:8081/api/transactions/updateByIdTransaction
router.put('/:transactionId', updateByIdTransaction);

module.exports = router;
