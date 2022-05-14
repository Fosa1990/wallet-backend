const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const validationId = Joi.object({
  transactionId: Joi.objectId()
    .required()
    .messages({ 'any.required': 'Id is required' }),
});

module.exports = validationId;
