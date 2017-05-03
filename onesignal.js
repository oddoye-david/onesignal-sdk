'use strict';

const axios = require('axios');
const Joi = require('joi');

const { CreateAppSchema, IdSchema, EditAppSchema } = require('./validators');

/**
 * OneSignal SDK
 *
 * @param {String} opts.api_key API Key for Onesignal account.
 * @returns {Object}
 */
function OneSignalSDK(opts) {
  if (!opts.api_key) {
    throw new Error('API Key is required.');
  }

  const request = axios.create({
    baseURL: 'https://onesignal.com/api/v1',
    headers: {
      Authorization: `Basic ${opts.api_key}`,
    },
    timeout: process.env.NODE_ENV === 'testing' ? 3000 : undefined,
  });

  return {

    /**
     * ===== Apps =====
     */


    /**
     * Get all OneSignal apps
     *
     * @param {Func} cb Callback function for backwards compatibility
     * @returns {Promise}
     */
    getApps(cb) {
      const callback = cb || (() => {});
      return request.get('/apps')
        .then((response) => {
          callback(null, response.data);
          return response.data;
        })
        .catch((err) => {
          callback(err, null);
          return err;
        });
    },

    /**
     * Get all OneSignal apps
     *
     * @param {Func} cb Callback function for backwards compatibility
     * @returns {Promise}
     */
    getApp(id, cb) {
      const {
        error,
      } = Joi.validate(id, IdSchema);

      if (error) {
        throw error;
      }

      const callback = cb || (() => {});
      return request.get('/apps')
        .then((response) => {
          callback(null, response.data);
          return response.data;
        })
        .catch((err) => {
          callback(err, null);
          return err;
        });
    },

    /**
     * Create a OneSignal app
     *
     * @param {App} data App Object see https://documentation.onesignal.com/reference#create-an-app
     * @param {Func} cb Callback function for backwards compatibility
     * @returns {Promise}
     */
    createApp(data, cb) {
      const {
        error,
      } = Joi.validate(data, CreateAppSchema);

      if (error) {
        throw error;
      }

      const callback = cb || (() => {});
      return request.post('/apps', data)
        .then((response) => {
          callback(null, response.data);
          return response.data;
        })
        .catch((err) => {
          callback(err, null);
          return err;
        });
    },

    /**
     * Edit a OneSignal app
     *
     * @param {String} id
     * @param {App} data App Object see https://documentation.onesignal.com/reference#create-an-app
     * @param {Func} cb Callback function for backwards compatibility
     * @returns {Promise}
     */
    editApp(id, data, cb) {
      const idError = Joi.validate(id, IdSchema).error;

      if (idError) {
        throw idError;
      }

      const appError = Joi.validate(data, EditAppSchema).error;

      if (appError) {
        throw appError;
      }

      const callback = cb || (() => {});
      return request.put('/apps', data)
        .then((response) => {
          callback(null, response.data);
          return response.data;
        })
        .catch((err) => {
          callback(err, null);
          return err;
        });
    },
  };
}

module.exports = OneSignalSDK;
