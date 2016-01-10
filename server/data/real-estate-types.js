(function () {
    'use strict';

    let RealEstateType = require('mongoose').model('RealEstateType');

    function add(realEstateTypeName) {
        let promise = new Promise(function(resolve, reject) {
            RealEstateType.findOne({}, function(err, collection) {
                if(err) {
                    return reject(err);
                }

                collection.types.push(realEstateTypeName);
                collection.save();
                resolve(realEstateTypeName);
            }) ;
        });

        return promise;
    }

    function all() {
        let promise = new Promise(function(resolve, reject) {
            RealEstateType.find({}, function(err, collection) {
                if (err) {
                    return reject(err);
                }

                resolve(collection[0].types);
            });
        });

        return promise;
    }

    module.exports = {
        add: add,
        all: all
    };
}());