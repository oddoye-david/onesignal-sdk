'use strict';

const Joi = require('joi');

const SessionSchema = Joi.object().keys({
  identifier: Joi.string().optional(),
  language: Joi.string().optional(),
  timezone: Joi.number().integer().optional(),
  game_version: Joi.string().optional(),
  device_os: Joi.string().optional(),
  ad_id: Joi.string().optional(),
  sdk: Joi.string().optional(),
  tags: Joi.object().optional(),
}).required();

module.exports = SessionSchema;
