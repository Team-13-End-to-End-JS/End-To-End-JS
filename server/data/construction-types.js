(function () {
    'use strict';

    let ConstructionType = require('mongoose').model('ConstructionType');

    function add(constructionTypeName) {
        let promise = new Promise(function(resolve, reject) {
            ConstructionType.findOne({}, function(err, collection) {
                if(err) {
                    return reject(err);
                }

                collection.types.push(constructionTypeName);
                collection.save();
                resolve(constructionTypeName);
            }) ;
        });

        return promise;
    }

    function all() {
        let promise = new Promise(function(resolve, reject) {
            ConstructionType.find({}, function(err, collection) {
                if (err) {
                    return reject(err);
                }

                resolve(collection[0].types);
            });
        });

        return promise;
    }

    function remove(index) {
        let promise = new Promise(function(resolve, reject) {
            ConstructionType.findOne({}, function(err, collection) {
                if(err) {
                    return reject(err);
                }

                collection.types.splice(index, 1);
                collection.save();
                resolve(index);
            }) ;
        });

        return promise;
    }

    module.exports = {
        add: add,
        all: all,
        remove: remove
    };
}());