(function () {
    'use strict';

    let users = require('./users'),
        realEstates = require('./real-estates');

    module.exports = {
        users: users,
        realEstates: realEstates,
    };
}());