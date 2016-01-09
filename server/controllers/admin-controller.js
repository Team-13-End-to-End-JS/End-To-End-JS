(function() {
    'use strict';

    let data = require('../data/data');
    let auth = require('../config/auth');

    module.exports = {
        getPendingPosts: function(req, res) {
            res.render('admin/pending');
        },
        updatePendingPost: function(req, res) {
            res.status(404);
        },
        getAllPosts: function(req, res) {
            res.render('admin/posts');
        },
        removePost: function(req, res) {
            res.status(404);
        },
        getAllUsers: function(req, res) {
            let options = {};

            data.users
                .getAll(options)
                .then(function(dbResponse) {

                    // TODO: remove
                    console.log(dbResponse);

                    res.render('admin/users', {users: dbResponse})
                }, function(err) {
                    res.json(err);
                });
        },
        promoteUser: function(req, res) {
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
        demoteUser: function(req, res) {
            let userId = req.body.userId;
            let role = req.body.fromRole;

            data.users
                .demote(userId, role)
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        }
    }
}());