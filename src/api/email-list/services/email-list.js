'use strict';

/**
 * email-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email-list.email-list');
