(function() {
    'use strict';

    let data = require('../data/data');

    module.exports = {
        getCreate: function(req, res) {
            // TODO:
            // if !req.user
            // res.render(notAuthorized)
            res.render('real-estates/real-estate-create');
        },
        create: function(req, res) {
            data.realEstates
                .create(req.body)
                .then(function(dbResponse) {
                    res.redirect('/offers/' + dbResponse['_id']);
                }, function(err) {
                    res.session.error = "Cannot create real estate offer!";
                    res.render('realestates/post', {errors: 'Create Offer Failed'});
                });
        }
    }
}());