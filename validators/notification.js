'use strict';

const Joi = require('joi');
const supportedLanguages = require('../supported_languages.json');

const filterSchema = Joi.object.keys({
  field: Joi.string().valid(
    'last_session',
    'first_session',
    'session_count',
    'session_time',
    'amount_spent',
    'bought_sku',
    'tag',
    'language',
    'app_version',
    'location',
    'email',
  ).required(),
  relation: Joi.string().valid('>', '<', '=', '!=', 'exists', 'not_exists').optional(),
  key: Joi.string().optional(),
  value: Joi.string().optional(),
  hours_ago: Joi.string().optional(),
  radius: Joi.string().optional(),
  lat: Joi.string().optional(),
  long: Joi.string().optional(),
});

const operatorSchema = Joi.object().keys({
  operator: Joi.string().valid('OR', 'AND').required(),
});

const supportedLanguagesObj = {};
supportedLanguages.map((lang) => {
  if (lang === 'en') {
    supportedLanguagesObj[lang] = Joi.string().required();
  } else {
    supportedLanguagesObj[lang] = Joi.string().optional();
  }
  return null;
});

const buttonSchema = Joi.object().keys({
  id: Joi.string(),
  text: Joi.string(),
  icon: Joi.string(),
});

const webButtonSchema = Joi.object().keys({
  id: Joi.string().required(),
  text: Joi.string(),
  icon: Joi.string().uri(),
  url: Joi.string().uri(),
});

const contentSchema = Joi.object().keys(supportedLanguagesObj);
const headingsSchema = Joi.object().keys(supportedLanguagesObj);
const subtitleSchema = Joi.object().keys(supportedLanguagesObj);

const NotificationSchema = Joi.object().keys({
  app_id: Joi.string(),
  app_ids: Joi.array().items(Joi.string()),
  contents: contentSchema,
  headings: headingsSchema,
  subtitle: subtitleSchema,
  data: Joi.object().optional(),
  url: Joi.string().uri().optional(),
  ios_attachments: Joi.object().optional(),
  big_picture: Joi.string().optional(),
  adm_big_picture: Joi.string().optional(),
  chrome_big_picture: Joi.string().optional(),
  buttons: Joi.array().items(buttonSchema).optional(),
  web_buttons: Joi.array().items(webButtonSchema).optional(),
  ios_category: Joi.any().optional(),
  android_background_layout: Joi.object().keys({
    image: Joi.string(),
    headings_color: Joi.string(),
    contents_color: Joi.string(),
  }).optional(),
  small_icon: Joi.string().optional(),
  large_icon: Joi.string().optional(),
  adm_small_icon: Joi.string().optional(),
  adm_large_icon: Joi.string().optional(),
  chrome_web_icon: Joi.string().optional(),
  chrome_web_image: Joi.string().optional(),
  firefox_icon: Joi.string().optional(),
  chrome_icon: Joi.string().optional(),
  ios_sound: Joi.string().optional(),
  android_sound: Joi.string().optional(),
  adm_sound: Joi.string().optional(),
  wp_sound: Joi.string().optional(),
  wp_wns_sound: Joi.string().optional(),
  android_led_color: Joi.string().optional(),
  android_accent_color: Joi.string().optional(),
  android_visibility: Joi.number().integer().valid(1, 0, -1).optional(),
  ios_badgeType: Joi.string().valid('None', 'SetTo', 'Increase').optional(),
  ios_badgeCount: Joi.number().integer().optional(),
  collapse_id: Joi.string().optional(),
  send_after: Joi.string().isoDate().optional(),
  template_id: Joi.string().optional(),
  content_available: Joi.boolean().optional(),
  mutable_content: Joi.boolean().optional(),
  included_segments: Joi.array().items(Joi.string()),
  excluded_segments: Joi.array().items(Joi.string()),
  include_player_ids: Joi.array().items(Joi.string()),
  include_ios_tokens: Joi.array().items(Joi.string()),
  include_wp_urls: Joi.array().items(Joi.string()),
  include_wp_wns_uris: Joi.array().items(Joi.string()),
  include_amazon_reg_ids: Joi.array().items(Joi.string()),
  include_chrome_reg_ids: Joi.array().items(Joi.string()),
  include_chrome_web_reg_ids: Joi.array().items(Joi.string()),
  include_android_reg_ids: Joi.array().items(Joi.string()),
  filters: Joi.array().items(Joi.alternatives().try(filterSchema, operatorSchema)).length(200),
}).required();

module.exports = NotificationSchema;
