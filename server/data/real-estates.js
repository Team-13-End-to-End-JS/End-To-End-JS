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
                reject(err);
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
        let promise = new Promise(function(resolve, reject) {
            RealEstate.find({isApproved: false})
                .populate('_user')
                .exec(function(err, realEstates) {
                if (err) {
                    reject(err);
                }

                resolve(realEstates);
            });
        });

        return promise;
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
                .populate('_user')
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

    function update(post) {
        let promise = new Promise(function(resolve, reject) {
            RealEstate
                .findOne({_id: post._id}, function(err, realEstate) {
                    if (err) {
                        return reject(err);
                    }

                    realEstate.price = post.price;
                    realEstate.title = post.title;
                    realEstate.description = post.description;

                    realEstate.save(function(dbErr) {
                        if (dbErr) {
                            return reject(dbErr);
                        }

                        resolve(realEstate);
                    });
                });
        });

        return promise;
    }

    function approvePost(id) {
        let promise = new Promise(function(resolve, reject) {
            RealEstate
                .findOne({_id: id}, function(err, realEstate) {
                    if (err) {
                        return reject(err);
                    }
                    console.log(id);
                    realEstate.isApproved = true;

                    realEstate.save(function(dbErr) {
                        if (dbErr) {
                            return reject(dbErr);
                        }

                        resolve(realEstate);
                    });
                });
        });

        return promise;
    }

    function remove(id) {
        let promise = new Promise(function(resolve, reject) {
            RealEstate
                .findOne({_id: id}, function(err, realEstate) {
                    if (err) {
                        return reject(err);
                    }

                    realEstate.remove(function(dbErr) {
                        if (dbErr) {
                            return reject(dbErr);
                        }

                        resolve(realEstate);
                    });
                });
        });

        return promise;
    }

    module.exports = {
        create: create,
        updatePost: update,
        removePost: remove,
        approvePost: approvePost,
        getForSaleCount: getForSaleCount,
        getForRentCount: getForRentCount,
        getById: getById,
        getPublic: getPublic,
        getPendingApproval: getPendingApproval,
        getAll: getAll
    };
}());