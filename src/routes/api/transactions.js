const router = require('express').Router();
const {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
} = require('../../controllers');

const { validateAuth, tryCatchWrapper } = require('../../middlewares');

// http://localhost:8081/api/transactions
router.post('/', validateAuth, tryCatchWrapper(createTransaction));

// http://localhost:8081/api/transactions
router.get('/', validateAuth, tryCatchWrapper(getAllTransactions));

// http://localhost:8081/api/transactions/transactionId
router.get(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(getByIdTransaction),
);

// http://localhost:8081/api/transactions/transactionId
router.delete(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(deleteTransaction),
);

// http://localhost:8081/api/transactions/transactionId
router.put(
  '/:transactionId',
  validateAuth,
  tryCatchWrapper(updateByIdTransaction),
);

module.exports = router;
