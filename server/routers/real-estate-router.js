(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/realestates/post', controllers.realEstates.getCreate)
        .post('/realestates/post', controllers.realEstates.create);

    module.exports = function(app) {
        app.use('/', router);
    }
}());