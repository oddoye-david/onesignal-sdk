'use strict';

const test = require('tape');

const OneSignalSDK = require('../onesignal');


test('OneSignal does not initialize without options', (t) => {
  t.throws(() => OneSignalSDK(), new Error('API Key is required.'));
  t.end();
});

test('Onesignal does not intialize with wrong options', (t) => {
  t.throws(() => OneSignalSDK({
    foo: 'bar',
  }), new Error('API Key is required.'));
  t.end();
});

test('Onesignal intializes correct options', (t) => {
  t.doesNotThrow(() => OneSignalSDK({
    api_key: 'a-correct-api-key',
  }));
  t.end();
});
