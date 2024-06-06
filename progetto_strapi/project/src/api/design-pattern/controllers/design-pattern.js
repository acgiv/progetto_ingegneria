'use strict';

/**
 * design-pattern controller
 */

const { createCoreController } = require('@strapi/strapi').factories;



module.exports = createCoreController('api::design-pattern.design-pattern',
({ strapi }) => ({
   async findAll(ctx) {
     try {
    let pattern = [];
     const entries = await strapi.db.query('api::design-pattern.design-pattern').findMany({
      populate: ["mvcs","stato", "articolos","iso_92_4210s","strategias", "vulnerabilitas", "principi_pbds", "categoria_owasps"], 
    });
  
    if (entries && entries.length > 0) {
        for(let i=0; i< entries.length; i++){
          pattern.push({
            id_pattern: entries[i].id_pattern,
            descrizione: entries[i].descrizione,
            titolo: entries[i].titolo,
            contesto: entries[i].contesto,
            esempio: entries[i].esempio,
            stato: {id: entries[i].id, id_stato: entries[i].stato.id_stato, nome: entries[i].stato.nome},
            iso_92_4210: entries[i].iso_92_4210s,
            strategia: entries[i].strategias,
            vulerabilita:  entries[i].vulnerabilitas,
            principi_pbd:  entries[i].principi_pbds,
            mvc: entries[i].mvcs,
            articoli: entries[i].articolos,
            categoria_owasps:  entries[i].categoria_owasps,
          });
        }
        
      } else {
          return 'Pattern non trovato';
      }
     return  pattern;
     }catch (err) {
       ctx.throw(500, 'Internal server error');
     }
   },

   async findTitolo(ctx) {
   
    const { idArticolo } = ctx.request.body;
    const result = await strapi.service('api::design-pattern.design-pattern').findArticoloByTitle(idArticolo);
      // Restituisci il risultato
      return result;

  },

  async ricerca(ctx) {
    const { nome, filtro } = ctx.request.body;
    const result = await strapi.service('api::design-pattern.design-pattern').ricerca(nome, filtro);
      return result;
  },

 }),
 
);