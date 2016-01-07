(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('./auth'),
        controllers = require('../controllers/index');

    router.get('/partials/:partialArea/:partialName', function(req, res) {
            res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
        })
        .post('/register', function(req, res) {
            controllers.users.register(req, res);
        })
        .post('/login', controllers.users.login)
        .post('/logout', controllers.users.logout)
        .get('/*', function(req, res) {
            res.status(404);
            res.end();
        })
        .get('*', function(req, res) {
            res.render('index', {currentUser: req.user});
        });

    module.exports = function(app) {
        app.use('/', router);
    }
}());