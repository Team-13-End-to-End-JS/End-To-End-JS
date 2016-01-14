(function() {
    'use strict';

    let router = require('express').Router(),
        auth = require('../config/auth'),
        controllers = require('../controllers/index')(require('../data/data')),
        multer = require('multer'),
        uuid = require('uuid');

    let storage = multer.diskStorage({
        destination: './public/images',
        filename: function(req, file, cb) {
            let ext = file.originalname.split('.')
                .pop();
            cb(null, file.fieldname + '-' + Date.now() + '-' + uuid.v1() + '.' + ext);
        }
    });

    let upload = multer({
        storage: storage
    });

    router
        .get('/post', auth.isInRole('regular'),controllers.realEstates.getCreate)
        .post('/post', auth.isInRole('regular'), upload.single('image-file'), controllers.realEstates.create)
        .get('/browse', controllers.realEstates.getPublic)
        .post('/browse', controllers.realEstates.postPublic)
        .get('/details/:name/:id', controllers.realEstates.getDetails);

    module.exports = function(app) {
        app.use('/realestates', router);
    }
}());