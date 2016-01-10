(function() {
    'use strict';

    let router = require('express').Router(),
        controllers = require('../controllers/index');

    router
        .get('/types', controllers.realEstateTypes.all)
        .post('/types', controllers.realEstateTypes.create);

    module.exports = function(app) {
        app.use('/', router);
    }
}());