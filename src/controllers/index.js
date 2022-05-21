const {
  signin,
  signout,
  signup,
  googleAuth,
  googleRedirect,
} = require('./auth');
const { current, reVerify, verifyEmail, avatar } = require('./users');
const { getAllCategories } = require('./categories');
const {
  createTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
  deleteTransaction,
} = require('./transactions');
const { currency } = require('./currency');

module.exports = {
  googleAuth,
  googleRedirect,
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
  currency,
};
