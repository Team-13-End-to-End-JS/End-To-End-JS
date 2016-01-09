(function () {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate');
    let User = require('mongoose').model('User');
    let Location = require('mongoose').model('Location');

    function create(realEstate) {
        let locationName = realEstate.location;
        let newRealEstate = {
            title: realEstate.title,
            description: realEstate.description,
            quadrature: realEstate.quadrature,
            year: realEstate.year
        };

        if(realEstate.salePrice !== '') {
            newRealEstate.salePrice = +realEstate.salePrice;
        } else {
            newRealEstate.rentPrice = +realEstate.rentPrice;
        }

        let locationDb;
        Location.findOne({name: locationName}).exec(function (err, location) {
            if (err) console.log(err);
            else {
                locationDb = location;
            }
        });

        let promise = new Promise(function(resolve, reject) {
            RealEstate.create(newRealEstate, function(err, createdRealEstate) {
                if (err) {
                    return reject(err);
                }

                locationDb.realEstates.push(createdRealEstate);
                resolve(createdRealEstate);
            }) ;
        });

        return promise;
    }

    module.exports = {
        create: create
    };
}());