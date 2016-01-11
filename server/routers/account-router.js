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
        .get('/logout', auth.isAuthenticated, controllers.users.logout)
        .get('/profile', controllers.users.getCurrentUserProfile)
        .get('/profile/:username', controllers.users.getUserProfile);


    module.exports = function(app) {
        app.use('/', router);
    }
}());