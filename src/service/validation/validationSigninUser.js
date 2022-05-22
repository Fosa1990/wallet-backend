const Joi = require('joi');
const { regexEmail } = require('../../helpers/regex');
const { USER_LIMIT } = require('../../helpers/constants');

const validationSigninUser = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    'string.empty': 'The email cannot be empty',
    'string.pattern.base': 'Enter the desired format',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(USER_LIMIT.PASSWORD.MIN)
    .max(USER_LIMIT.PASSWORD.MAX)
    .required()
    .messages({
      'string.empty': 'The password cannot be empty',
      'string.min': `Min ${USER_LIMIT.PASSWORD.MIN} characters`,
      'string.max': `Min ${USER_LIMIT.PASSWORD.MAX} characters`,
      'any.required': 'Password is required',
    }),
});

module.exports = validationSigninUser;
