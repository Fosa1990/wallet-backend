const Joi = require('joi');
const { regexName, regexEmail } = require('../../helpers/regex');
const { USER_LIMIT } = require('../../../helpers/constants');

const validationSignupUser = Joi.object({
  name: Joi.string()
    .pattern(regexName)
    .min(USER_LIMIT.NAME.MIN)
    .max(USER_LIMIT.NAME.MAX)
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'The name cannot be empty',
    }),
  email: Joi.string().pattern(regexEmail).required().messages({
    'any.required': 'Email is required',
    'string.empty': 'The email cannot be empty',
  }),
  password: Joi.string()
    .min(USER_LIMIT.PASSWORD.MIN)
    .max(USER_LIMIT.PASSWORD.MAX)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'The password cannot be empty',
    }),
  avatarURL: Joi.string().optional().default(null).messages({
    'any.optional': "avatarURL isn't required",
    'string.empty': 'The avatarURL cannot be empty',
  }),
});

module.exports = validationSignupUser;
