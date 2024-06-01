'use strict';

/**
 * design-pattern router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::design-pattern.design-pattern');
