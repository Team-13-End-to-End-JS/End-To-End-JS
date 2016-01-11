(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/post', auth.isInRole('regular'),controllers.realEstates.getCreate)
        .post('/post', auth.isInRole('regular'),controllers.realEstates.create)
        .get('/:id', controllers.realEstates.getDetails)
        .get('/browse', controllers.realEstates.getAll);

    module.exports = function(app) {
        app.use('/realestates', router);
    }
}());