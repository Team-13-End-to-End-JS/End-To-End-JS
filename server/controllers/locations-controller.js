(function() {
    'use strict';

    let data = require('../data/data');

    module.exports = {
        all: function(req, res) {
            data.locations
                .getAll()
                .then(function(dbResponse) {
                    res.render('real-estates/locations');
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        },
        create: function(req, res) {
            data.locations
                .create(req.body)
                .then(function(dbResponse) {
                    res.redirect('/locations');
                }, function(err) {
                    res.session.error = "Cannot create location!";
                    res.render('real-estates/locations', {errors: 'Create Location Failed'});
                });
        }
    }
}());