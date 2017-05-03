'use strict';

const Joi = require('joi');

const Utils = require('../utils');
const {
  CreateAppSchema,
  IdSchema,
  EditAppSchema,
} = require('../validators');

module.exports = axios => ({
  /**
   * Get all OneSignal apps
   *
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  getApps(callback) {
    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }

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
   * @param {String} id Id of the app
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  getApp(id, callback) {
    const {
      error,
    } = Joi.validate(id, IdSchema);

    if (error) {
      throw error;
    }

    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }
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
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  createApp(data, callback) {
    const {
      error,
    } = Joi.validate(data, CreateAppSchema);

    if (error) {
      throw error;
    }

    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }
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
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  editApp(id, data, callback) {
    const idError = Joi.validate(id, IdSchema).error;

    if (idError) {
      throw idError;
    }

    const appError = Joi.validate(data, EditAppSchema).error;

    if (appError) {
      throw appError;
    }

    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }
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
