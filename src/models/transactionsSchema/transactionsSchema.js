const { Schema } = require('mongoose');

const transactionsSchema = new Schema(
  {
    transactionType: {
      type: String,
      enum: ['spend', 'income'],
      default: 'spend',
      required: [true, 'Transaction is required'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    sum: {
      type: Number,
      required: [true, 'Specify the amount of the transaction'],
    },
    date: {
      type: Date,
      min: '2022-01-01',
      required: [true, 'Date is required'],
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    comment: {
      type: String,
      maxlength: 250,
      default: null,
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = { transactionsSchema };
