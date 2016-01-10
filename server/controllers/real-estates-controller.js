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

        data.constructionTypes.all()
            .then(function (constructionTypes) {
                    pageData.pageData.constructionTypes = constructionTypes;
                }
            );

        data.realEstateTypes.all()
            .then(function (realEstateTypes) {
                    pageData.pageData.realEstateTypes = realEstateTypes;
                }
            );

        data.locations.all()
            .then(function (locations) {
                    pageData.pageData.locations = locations;
                    res.render('real-estates/real-estate-create', pageData);
                }
            );
    }

    function create(req, res) {
        console.log(req.body);
        data.realEstates
            .create(req.body)
            .then(function(dbResponse) {
                res.redirect('/realestates/' + dbResponse['_id']);
            }, function(err) {
                res.session.error = "Cannot create real estate offer!";
                res.render('realestates/post', {errors: 'Create Offer Failed'});
            });
    }

    function getDetails(req, res) {
        data.realEstates.getById(req.params.id)
            .then(function (realEstate) {
                res.render('real-estates/real-estate-details', {realEstate: realEstate});
            });
    }
    module.exports = {
        getCreate: getCreate,
        create: create,
        getDetails: getDetails
    }
}());