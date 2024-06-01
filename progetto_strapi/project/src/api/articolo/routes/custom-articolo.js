'use strict';

/**
 * utente router
 */


module.exports = {
    routes: [
      {
        method: "GET",
        path: "/articolo/findAll",
        handler: "articolo.findAll",
      },
      {
        method: "POST",
        path: "/articolo/findTitolo",
        handler: "articolo.findTitolo",
      }, 
    ],
  };
