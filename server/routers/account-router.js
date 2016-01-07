(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router.get('/partials/:partialArea/:partialName', function(req, res) {
            res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
        })
        .post('/register', controllers.users.register)
        .post('/login', controllers.users.login)
        .post('/logout', controllers.users.logout);

    module.exports = function(app) {
        app.use('/', router);
    }
}());