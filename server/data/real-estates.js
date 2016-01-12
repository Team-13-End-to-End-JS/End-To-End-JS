(function () {
    'use strict';
    let RealEstate = require('mongoose').model('RealEstate');
    let User = require('mongoose').model('User');

    function create(realEstate) {
        let newRealEstate = {
            _user: realEstate['_user'],
            title: realEstate.title,
            description: realEstate.description,
            offerType: realEstate.offerType,
            price: +realEstate.price,
            quadrature: +realEstate.quadrature,
            year: +realEstate.year,
            url: realEstate.url,
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

    function getForSaleCount() {
        return RealEstate.find({offerType: 'foSale'});

    }

    function getForRentCount() {
            return RealEstate.find({offerType: 'forRent'});
    }

    function getPublic(options) {

        var from = 0, to = Number.MAX_VALUE;

        if(Object.keys(options).length !== 0) {
            if (options.priceFrom !== '') {
                from = +options.priceFrom - 1;
            } else {
                from = 0;
            }
            delete options.priceFrom;

            if (options.priceTo !== '') {
                to = +options.priceTo + 1;
            } else {
                to = Number.MAX_VALUE;
            }
            delete options.priceTo;

            if (options.title === '') {
                delete options.title;
            }

        }

        if(!options.location) {
            delete options.location;
        }

        if(!options.realEstateType) {
            delete options.realEstateType;
        }

        if(!options.constructionType) {
            delete options.constructionType;
        }

        if(!options.offerType) {
            delete options.offerType;
        }

        console.log(options);
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
        getForSaleCount: getForSaleCount,
        getForRentCount: getForRentCount,
        getById: getById,
        getPublic: getPublic,
        getPendingApproval: getPendingApproval,
        getAll: getAll
    };
}());