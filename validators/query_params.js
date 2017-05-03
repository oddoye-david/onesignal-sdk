'use strict';

const Joi = require('joi');

const QueryParamsSchema = Joi.object().keys({
  app_id: Joi.string().required(),
  limit: Joi.string(),
  offset: Joi.string(),
}).required();

module.exports = QueryParamsSchema;
