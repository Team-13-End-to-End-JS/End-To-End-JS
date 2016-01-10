(function () {
    'use strict';

    let ConstructionTypes = require('mongoose').model('ConstructionType');

    function create(constructionType) {
        let newConstructionType = {
            name: constructionType.name
        };

        let promise = new Promise(function(resolve, reject) {
            ConstructionTypes.create(newConstructionType, function(err, createdConstructionType) {
                if (err) {
                    return reject(err);
                }

                resolve(createdConstructionType);
            }) ;
        });

        return promise;
    }

    function getAll() {
        let promise = new Promise(function(resolve, reject) {
            ConstructionTypes.find({}, function(err, constructionTypes) {
                if (err) {
                    return reject(err);
                }

                resolve(constructionTypes);
            });
        });

        return promise;
    }

    module.exports = {
        create: create,
        getAll: getAll
    };
}());