(function () {
    'use strict';

    let Location = require('mongoose').model('Location');

    function create(location, callback) {
        Location.create(location, callback);
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