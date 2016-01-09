(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/register', controllers.users.getRegister)
        .post('/register', controllers.users.register)
        .get('/login', controllers.users.getLogin)
        .post('/login', controllers.users.login)
        .post('/logout', auth.isAuthenticated, controllers.users.logout);

    module.exports = function(app) {
        app.use('/', router);
    }
}());