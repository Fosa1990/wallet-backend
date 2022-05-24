const Joi = require('joi');
const { regexEmail } = require('../../helpers/regex');
const { USER_LIMIT } = require('../../helpers/constants');

const validationEmail = Joi.object({
  email: Joi.string()
    .min(USER_LIMIT.EMAIL.MIN)
    .max(USER_LIMIT.EMAIL.MAX)
    .pattern(regexEmail)
    .required()
    .messages({
      'string.empty': 'The email cannot be empty',
      'string.min': 'Email must be at least 10 characters long',
      'string.max': 'Email must be at least 63 characters long',
      'string.pattern.base': 'Enter the desired format',
      'any.required': 'Email is required',
    }),
});

module.exports = validationEmail;
