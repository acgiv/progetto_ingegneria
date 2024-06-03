'use strict';

/**
 * articolo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::articolo.articolo',
({ strapi }) => ({
   
   async findAll(ctx) {
     try {
    let articoli =  [];
     const entries = await strapi.db.query('api::articolo.articolo').findMany({
      populate: ['stato'], // Popola la relazione 'stato'
    });

     if (entries && entries.length > 0) { // Assicurati che 'articolo' non sia null o undefined
      for(let i=0; i< entries.length; i++){
        articoli.push(entries[i]);}
      
    } else {
        return 'Articolo non trovato';
    }

     return articoli;
     }catch (err) {
       ctx.throw(500, 'Internal server error');
     }
   },

   async findTitolo(ctx) {
   
    const { idArticolo } = ctx.request.body;
    const result = await strapi.service('api::articolo.articolo').findArticoloByTitle(idArticolo);
      // Restituisci il risultato
      return result;

  },

 }),
 
);