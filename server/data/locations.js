(function () {
    'use strict';

    let Location = require('mongoose').model('Location');

    function create(location) {
        let newLocation = {
            name: location.name
        };

        console.log(location);
        let promise = new Promise(function(resolve, reject) {
            Location.create(newLocation, function(err, createdLocation) {
                if (err) {
                    return reject(err);
                }

                resolve(createdLocation);
            }) ;
        });

        return promise;
    }

    function getAll() {
        let promise = new Promise(function(resolve, reject) {
            Location.find({}, function(err, locations) {
                if (err) {
                    return reject(err);
                }

                resolve(locations);
            });
        });

        return promise;
    }

    module.exports = {
        create: create,
        getAll: getAll
    };
}());