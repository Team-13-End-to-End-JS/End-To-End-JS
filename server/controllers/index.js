(function() {
    'use strict';

    let users = require('./users-controller');
    let realEstates = require('./real-estates-controller');

    module.exports = {
        users: users,
        realEstates: realEstates
    };
}());