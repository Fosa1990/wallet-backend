const { model } = require('mongoose');

const { categoriesSchema } = require('./categoriesSchema');
const { transactionsSchema } = require('./transactionsSchema');
const { userSchema } = require('./userSchema');

const Category = model('user', categoriesSchema);
const Transactions = model('user', transactionsSchema);
const User = model('user', userSchema);

module.exports = { User, Transactions, Category };
