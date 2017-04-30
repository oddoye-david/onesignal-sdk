'use strict';

const Joi = require('joi');

const IdSchema = Joi.string().required();

module.exports = IdSchema;
