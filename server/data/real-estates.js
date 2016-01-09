(function () {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate');
    let User = require('mongoose').model('User');

    function create(realEstate) {
        let newRealEstate = {
            title: realEstate.title,
            description: realEstate.description,
            sellPrice: realEstate.sellPrice,
            quadrature: realEstate.quadrature,
            year: realEstate.year
        };

        let promise = new Promise(function (resolve, reject) {
            RealEstate.create(newRealEstate, function (err, createdRealEstate) {
                if (err) {
                    return reject(err);
                }

                resolve(createdRealEstate);
            });
        });

        return promise;
    }

    module.exports = {
        create: create
    };
}());