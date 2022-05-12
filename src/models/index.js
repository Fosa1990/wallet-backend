const { model } = require("mongoose");

const categoriesSchema = require("./categoriesSchema");
const transactionsSchema = require("./transactionsSchema");
const userSchema = require("./userSchema");

const Category = model("category", categoriesSchema);
const Transaction = model("transaction", transactionsSchema);
const User = model("user", userSchema);

module.exports = {
  User,
  Transaction,
  Category,
};
