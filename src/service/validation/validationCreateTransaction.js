const Joi = require('joi');

const validationCreateTransaction = Joi.object({
  date: Joi.string().required().messages({
    'string.empty': 'The date cannot be empty',
    'any.required': 'Date is required',
  }),
  transactionType: Joi.string()
    .valid('spend', 'income')
    .lowercase()
    .required()
    .messages({
      'string.empty': 'The transaction type cannot be empty',
      'any.only': 'Transaction type must be one of: spend, income',
      'any.required': 'Transaction type is required',
    }),
  category: Joi.string()
    .valid(
      'basic spend',
      'products',
      'car',
      'household products',
      'self care',
      'child care',
      'education',
      'leisure',
      'other spend',
      'regular income',
      'irregular income',
    )
    .lowercase()
    .required()
    .messages({
      'string.empty': 'The category cannot be empty',
      'any.only':
        'Category must be one of: basic spend, products, car, household products, self care, child care, education, leisure, other spend, regular income, irregular income',
      'any.required': 'Category is required',
    }),
  sum: Joi.number().required().messages({
    'string.empty': 'The sum cannot be empty',
    'any.required': 'Specify the amount of the transaction',
  }),
  comment: Joi.string().max(250).required().messages({
    'string.empty': 'The comment cannot be empty',
    'string.max': 'Max 250 characters',
    'any.required': 'Comment is required',
  }),
  balance: Joi.number().required().messages({
    'string.empty': 'The balance cannot be empty',
    'any.required': 'Balance is required',
  }),
});

module.exports = validationCreateTransaction;
