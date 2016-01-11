(function() {
    'use strict';

    let data = require('../data/data');

    function getCreate(req, res) {
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
        req.body.createdOn = new Date();

        data.realEstates
            .create(req.body)
            .then(function(dbResponse) {
                res.redirect('/realestates/details/' + dbResponse['title'] + '/' + dbResponse['_id']);
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

    function getPublic(req, res) {
        var pageData = {
            pageData: {}
        };

        data.constructionTypes.all()
            .then(function (constructionTypes) {
                    pageData.constructionTypes = constructionTypes;
                }
            );

        data.realEstateTypes.all()
            .then(function (realEstateTypes) {
                    pageData.realEstateTypes = realEstateTypes;
                }
            );

        data.locations.all()
            .then(function (locations) {
                    pageData.locations = locations;

                    data.realEstates.getPublic(req.query)
                        .then(function (dbResponse) {

                            if (dbResponse.length === 0) {
                                res.render('real-estates/real-estates-browse', {pageData: {
                                    common: pageData
                                }});
                            } else {
                                res.render('real-estates/real-estates-browse', {pageData: {
                                    common: pageData,
                                    realEstates: dbResponse}});
                            }
                        });
                }
            );
    }

    function postPublic(req, res) {
        var pageData = {
            pageData: {}
        };

        data.constructionTypes.all()
            .then(function (constructionTypes) {
                    pageData.constructionTypes = constructionTypes;
                }
            );

        data.realEstateTypes.all()
            .then(function (realEstateTypes) {
                    pageData.realEstateTypes = realEstateTypes;
                }
            );

        data.locations.all()
            .then(function (locations) {
                    pageData.locations = locations;

                data.realEstates.getPublic(req.body)
                    .then(function (dbResponse) {

                        if (dbResponse.length === 0) {
                            res.render('real-estates/real-estates-browse', {pageData: {
                                common: pageData
                            }});
                        } else {
                            res.render('real-estates/real-estates-browse', {pageData: {
                                common: pageData,
                                realEstates: dbResponse}});
                        }
                    });
                }
            );
    }

    function getAll(req, res) {

    }

    module.exports = {
        getCreate: getCreate,
        create: create,
        getDetails: getDetails,
        getAll: getAll,
        getPublic: getPublic,
        postPublic: postPublic
    }
}());