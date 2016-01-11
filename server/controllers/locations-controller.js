(function() {
    'use strict';

    let data = require('../data/data');

    function all(req, res) {
        data.locations
            .getAll()
            .then(function(dbResponse) {
                res.render('real-estates/locations');
                res.json(dbResponse);
            }, function(err) {
                res.json(err);
            });
    }

    function create(req, res) {
        data.locations
            .create(req.body)
            .then(function(dbResponse) {
                res.redirect('/locations');
            }, function(err) {
                res.session.error = "Cannot create location!";
                res.render('real-estates/locations', {errors: 'Create Location Failed'});
            });
    }

    module.exports = {
        all: all,
        create: create
    }
}());