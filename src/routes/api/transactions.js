const router = require('express').Router();

// http://localhost:8083/api/transactions/createTransaction
router.post('/', async (req, res, next) => {
  res.json({ message: 'template message: transactions - createTransaction' });
});

// http://localhost:8083/api/transactions/getAllTransactions
router.get('/', async (req, res, next) => {
  res.json({ message: 'template message: transactions - getAllTransactions' });
});

// http://localhost:8083/api/transactions/getTransactionById
router.get('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message: transactions - getTransactionById' });
});

// http://localhost:8083/api/transactions/deleteTransaction
router.delete('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message: transactions - deleteTransaction' });
});

// http://localhost:8083/api/transactions/updateTransaction
router.put('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message: transactions - updateTransaction' });
});

module.exports = router;
