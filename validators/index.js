'use strict';

const CreateAppSchema = require('./create_app');
const EditAppSchema = require('./edit_app');
const IdSchema = require('./id');
const QueryParamSchema = require('./query_params');
const SessionSchema = require('./session');
const SessionTimeSchema = require('./session_time');

module.exports = {
  CreateAppSchema,
  EditAppSchema,
  IdSchema,
  QueryParamSchema,
  SessionSchema,
  SessionTimeSchema,
};
