'use strict';

const Joi = require('joi');

const CallbackSchema = Joi.func().required();

module.exports = CallbackSchema;
