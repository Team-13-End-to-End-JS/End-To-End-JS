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
            phoneNumber: user.phoneNumber,
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

    function promoteUser(userId) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({_id: userId}, function(err, user) {
                if (err) {
                    return reject(err);
                }

                let roles = user.roles;

                if (roles.indexOf('regular') < 0) {
                    user.roles.push('regular');
                    user.save(function(dbErr) {
                        if(dbErr) {
                            return reject('An error occurred while updating the User entry');
                        } else {
                            resolve(user);
                        }
                    });
                } else if(roles.indexOf('admin') < 0) {
                    user.roles.push('admin');
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

    function demoteUser(userId) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({_id: userId}, function(err, user) {
                if (err) {
                    return reject(err);
                }

                let roles = user.roles;
                let highestRoleIndex = roles.indexOf('admin') > - 1 ? roles.indexOf('admin') : roles.indexOf('regular');

                if (highestRoleIndex > -1) {
                    user.roles.splice(highestRoleIndex, 1);
                    user.save(function(dbErr) {
                        if(dbErr) {
                            return reject(dbErr);
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

    function updateUser(user) {
        let promise = new Promise(function(resolve, rejeect) {
            User.findOne({username: user.username}, function(err, dbUser) {
                if (err) {
                    return reject(err);
                }

                dbUser.firstName = user.firstName;
                dbUser.lastName = user.lastName;
                dbUser.phoneNumber = user.phoneNumber;

                dbUser.save(function(dbErr) {
                    if(dbErr) {
                        console.log(dbErr);
                        return reject("An error occurred while updating the User entry");
                    } else {
                        resolve(dbUser);
                    }
                });
            });
        });

        return promise;
    }

    module.exports = {
        create: createUser,
        getAll: getAll,
        getUser: getUser,
        updateUser: updateUser,
        promote: promoteUser,
        demote: demoteUser
    };
}());