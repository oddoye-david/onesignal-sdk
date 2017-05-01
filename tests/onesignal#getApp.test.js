'use strict';

const test = require('tape');

const OneSignalSDK = require('../onesignal');

const onesignal = OneSignalSDK({
  api_key: 'a-correct-api-key',
});

test('Onesignal.getApp throws if id is not a string', (t) => {
  t.throws(() => {
    onesignal.getApp(42);
  }, new Error());
  t.end();
});

test('Onesignal.getApp does not throw if id is a string', (t) => {
  t.doesNotThrow(() => {
    onesignal.getApp('42')
      .then(() => t.end())
      .catch(() => t.end());
  });
});
