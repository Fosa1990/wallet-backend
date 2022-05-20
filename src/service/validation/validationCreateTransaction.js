const Joi = require('joi');
const category = require('../../helpers/category');
const transactionType = require('../../helpers/transactionType');
const { regexName } = require('../../helpers/regex');

const validationCreateTransaction = Joi.object({
  date: Joi.string().required().messages({
    'string.empty': 'The date cannot be empty',
    'any.required': 'Date is required',
  }),
  transactionType: Joi.string()
    .valid(...transactionType)
    .lowercase()
    .required()
    .messages({
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
      'string.empty': 'The category cannot be empty',
      'any.only': `Category must be one of: ${category.join(', ')}`,
      'any.required': 'Category is required',
    }),
  sum: Joi.number().required().messages({
    'string.empty': 'The sum cannot be empty',
    'any.required': 'Specify the amount of the transaction',
  }),
  comment: Joi.string()
    .pattern(regexName)
    .max(250)
    .default('')
    .trim()
    .messages({
      'string.empty': 'The comment cannot be empty',
      'string.pattern.base': 'Enter the desired format!',
      'string.max': 'Max 250 characters',
    }),
});

module.exports = validationCreateTransaction;
