(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index');

    router
        .get('/content', controllers.admin.getContentControl)
        .post('/content/locations/:location', controllers.admin.removeLocationContentControl)
        .post('/content/types/:type', controllers.admin.removeTypeContentControl)
        .post('/content/construction/:constrId', controllers.admin.removeConstructionContentControl)
        .post('/content/construction', controllers.admin.addConstructionContent)
        .post('/content/locations', controllers.admin.addLocationContent)
        .post('/content/types', controllers.admin.addTypeContent)
        .post('/content/aboutUs', controllers.admin.editAboutUsPage)
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