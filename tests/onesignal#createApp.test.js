'use strict';

const test = require('tape');

const OneSignalSDK = require('../onesignal');

const onesignal = OneSignalSDK({
  api_key: 'a-correct-api-key',
});

test('Onesignal.createApp throws if data.name is not provided', (t) => {
  t.throws(() => {
    onesignal.createApp({});
  }, new Error());
  t.end();
});

test('Onesignal.createApp throws if data.name is not a string', (t) => {
  t.throws(() => {
    onesignal.createApp({
      name: 42,
    });
  }, new Error());
  t.end();
});

test('Onesignal.createApp throws if data contains invalid properties', (t) => {
  t.throws(() => {
    onesignal.createApp({
      name: 'a valid key',
      not_valid_prop: 'mayday mayday',
    });
  }, new Error());
  t.end();
});

test('Onesignal.createApp throws if data contains valid optional properties, but invalid values', (t) => {
  t.throws(() => {
    onesignal.createApp({
      name: 'a valid key',
      apns_env: 'not sandbox or production',
      safari_site_origin: 'not a valid url',
    });
  }, new Error());
  t.end();
});

test('Onesignal.createApp does not throw if data.name is a string', (t) => {
  t.doesNotThrow(() => {
    onesignal.createApp({
      name: 'a valid name',
    })
      .then(() => t.end())
      .catch(() => t.end());
  });
});

test('Onesignal.createApp does not throw if optional properties are passed corectly.', (t) => {
  t.doesNotThrow(() => {
    onesignal.createApp({
      name: 'a valid name',
      apns_env: 'sandbox',
      safari_site_origin: 'https://example.com',
    })
      .then(() => t.end())
      .catch(() => t.end());
  });
});
