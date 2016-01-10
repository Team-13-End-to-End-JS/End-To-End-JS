(function() {
    'use strict';

    let router = require('express').Router(),
        controllers = require('../controllers/index');

    router
        .get('/constructions', controllers.constructionTypes.getAll)
        .post('/constructions', controllers.constructionTypes.create);

    module.exports = function(app) {
        app.use('/', router);
    }
}());