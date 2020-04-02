'use strict';
const express = require('express');
const AppController = require('../controllers/AppController');

const Routes = {
  init: function(app){


    const api = express.Router(); 
    app.use('/api', api);

    // Root file routes
    app.get('/', AppController.index);
    
    // Catch-all
    app.get('*', AppController.index); 
  }
};

module.exports = Routes;