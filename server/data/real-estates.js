(function () {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate');
    let User = require('mongoose').model('User');

    function create(realEstate) {

        let newRealEstate = {
            title: realEstate.title,
            description: realEstate.description,
            quadrature: +realEstate.quadrature,
            year: +realEstate.year,
            location: realEstate.location,
            constructionType: realEstate.constructionType,
            realEstateType: realEstate.realEstateType
        };

        if(realEstate.salePrice !== '') {
            newRealEstate.salePrice = +realEstate.salePrice;
        }

        if(realEstate.rentPrice !== '') {
            newRealEstate.rentPrice = +realEstate.rentPrice;
        }

        return RealEstate.create(newRealEstate, function(err, createdRealEstate) {
            if (err) {
                console.log(err);
            }

            createdRealEstate.save();
        }) ;
    }

    function getById(id) {
       let promise = new Promise(function(resolve, reject) {
           RealEstate.findById(id, function(err, realEstate) {
                if (err) {
                    return reject(err);
                }

                resolve(realEstate);
            });
        });

        return promise;
    }

    module.exports = {
        create: create,
        getById: getById
    };
}());