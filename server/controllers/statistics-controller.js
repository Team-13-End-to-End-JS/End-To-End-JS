(function() {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate'),
        RealEstateType = require('mongoose').model('RealEstateType'),
        ConstructionType = require('mongoose').model('ConstructionType');



    function getStats(req, res) {
        let stats = {
            offerTypes: {
                'For Sale': 0,
                'For Rent': 0
            },
            realEstateTypes: {},
            constructionTypes: {}
        },
            realEstateTypes,
            constructionTypes,
            helper = false;

        RealEstateType.find({}).exec(function (err, collection) {
            if(err) {
                console.log(err);
            }

            realEstateTypes = collection[0].types;

            ConstructionType.find({}).exec(function (err, collection) {
                if(err) {
                    console.log(err);
                }

                constructionTypes = collection[0].types;

                RealEstate.find({}).exec(function (err, realEstates) {
                    if(err) {
                        console.log(err);
                    }

                    if (!helper) {
                        for (var i = 0; i < realEstates.length; i++) {
                            var realEstate = realEstates[i];

                            if(realEstate.offerType === 'forSale') {
                                stats.offerTypes['For Rent']++;
                            }

                            if(realEstate.offerType === 'forRent') {
                                stats.offerTypes['For Sale']++;
                            }

                            if(stats.realEstateTypes[realEstate.realEstateType] === undefined) {
                                stats.realEstateTypes[realEstate.realEstateType] = 1;
                            } else {
                                stats.realEstateTypes[realEstate.realEstateType]++;
                            }

                            if(stats.constructionTypes[realEstate.constructionType] === undefined) {
                                stats.constructionTypes[realEstate.constructionType] = 1;
                            } else {
                                stats.constructionTypes[realEstate.constructionType]++;
                            }
                        }

                        helper = true;
                    }

                    res.send(stats);
                    res.end();
                });
            });
        });
    }

    module.exports = {
        getStats: getStats
    }
}());