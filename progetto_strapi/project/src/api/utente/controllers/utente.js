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
    
    async sendEmail(ctx) {
      const { email } = ctx.request.body;
  
      if (!email) {
        return ctx.badRequest('Email is missing');
      }
  
      try {
  
        await strapi.plugins['email'].services.email.send({
          to: email,
          subject: 'Test Email',
          text: 'This is a test email sent from Strapi',
          html: '<p>This is a test email sent from Strapi</p>',
        });
  
        return ctx.send({ message: 'Email sent successfully' });
      } catch (err) {
        console.error('Failed to send email:', err);
        return ctx.badRequest('Failed to send email', err);
      }
    },

  }),
  
);

