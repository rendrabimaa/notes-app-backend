const Joi = require('joi');

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  cue: Joi.string().required(),
  main: Joi.string().required(),
  summary: Joi.string().required(),
  categoryId: Joi.string(),
});

module.exports = { NotePayloadSchema };
