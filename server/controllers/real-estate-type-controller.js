(function() {
    'use strict';

    let data = require('../data/data');

    function all(req, res) {
        data.realEstateTypes
            .getAll()
            .then(function(dbResponse) {
                res.render('real-estates/real-estate-types');
                res.json(dbResponse);
            }, function(err) {
                res.json(err);
            });
    }

    function create(req, res) {
        data.realEstateTypes
            .create(req.body)
            .then(function(dbResponse) {
                res.redirect('/realestates/real-estate-types');
            }, function(err) {
                res.session.error = "Cannot create real estate type!";
                res.render('real-estates/types', {errors: 'Create Real Estate Type Failed'});
            });
    }

    module.exports = {
        all: all,
        create: create
    }
}());