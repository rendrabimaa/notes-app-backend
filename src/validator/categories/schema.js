const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
});

module.exports = { CategoryPayloadSchema };
