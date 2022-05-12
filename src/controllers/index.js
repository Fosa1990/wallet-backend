const { signin, signout, signup } = require('./auth');
const { current, reVerify, verifyEmail, avatar } = require('./users');
const { getAllCategories } = require('./categories');
const {
  createTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
  deleteTransaction,
} = require('./transactions');

module.exports = {
  signin,
  signout,
  signup,
  current,
  reVerify,
  verifyEmail,
  avatar,
  getAllCategories,
  createTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
  deleteTransaction,
};
