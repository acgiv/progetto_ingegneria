'use strict';

/**
 * utente router
 */


module.exports = {
    routes: [
      {
        method: "GET",
        path: "/utente/findAll",
        handler: "utente.findAll",
      },
      {
        method: "POST",
        path: "/utente/create",
        handler: "utente.create",
      },
      {
        method: "POST",
        path: "/utente/login",
        handler: "utente.login",
      },
      {
        method: 'POST',
        path: '/utente/checkEmail',
        handler: 'utente.checkEmail',
      
        }
    ],
  };
