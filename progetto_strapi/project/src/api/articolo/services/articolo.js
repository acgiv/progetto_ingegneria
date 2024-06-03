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
}));
