(function () {
    'use strict';

    let encryption = require('../helpers/encryption.js');
    let User = require('mongoose').model('User');

    const VALID_ROLES = ['admin', 'regular'];

    function createUser(user) {
        let salt = encryption.generateSalt();
        let newUser = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            salt: salt,
            hashPass: encryption.generateHashedPassword(salt, user.password),
            roles: user.roles || ['regular', 'admin']
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
                if (err) {
                    return reject(err);
                }

                resolve(users);
            });
        });

        return promise;
    }

    function promoteUser(userId, role) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({_id: userId}, function(err, user) {
                if (err) {
                    return reject(err);
                }

                if (VALID_ROLES.indexOf(role) > -1) {
                    user.roles.push(role);
                    user.save(function(dbErr) {
                        if(dbErr) {
                            return reject('An error occurred while updating the User entry');
                        } else {
                            resolve(user);
                        }
                    });
                } else {
                    return reject('User is not in the role provided');
                }
            });
        });

        return promise;
    }

    function demoteUser(userId, role) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({_id: userId}, function(err, user) {
                if (err) {
                    return reject(err);
                }

                let roleIndex = VALID_ROLES.indexOf(role);
                if (roleIndex > - 1 && user.roles.indexOf(role) > -1) {
                    user.roles.splice(roleIndex, 1);
                    user.save(function(dbErr) {
                        if(dbErr) {
                            return reject('An error occurred while updating the User entry');
                        } else {
                            resolve(user);
                        }
                    });
                } else {
                    return reject('User is not in the role provided');
                }
            });
        });

        return promise;
    }

    function getUser(username) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({username: username}, function(err, user) {
                if (err) {
                    return reject(err);
                }

                resolve(user);
            });
        });

        return promise;
    }

    module.exports = {
        create: createUser,
        getAll: getAll,
        getUser: getUser,
        promote: promoteUser,
        demote: demoteUser
    };
}());