const { Schema, Types } = require("mongoose");

const transactionsSchema = new Schema(
  {
    date: {
      type: Date,
      min: "2022-01-01",
      required: [true, "Date is required"],
    },
    transactionType: {
      type: String,
      enum: ["spend", "income"],
      default: "spend",
      required: [true, "Transaction type is required"],
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
    },
    sum: {
      type: Number,
      required: [true, "Specify the amount of the transaction"],
      trim: true,
    },
    comment: {
      type: String,
      maxlength: 250,
      required: [true, "Comment is required"],
      trim: true,
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      trim: true,
    },
    // owner: {
    //   type: Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

module.exports = transactionsSchema;
