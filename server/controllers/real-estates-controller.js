(function() {
    'use strict';

    let data = require('../data/data');

    function getCreate(req, res) {
        // TODO:
        // if !req.user
        // res.render(notAuthorized)

        data.locations.getAll()
            .then(function (locations) {
                var pageData = {
                    pageData: {
                        // TODO: get other types from database
                        locations: locations,
                        constructionTypes: ['Brik', 'Panel', 'Other'],
                        realEstateTypes: ['2-rooms', '3-rooms', 'Office']
                    }
                };

                res.render('real-estates/real-estate-create', pageData);
            });
    }

    function create(req, res) {
        data.realEstates
            .create(req.body)
            .then(function(dbResponse) {
                res.redirect('/realestates/' + dbResponse['_id']);
            }, function(err) {
                res.session.error = "Cannot create real estate offer!";
                res.render('realestates/post', {errors: 'Create Offer Failed'});
            });
    }

    module.exports = {
        getCreate: getCreate,
        create: create
    }
}());