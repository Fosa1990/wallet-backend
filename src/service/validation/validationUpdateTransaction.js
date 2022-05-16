const Joi = require('joi');

const validationUpdateTransaction = Joi.object({
  date: Joi.string().optional().messages({
    'string.empty': 'The date cannot be empty',
  }),
  transactionType: Joi.string()
    .valid('spend', 'income')
    .lowercase()
    .optional()
    .messages({
      'string.empty': 'The transaction type cannot be empty',
      'any.only': 'Transaction type must be one of: spend, income',
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
    .optional()
    .messages({
      'string.empty': 'The category cannot be empty',
      'any.only':
        'Category must be one of: basic spend, products, car, household products, self care, child care, education, leisure, other spend, regular income, irregular income',
    }),
  sum: Joi.number().optional().messages({
    'string.empty': 'The sum cannot be empty',
  }),
  comment: Joi.string().max(250).optional().messages({
    'string.empty': 'The comment cannot be empty',
    'string.max': 'Max 250 characters',
  }),
});

module.exports = validationUpdateTransaction;
