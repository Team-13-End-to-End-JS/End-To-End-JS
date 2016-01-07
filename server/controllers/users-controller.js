(function() {
    'use strict';

    let data = require('../data/data');
    let auth = require('../config/auth');

    module.exports = {
        getRegister: function(req, res) {
            if (req.user) {
                res.redirect('/');
            }
            else {
                res.render('account/register');
            }
        },
        getLogin: function(req, res) {
            if (req.user) {
                res.redirect('/');
            }
            else {
                res.render('account/login');
            }
        },
        register: function(req, res) {
            data.users
                .create(req.body)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        },
        login: function(req, res, next) {
            return auth.login(req, res, next);
        },
        logout: function(req, res, next) {
            return auth.logout(req, res, next);
        },
        promote: function(req, res) {
            let userId = req.body.userId;
            let role = req.body.toRole;

            data.users
                .promote(userId, role)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        },
        demote: function(req, res) {
            let userId = req.body.userId;
            let role = req.body.fromRole;

            data.users
                .demote(userId, role)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        },
        all: function(req, res) {
            let options = req.body;

            data.users
                .all(options)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        }
    }
}());