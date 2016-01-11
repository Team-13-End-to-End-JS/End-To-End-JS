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
                    res.redirect('/login');
                }, function(err) {
                    res.session.error = "A user with that name exists already!";
                    res.render('account/register', {errors: 'Register Failed'});
                });
        },
        login: function(req, res, next) {
            auth.login(req, res, next);
        },
        logout: function(req, res, next) {
            auth.logout(req, res, next);
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
                    console.log(err);
                    res.json(err);
                    res.end();
                });
        },
        all: function(req, res) {
            let options = req.body;

            data.users
                .all(options)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    console.log(err);
                    res.json(err);
                    res.end();
                });
        },
        getCurrentUserProfile: function(req, res) {
            console.log(req.user);
            let user = req.user;

            res.render('account/privateProfile', {data: {
                user: user
            }});
        },
        getUserProfile: function(req,res) {
            let username = req.params['username'];

            data.users
                .getUser(username)
                .then(function(dbResponse) {
                    console.log(dbResponse);
                    res.render('account/profile', {data: {
                        user: dbResponse
                    }});
                }, function(err) {
                    console.log(err);
                    res.locals.errors = err;
                    res.end();
                });
        }
    }
}());