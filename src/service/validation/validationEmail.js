const Joi = require('joi');
const { regexEmail } = require('../../helpers/regex');

const validationEmail = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    'string.empty': 'The email cannot be empty',
    'string.pattern.base': 'Enter the desired format',
    'any.required': 'Email is required',
  }),
});

module.exports = validationEmail;
