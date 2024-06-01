'use strict';

/**
 * design-pattern service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::design-pattern.design-pattern');
