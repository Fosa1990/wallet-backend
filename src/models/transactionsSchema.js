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
      lowercase: true,
      enum: ["spend", "income"],
      required: [true, "Transaction type is required"],
    },
    category: {
      type: String,
      lowercase: true,
      enum: [
        "basic spend",
        "products",
        "car",
        "household products",
        "self care",
        "child care",
        "education",
        "leisure",
        "other spend",
        "regular income",
        "irregular income",
      ],
      required: [true, "Category is required"],
    },
    sum: {
      type: Number,
      trim: true,
      required: [true, "Specify the amount of the transaction"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 250,
      required: [true, "Comment is required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
    },
    // owner: {
    //   type: Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

module.exports = transactionsSchema;
