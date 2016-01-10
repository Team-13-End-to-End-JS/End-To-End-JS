(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/content', controllers.admin.getContentControl)
        .get('/pending', controllers.admin.getPendingPosts)
        .put('/pending/:id', controllers.admin.updatePendingPost)
        .get('/posts', controllers.admin.getAllPosts)
        .put('/posts/:id', controllers.admin.removePost)
        .get('/users', controllers.admin.getAllUsers)
        .post('/users/:id', controllers.admin.promoteUser)
        .put('/users/:id', controllers.admin.demoteUser);

    module.exports = function(app) {
        app.all('/admin/*', auth.isInRole('admin'));
        app.use('/admin', router);
    }
}());