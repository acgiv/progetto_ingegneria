'use strict';

/**
 * articolo service
 */

const { createCoreService } = require('@strapi/strapi').factories;


const customRouter = (innerRouter, extraRoutes = []) => {
    let routes;
    return {
      get prefix() {
        return innerRouter.prefix;
      },
      get routes() {
        if (!routes) routes = innerRouter.routes.concat(extraRoutes);
        return routes;
      },
    };
  };

  
const myExtraRoutes = [
    {
        "method": "POST",
        "path":    "/articolo/findTitolo",
        "handler": "articolo.findTitolo",
        "config": {
          "policies": []
        }
      },

  ]

module.exports = customRouter(module.exports, myExtraRoutes);

module.exports = createCoreService('api::articolo.articolo', ({ strapi }) => ({
    async findArticoloByTitle(id){
        let rspost ;
    
        const articolo = await strapi.db.query('api::articolo.articolo').findOne({
          populate: ['stato'],
            where: { 
              id_articolo: id
            }
            });   
            if (articolo) { // Assicurati che 'articolo' non sia null o undefined
              return  articolo;
            } else {
            }
          return rspost;

    },
    async findIdPattern(id){
        try {
            // Esegui la query per trovare l'articolo con l'id specificato
            const articolo = await strapi.query('api::articolo.articolo').findOne({
              populate: ["design_patterns"],
              where: { 
                id_articolo: id 
              }
            });
      
            if (!articolo) {
               return [];
            }
             const designPatternIds = articolo.design_patterns.map(designPattern => designPattern.id);
             return designPatternIds;
        } catch (error) {
          console.error('Si è verificato un errore durante la ricerca degli ID dei design pattern:', error);
          return []; 
        }
         
    }
}));
