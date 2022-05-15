const {
  signin,
  signout,
  signup,
  googleAuth,
  googleRedirect,
} = require('./auth');
const { current, reVerify, verifyEmail, avatar } = require('./users');
const {
  createCategory,
  getAllCategories,
  getByIdCategories,
} = require('./categories');
const {
  createTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
  deleteTransaction,
} = require('./transactions');

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
  createCategory,
  getAllCategories,
  getByIdCategories,
  createTransaction,
  getAllTransactions,
  getByIdTransaction,
  updateByIdTransaction,
  deleteTransaction,
};
