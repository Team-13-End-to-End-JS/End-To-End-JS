(function() {
    'use strict';

    let router = require('express').Router(),
        controllers = require('../controllers/index');

    router
        .get('/locations', controllers.locations.all);

    module.exports = function(app) {
        app.use('/', router);
    }
}());