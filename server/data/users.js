(function () {
    'use strict';

    let encryption = require('../helpers/encryption.js');
    let User = require('mongoose').model('User');

    function createUser(user) {
        let salt = encryption.generateSalt();
        let newUser = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            salt: salt,
            hashPass: encryption.generateHashedPassword(salt, user.password),
            roles: user.roles || ['regular']
        };

        let promise = new Promise(function(resolve, reject) {
            User.create(newUser, function(err, createdUser) {
                if (err) {
                    return reject(err);
                }

                resolve(createdUser);
            }) ;
        });

        return promise;
    }

    function getAll(options) {
        options = options || {};

        let promise = new Promise(function(resolve, reject) {
            User.find(options, function(err, users) {
                if (error) {
                    return reject(error);
                }

                resolve(users);
            });
        });

        return promise;
    }

    function promoteUser(userId, role) {

    }

    function demoteUser(userId, role) {

    }

    module.exports = {
        create: createUser,
        getAll: getAll,
        promote: promoteUser,
        demote: demoteUser
    };
}());