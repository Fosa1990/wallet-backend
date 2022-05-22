const Joi = require('joi');
const category = require('../../helpers/category');
const transactionType = require('../../helpers/transactionType');

const validationUpdateTransaction = Joi.object({
  date: Joi.string().optional().messages({
    'number.base': 'The sum must be a string',
    'string.empty': 'The date cannot be empty',
  }),
  transactionType: Joi.string()
    .valid(...transactionType)
    .lowercase()
    .optional()
    .messages({
      'number.base': 'The sum must be a string',
      'string.empty': 'The transaction type cannot be empty',
      'any.only': `Transaction type must be one of: ${transactionType.join(
        ', ',
      )}`,
    }),
  category: Joi.string()
    .valid(...category)
    .lowercase()
    .optional()
    .messages({
      'number.base': 'The sum must be a string',
      'string.empty': 'The category cannot be empty',
      'any.only': `Category must be one of: ${category.join(', ')}`,
    }),
  sum: Joi.number().strict().precision(2).min(0.01).optional().messages({
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

module.exports = validationUpdateTransaction;
