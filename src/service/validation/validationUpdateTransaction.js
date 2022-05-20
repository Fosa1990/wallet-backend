const Joi = require('joi');
const category = require('../../helpers/category');
const transactionType = require('../../helpers/transactionType');
const { regexName } = require('../../helpers/regex');

const validationUpdateTransaction = Joi.object({
  date: Joi.string().optional().messages({
    'string.empty': 'The date cannot be empty',
  }),
  transactionType: Joi.string()
    .valid(...transactionType)
    .lowercase()
    .optional()
    .messages({
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
      'string.empty': 'The category cannot be empty',
      'any.only': `Category must be one of: ${category.join(', ')}`,
    }),
  sum: Joi.number().optional().messages({
    'string.empty': 'The sum cannot be empty',
  }),
  comment: Joi.string().pattern(regexName).max(250).optional().trim().messages({
    'string.empty': 'The comment cannot be empty',
    'string.pattern.base': 'Enter the desired format!',
    'string.max': 'Max 250 characters',
  }),
});

module.exports = validationUpdateTransaction;
