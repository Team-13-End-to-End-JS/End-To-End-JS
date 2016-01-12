(function() {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate'),
        stats = {};


    function getStats(req, res) {
        RealEstate.find({offerType: 'forRent'})
            .exec(function (err, realEstates) {
                if(err) { console.log(err); }

                stats.forRent = realEstates.length;

                RealEstate.find({offerType: 'forSale'})
                    .exec(function (err, realEstates) {
                        if(err) { console.log(err); }

                        stats.forSale = realEstates.length;

                        res.send({stats: stats});
                        res.end();
                    });

            });
    }

    module.exports = {
        getStats: getStats
    }
}());