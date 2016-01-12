(function() {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate'),
        RealEstateType = require('mongoose').model('RealEstateType'),
        ConstructionType = require('mongoose').model('ConstructionType'),
        stats = {
            stats: {}
        };


    function getStats(req, res) {
        RealEstate.find({offerType: 'forRent'})
            .exec(function (err, realEstates) {
                if(err) { console.log(err); }

                stats.stats.forRent = realEstates.length;

                RealEstate.find({offerType: 'forSale'})
                    .exec(function (err, realEstates) {
                        if(err) { console.log(err); }

                        stats.stats.forSale = realEstates.length;

                        res.render('real-estates/statistics', stats);
                    });

            });
    }

    module.exports = {
        getStats: getStats
    }
}());