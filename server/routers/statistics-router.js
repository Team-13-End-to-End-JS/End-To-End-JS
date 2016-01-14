(function() {
    'use strict';

    let router = require('express').Router(),
        controllers = require('../controllers/index')(require('../data/data'));

    router
        .get('/statistics', controllers.statistics.getStats);

    module.exports = function(app) {
        app.use('/', router);
    }
}());