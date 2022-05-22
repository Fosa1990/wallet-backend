const Joi = require('joi');
const category = require('../../helpers/category');
const transactionType = require('../../helpers/transactionType');

const validationCreateTransaction = Joi.object({
  date: Joi.string().required().messages({
    'number.base': 'The sum must be a string',
    'string.empty': 'The date cannot be empty',
    'any.required': 'Date is required',
  }),
  transactionType: Joi.string()
    .valid(...transactionType)
    .lowercase()
    .required()
    .messages({
      'number.base': 'The sum must be a string',
      'string.empty': 'The transaction type cannot be empty',
      'any.only': `Transaction type must be one of: ${transactionType.join(
        ', ',
      )}`,
      'any.required': 'Transaction type is required',
    }),
  category: Joi.string()
    .valid(...category)
    .lowercase()
    .required()
    .messages({
      'number.base': 'The sum must be a string',
      'string.empty': 'The category cannot be empty',
      'any.only': `Category must be one of: ${category.join(', ')}`,
      'any.required': 'Category is required',
    }),
  sum: Joi.number().strict().precision(2).min(0.01).required().messages({
    'number.base': 'The sum must be a number',
    'number.precision': 'The sum must have no more than 2 decimal places',
    'number.min': 'The sum must be greater than or equal to 0.01',
    'any.required': 'Specify the amount of the transaction',
  }),
  comment: Joi.string().max(250).empty('').optional().trim().messages({
    'number.base': 'The sum must be a string',
    'string.max': 'Max 250 characters',
  }),
});

module.exports = validationCreateTransaction;
