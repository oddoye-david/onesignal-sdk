'use strict';

const Joi = require('joi');

const { CreateAppSchema, IdSchema, EditAppSchema } = require('../validators');

module.exports = axios => ({
    /**
     * Get all OneSignal apps
     *
     * @param {Function} cb Callback function for backwards compatibility
     * @returns {Promise}
     */
  getApps(cb) {
    const callback = cb || (() => {});
    return axios.get('/apps')
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
     * Get details of a OneSignal app
     *
     * @param {Function} cb Callback function for backwards compatibility
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
    return axios.get(`/apps/${id}`)
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
     * @param {Function} cb Callback function for backwards compatibility
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
    return axios.post('/apps', data)
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
     * @param {Function} cb Callback function for backwards compatibility
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
    return axios.put('/apps', data)
        .then((response) => {
          callback(null, response.data);
          return response.data;
        })
        .catch((err) => {
          callback(err, null);
          return err;
        });
  },
});
