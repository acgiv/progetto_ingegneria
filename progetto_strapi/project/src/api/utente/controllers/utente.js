'use strict';



const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::utente.utente',
 ({ strapi }) => ({
    
    async findAll(ctx) {
      try {
      const entries = await strapi.db.query("api::utente.utente").findMany();
      return entries;
      }catch (err) {
        ctx.throw(500, 'Internal server error');
      }
    },

    async create(ctx) {
      const { utenteData, specificData } = ctx.request.body;
      // Chiamata al metodo del service dell'utente per creare utente e entità correlate
      const result = await strapi.service('api::utente.utente').createUtenteAndEntity(utenteData, specificData);
      // Restituisci il risultato
      return result;
    },

    async login(ctx) {
      const {username, password} = ctx.request.body;
      const entries = await strapi.service("api::utente.utente").login(ctx, username, password);
      return entries;
    },

  }),
  
);

