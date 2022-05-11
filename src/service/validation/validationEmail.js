const Joi = require('joi');
const { regexEmail } = require('../../helpers/regex');

const validationEmail = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    'any.required': 'Email is required',
    'string.empty': 'The email cannot be empty',
  }),
});

module.exports = validationEmail;
