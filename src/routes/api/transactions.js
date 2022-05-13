const router = require('express').Router();
const {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
} = require('../../controllers');

const { validateAuth, tryCatchWrapper } = require('../../middlewares');

// http://localhost:8081/api/transactions/createTransaction
router.post('/', validateAuth, tryCatchWrapper(createTransaction));

// http://localhost:8081/api/transactions/getAllTransactions
router.get('/', validateAuth, tryCatchWrapper(getAllTransactions));

// http://localhost:8081/api/transactions/getTransactionById
router.get(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(getByIdTransaction),
);

// http://localhost:8081/api/transactions/deleteTransaction
router.delete(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(deleteTransaction),
);

// http://localhost:8081/api/transactions/updateByIdTransaction
router.put(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(updateByIdTransaction),
);

module.exports = router;
