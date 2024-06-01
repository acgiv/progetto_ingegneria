'use strict';

/**
 * utente service
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
      "path": "/utente/login",
      "handler": "utente.login",
      "config": {
        "policies": []
      }
    },
    {
      "method": "POST",
      "path": "/utente/create",
      "handler": "utente.create",
      "config": {
        "policies": []
      }
    },

  ]

  module.exports = customRouter(module.exports, myExtraRoutes);


  module.exports = createCoreService('api::utente.utente', ({ strapi }) => ({
      
    async createUtenteAndEntity(utenteData, specificData) {
        try {
          const ut = utenteData;
          let existingUtente = await this.isExistUsernameOrEmail(ut.username, ut.email);
            if (existingUtente.error.number_error !==0 ) {
              throw new Error(JSON.stringify(existingUtente));
            }
    
            const utente =  await strapi.db.query("api::utente.utente").create({
              data: { 
              username: ut.username,
              email: ut.email,
              password: ut.password,
              ruolo: ut.ruolo
            }
            });
    
      
          let specificEntity;
          if (ut.ruolo === 'azienda') {
           
            const sp= specificData;
      
            specificEntity = await strapi.db.query("api::azienda.azienda").create({
              data: { 
              nome: sp.nome,
              partita_iva: sp.partita_iva,
              utente: utente.id
              }
            });
      
            await strapi.db.query("api::utente.utente").update({
              where: { id: utente.id },
              data: { azienda: specificEntity.id }
            });
          } else if (ut.ruolo === 'sviluppatore') {
            specificEntity = await  strapi.db.query("api::sviluppatore.sviluppatore").create({
              data: {
              utente: utente.id
              }
            });
            await strapi.db.query("api::utente.utente").update({
              where: { id: utente.id },
              data: { sviluppatore: specificEntity.id }
            });
          }
      
          return { error : null, completed: true };
        } catch (error) {
            const existingUtente = JSON.parse(error.message);
            console.log("prima "+existingUtente.error.number_error);
            existingUtente.completed = false;
            console.log("dopo "+ JSON.stringify(existingUtente));
            return JSON.stringify(existingUtente);
        }
      },

      async isExistUsernameOrEmail(username, email){
        let error ={
          number_error :0, 
          message: []
         }  
        const existusername = await strapi.db.query('api::utente.utente').findOne({
          where: {
             username: { $eq: username } ,
          },
        });
        const existemail = await strapi.db.query('api::utente.utente').findOne({
          where: {
             email: { $eq: email } ,
          },
        });

         if (existusername) {
             error.number_error += 1; 
             error.message.push({"username": 'Username già in uso'});
          }
          if (existemail) {
            error.number_error += 1;
            error.message.push({"email": 'Email già in uso'});
         }
          return {error: error};
        },

        async login(ctx, username, password) {
          const utente = await strapi.db.query('api::utente.utente').findOne({
            where: { 
              username: { $eq: username } 
            }
          });
          if (!utente || password !== utente.password) {
            return { id: null, ruolo: null, error: true,  email: null};
          }
          return { id: utente.id, ruolo: utente.ruolo, error: false, email: utente.email};
      },
        
    }
  ));



