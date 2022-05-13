const { model } = require("mongoose");

const transactionsSchema = require("./transactionsSchema");
const userSchema = require("./userSchema");

const Transaction = model("transaction", transactionsSchema);
const User = model("user", userSchema);

module.exports = {
  User,
  Transaction,
};
