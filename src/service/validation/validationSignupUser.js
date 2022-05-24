const Joi = require('joi');
const { regexName, regexEmail } = require('../../helpers/regex');
const { USER_LIMIT } = require('../../helpers/constants');

const validationSignupUser = Joi.object({
  name: Joi.string()
    .pattern(regexName)
    .min(USER_LIMIT.NAME.MIN)
    .max(USER_LIMIT.NAME.MAX)
    .required()
    .messages({
      'string.empty': 'The name cannot be empty',
      'string.pattern.base': 'Enter the desired format',
      'string.min': `Min ${USER_LIMIT.NAME.MIN} characters`,
      'string.max': `Min ${USER_LIMIT.NAME.MAX} characters`,
      'any.required': 'Name is required',
    }),
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
  confirmPassword: Joi.string()
    .min(USER_LIMIT.PASSWORD.MIN)
    .max(USER_LIMIT.PASSWORD.MAX)
    .optional()
    .messages({
      'string.empty': 'The confirm password cannot be empty',
      'string.min': `Min ${USER_LIMIT.PASSWORD.MIN} characters`,
      'string.max': `Min ${USER_LIMIT.PASSWORD.MAX} characters`,
      'any.optional': "Password isn't required",
    }),
  avatarURL: Joi.string().optional().default(null).messages({
    'string.empty': 'The avatarURL cannot be empty',
    'any.optional': "avatarURL isn't required",
  }),
});

module.exports = validationSignupUser;
