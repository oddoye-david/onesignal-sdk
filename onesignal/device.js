'use strict';

const Joi = require('joi');

const Utils = require('../utils');
const {
  QueryParamSchema,
  IdSchema,
} = require('../validators');

module.exports = axios => ({
  /**
   * Get all devices for the specified Onesignal app
   *
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  getDevices(appId, paginationParams, callback) {
    const {
      error,
    } = Joi.validate(Object.assign({}, paginationParams, {
      app_id: appId,
    }), QueryParamSchema);

    if (error) {
      throw error;
    }

    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }
    return axios.get(`/players?app_id=${appId}&limit=${paginationParams.limit}&offset=${paginationParams.offset}`)
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
   * Get details of a device
   *
   * @param {Function} callback Callback function for backwards compatibility
   * @returns {Promise}
   */
  getDevice(id, appId, callback) {
    const idError = Joi.validate(id, IdSchema).error;

    if (idError) {
      throw idError;
    }

    const appIdError = Joi.validate(appId, IdSchema).error;

    if (appIdError) {
      throw appIdError;
    }

    if (!callback || !Utils.isFunction(callback)) {
      callback = function () {};
    }
    return axios.get(`/players/${id}?app_id=${appId}`)
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
