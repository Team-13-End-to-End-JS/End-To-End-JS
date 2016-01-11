(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/post', auth.isInRole('regular'),controllers.realEstates.getCreate)
        .post('/post', auth.isInRole('regular'),controllers.realEstates.create)
        .get('/browse', controllers.realEstates.getPublic)
        .post('/browse', controllers.realEstates.postPublic)
        .get('/details/:name/:id', controllers.realEstates.getDetails);

    module.exports = function(app) {
        app.use('/realestates', router);
    }
}());