'use strict';

/**
 * chat-support service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::chat-support.chat-support');
