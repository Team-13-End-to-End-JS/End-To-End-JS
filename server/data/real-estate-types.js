(function () {
    'use strict';

    let RealEstateType = require('mongoose').model('RealEstateType');

    function create(realEstateType) {
        let newRealEstateType = {
            name: realEstateType.name
        };

        let promise = new Promise(function(resolve, reject) {
            RealEstateType.create(newRealEstateType, function(err, createdRealEstateType) {
                if (err) {
                    return reject(err);
                }

                resolve(createdRealEstateType);
            }) ;
        });

        return promise;
    }

    function getAll() {
        let promise = new Promise(function(resolve, reject) {
            RealEstateType.find({}, function(err, realEstateTypes) {
                if (err) {
                    return reject(err);
                }

                resolve(realEstateTypes);
            });
        });

        return promise;
    }

    module.exports = {
        create: create,
        getAll: getAll
    };
}());