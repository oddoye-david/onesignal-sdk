'use strict';

const Joi = require('joi');

const {
  QueryParamSchema,
  IdSchema,
} = require('../validators');

module.exports = axios => ({
  /**
   * Get all devices for the specified Onesignal app
   *
   * @param {Function} cb Callback function for backwards compatibility
   * @returns {Promise}
   */
  getDevices(appId, paginationParams, cb) {
    const {
      error,
    } = Joi.validate({ ...paginationParams, app_id: appId }, QueryParamSchema);

    if (error) {
      throw error;
    }

    const callback = cb || (() => {});
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
   * @param {Function} cb Callback function for backwards compatibility
   * @returns {Promise}
   */
  getDevice(id, appId, cb) {
    const idError = Joi.validate(id, IdSchema).error;

    if (idError) {
      throw idError;
    }

    const appIdError = Joi.validate(appId, IdSchema).error;

    if (appIdError) {
      throw appIdError;
    }

    const callback = cb || (() => {});
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
