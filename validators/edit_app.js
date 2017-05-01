'use strict';

const Joi = require('joi');

const EditAppSchema = Joi.object().keys({
  name: Joi.string(),
  apns_env: Joi.string().valid('sandbox', 'production').optional(),
  apns_p12: Joi.string().optional(),
  apns_p12_password: Joi.string().optional(),
  gcm_key: Joi.string().optional(),
  android_gcm_sender_id: Joi.string().optional(),
  chrome_web_origin: Joi.string().uri().optional(),
  chrome_web_default_notification_icon: Joi.string().uri().optional(),
  chrome_web_sub_domain: Joi.string().optional(),
  safari_apns_p12: Joi.string().optional(),
  safari_apns_p12_password: Joi.string().optional(),
  site_name: Joi.string().optional(),
  safari_site_origin: Joi.string().uri().optional(),
  safari_icon_256_256: Joi.string().uri().optional(),
  chrome_key: Joi.string().optional(),
})
.and([
  'safari_apns_p12',
  'safari_apns_p12_password',
  'site_name',
  'safari_site_origin',
]).required();

module.exports = EditAppSchema;
