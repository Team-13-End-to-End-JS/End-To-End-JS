(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/pending', auth.isInRole('admin'), controllers.admin.getPendingPosts)
        .put('/pending/:id', auth.isInRole('admin'), controllers.admin.updatePendingPost)
        .get('/posts', auth.isInRole('admin'), controllers.admin.getAllPosts)
        .put('/posts/:id', auth.isInRole('admin'), controllers.admin.removePost)
        .get('/users', auth.isInRole('admin'), controllers.admin.getAllUsers)
        .post('/users/:id', auth.isInRole('admin'), controllers.admin.promoteUser)
        .put('/users/:id', auth.isInRole('admin'), controllers.admin.demoteUser);

    module.exports = function(app) {
        app.use('/admin', router);
    }
}());