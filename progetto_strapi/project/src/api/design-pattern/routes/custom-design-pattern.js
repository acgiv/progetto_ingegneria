'use strict';

/**
 * utente router
 */


module.exports = {
    routes: [
      {
        method: "GET",
        path: "/pattern/findAll",
        handler: "design-pattern.findAll",
      },
      {
        method: "POST",
        path: "/pattern/ricerca",
        handler: "design-pattern.ricerca",
      },
    ],
  };
