'use strict';

const Joi = require('joi');

const SessionTimeSchema = Joi.object().keys({
  state: Joi.string().required(),
  active_time: Joi.number().integer().required(),
}).required();

module.exports = SessionTimeSchema;
