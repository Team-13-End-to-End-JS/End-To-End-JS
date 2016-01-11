(function () {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate');
    let User = require('mongoose').model('User');

    function create(realEstate) {

        let newRealEstate = {
            title: realEstate.title,
            description: realEstate.description,
            offerType: realEstate.offerType,
            price: +realEstate.price,
            quadrature: +realEstate.quadrature,
            year: +realEstate.year,
            location: realEstate.location,
            constructionType: realEstate.constructionType,
            realEstateType: realEstate.realEstateType,
            createdOn: realEstate.createdOn
        };
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
                    reject(err);
                }

                resolve(realEstate);
            });
        });

        return promise;
    }

    function getPendingApproval() {

    }

    function getPublic(options) {
        //if (options) {
        //    options.isApproved= true;
        //} else {
        //    options = {isApproved: true};
        //}

        var from = 0, to = Number.MAX_VALUE;

        if(Object.keys(options).length !== 0) {
            if (options.priceFrom !== '') {
                from = +options.priceFrom;
            } else {
                from = 0;
            }
            delete options.priceFrom;

            if (options.priceTo !== '') {
                to = +options.priceTo;
            } else {
                to = Number.MAX_VALUE;
            }
            delete options.priceTo;

            if (options.title === '') {
                delete options.title;
            }
            console.log(options);

        }

        // TODO: when admin part is ready to approove: find real estates by oprions
        let promise = new Promise(function(resolve, reject) {
            RealEstate
                .find(options)
                .sort('-createdOn')
                .where('price').gt(from).lt(to)
                .exec(function(err, realEstates) {
                    if (err) {
                        reject(err);
                    }

                    resolve(realEstates);
            });
        });

        return promise;
    }

    function getAll() {
    }

    module.exports = {
        create: create,
        getById: getById,
        getPublic: getPublic,
        getPendingApproval: getPendingApproval,
        getAll: getAll
    };
}());