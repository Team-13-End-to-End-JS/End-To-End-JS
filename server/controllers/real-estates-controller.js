(function() {
    'use strict';

    let data = require('../data/data');

    function getCreate(req, res) {
        // TODO:
        // if !req.user
        // res.render(notAuthorized)

        var pageData = {
            pageData: {}
        };

        data.constructionTypes.getAll()
            .then(function (types) {
                    pageData.pageData.constructionTypes= types;
                }
            );

        data.realEstateTypes.getAll()
            .then(function (types) {
                    pageData.pageData.realEstateTypes= types;
                }
            );

        data.locations.getAll()
            .then(function (locations) {
                    pageData.pageData.locations= locations;
                    res.render('real-estates/real-estate-create', pageData);
                }
            );
    }

    function create(req, res) {
        data.realEstates
            .create(req.body)
            .then(function(dbResponse) {
                console.log(dbResponse);
                
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