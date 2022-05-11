const { signin, signout, signup } = require('./auth');
const { current, verify } = require('./users');
const { getAll } = require('./categories');
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('./transactions');

module.exports = {
  signin,
  signout,
  signup,
  current,
  verify,
  getAll,
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
