(function () {
    'use strict';

    let Location = require('mongoose').model('Location');

    function add(locationName) {
        let promise = new Promise(function(resolve, reject) {
            Location.findOne({}, function(err, collection) {
                if(err) {
                    return reject(err);
                }

                collection.names.push(locationName);
                collection.save();
                resolve(locationName);
            }) ;
        });

        return promise;
    }

    function all() {
        let promise = new Promise(function(resolve, reject) {
            Location.find({}, function(err, collection) {
                if (err) {
                    return reject(err);
                }

                resolve(collection[0].names);
            });
        });

        return promise;
    }

    module.exports = {
        all: all,
        add: add
    };
}());