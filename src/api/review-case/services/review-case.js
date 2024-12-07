'use strict';

/**
 * review-case service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::review-case.review-case');
