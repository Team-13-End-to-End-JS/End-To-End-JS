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
                    console.log(err);
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
            let user = req.user;
            let pageSize = 10;
            let page = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;

            data.realEstates.getByUser(user._id)
                .then(function(dbResponse) {
                    let posts = dbResponse.slice((page-1)*pageSize, page*pageSize);

                    res.render('profile/privateProfile', {data: {
                        user: user,
                        posts: posts,
                        page: page
                    }});
                }, function(err) {
                    res.locals.errors = err;
                    res.end();
                });
        },
        getUserProfile: function(req,res) {
            let username = req.params['username'];
            let pageSize = 10;
            let page = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;

            data.users
                .getUser(username)
                .then(function(dbResponseUser) {
                    if (!dbResponseUser) {
                        res.render('shared/404');
                    }

                    data.realEstates.getByUser(dbResponseUser._id)
                        .then(function(dbResponsePosts) {
                            let posts = dbResponsePosts.slice((page-1)*pageSize, page*pageSize);

                            res.render('profile/profile', {data: {
                                user: dbResponseUser,
                                posts: posts,
                                page: page
                            }});
                        }, function(err) {
                            res.render('profile/profile', {data: {
                                user: dbResponseUser,
                                posts: {},
                                page: page
                            }});
                        });

                }, function(err) {
                    console.log(err);
                    res.locals.errors = err;
                    res.end();
                });
        },
        changeProfileInformation: function(req, res) {
            let user = req.body;

            data.users
                .updateUser(user)
                .then(function(dbResponse) {
                    res.status(200);
                    res.send("OK");
                }, function(err) {
                    console.log(err);
                    res.locals.errors = err;
                    res.end();
                });
        }
    }
}());