'use strict';

const Joi = require('joi');

const {
  SessionSchema,
  SessionTimeSchema,
  IdSchema,
} = require('../validators');

module.exports = axios => ({
  /**
   * Start a session for a player
   *
   * @param {Strinng} playerId Player's ID
   * @param {Session} data Session Object see https://documentation.onesignal.com/reference#new-session
   * @param {Function} cb Callback function for backwards compatibility
   * @returns {Promise}
   */
  newSession(playerId, data, cb) {
    const sessionError = Joi.validate(data, SessionSchema).error;

    if (sessionError) {
      throw sessionError;
    }

    const playerIdError = Joi.validate(playerId, IdSchema).error;

    if (playerIdError) {
      throw playerIdError;
    }

    const callback = cb || (() => {});
    return axios.post(`/players/${playerId}/on_session`, data)
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
   * Update a device's session length
   *
   * @param {String} playerId Player's ID
   * @param {Number} activeTime Duration in seconds since the app was last in focus
   * @param {Function} cb Callback function for backwards compatibility
   * @returns {Promise}
   */
  incrementSessionTime(playerId, activeTime, cb) {
    const data = { active_time: activeTime, state: 'ping' };
    const sessionError = Joi.validate(data, SessionTimeSchema).error;

    if (sessionError) {
      throw sessionError;
    }

    const callback = cb || (() => {});
    return axios.post(`/players/${playerId}/on_focus`, data)
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
