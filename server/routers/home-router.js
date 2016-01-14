(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router.get('/partials/:partialArea/:partialName', function(req, res) {
            res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
        })
        .get('/', controllers.realEstates.getTop)
        .get('/about', controllers.pages.getAboutUsPage)
        .get('/unathorized', function(req, res) {
            res.status(401);
            res.render('shared/unathorized');
        })
        .get('/*', function(req, res) {
            res.status(404);
            res.render('shared/404');
        });

    module.exports = function(app) {
        app.use('/', router);
    }
}());