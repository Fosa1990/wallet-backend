const { Schema, Types } = require('mongoose');
const category = require('../helpers/category');
const transactionType = require('../helpers/transactionType');

const transactionsSchema = new Schema(
  {
    date: {
      type: Date,
      min: '2022-01-01',
      required: [true, 'Date is required'],
    },
    transactionType: {
      type: String,
      lowercase: true,
      enum: transactionType,
      required: [true, 'Transaction type is required'],
    },
    category: {
      type: String,
      lowercase: true,
      enum: category,
      required: [true, 'Category is required'],
    },
    sum: {
      type: Number,
      min: 0.01,
      required: [true, 'Specify the amount of the transaction'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 250,
      default: '',
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
    },
    owner: {
      type: Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = transactionsSchema;
