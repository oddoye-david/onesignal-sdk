'use strict';

const axios = require('axios');
const App = require('./app');
const Device = require('./device');

/**
 * OneSignal SDK
 *
 * @param {Object} opts.api_key API Key for Onesignal account.
 * @returns {Object}
 */
module.exports = function OneSignalSDK(opts) {
  if (!opts.api_key) {
    throw new Error('API Key is required.');
  }

  const baseAxios = axios.create({
    baseURL: 'https://onesignal.com/api/v1',
    headers: {
      Authorization: `Basic ${opts.api_key}`,
    },
    timeout: process.env.NODE_ENV === 'testing' ? 3000 : undefined,
  });

  const apps = App(baseAxios);
  const devices = Device(baseAxios);

  return Object.assign({}, apps, devices);
};
