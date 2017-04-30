'use strict';

const axios = require('axios');
const Joi = require('joi');

const { AppSchema, IdSchema } = require('./validators');

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
  });

  return {

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
     * @param {String} data.some key
     * @param {any} cb
     * @returns
     */
    createApp(data, cb) {
      const {
        error,
      } = Joi.validate(data, AppSchema);

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
  };
}

module.exports = OneSignalSDK;
