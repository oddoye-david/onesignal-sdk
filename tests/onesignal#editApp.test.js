'use strict';

const test = require('tape');

const OneSignalSDK = require('../onesignal');

const onesignal = OneSignalSDK({
  api_key: 'a-correct-api-key',
});

test('Onesignal.editApp throws if id is not provided', (t) => {
  t.throws(() => {
    onesignal.editApp(null, {});
  }, new Error());
  t.end();
});

test('Onesignal.editApp throws if data is not provided', (t) => {
  t.throws(() => {
    onesignal.editApp('42');
  }, new Error());
  t.end();
});

test('Onesignal.editApp throws if data contains invalid properties', (t) => {
  t.throws(() => {
    onesignal.editApp('42', {
      name: 'a valid key',
      not_valid_prop: 'mayday mayday',
    });
  }, new Error());
  t.end();
});

test('Onesignal.editApp throws if data contains valid optional properties, but invalid values', (t) => {
  t.throws(() => {
    onesignal.editApp('42', {
      name: 'a valid key',
      apns_env: 'not sandbox or production',
      safari_site_origin: 'not a valid url',
    });
  }, new Error());
  t.end();
});

test('Onesignal.editApp does not throw if optional properties are passed corectly.', (t) => {
  t.doesNotThrow(() => {
    onesignal.editApp('42', {
      name: 'a valid name',
      apns_env: 'sandbox',
    })
      .then(() => t.end())
      .catch(() => t.end());
  });
});

test('Onesignal.editApp throws if data does not contain all safari web push properties at the same time', (t) => {
  t.throws(() => {
    onesignal.editApp('42', {
      safari_apns_p12: 'a valid value',
    });
  }, new Error());
  t.end();
});

test('Onesignal.editApp does not throw if data contains all safari web push properties at the same time', (t) => {
  t.doesNotThrow(() => {
    onesignal.editApp('42', {
      safari_apns_p12: 'a valid value',
      safari_apns_p12_password: 'a valid value',
      site_name: 'a valid value',
      safari_site_origin: 'https://a-valid-url.com',
    });
  }, new Error());
  t.end();
});
