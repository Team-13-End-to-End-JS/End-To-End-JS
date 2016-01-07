(function () {
    'use strict';

    let users = require('./users'),
        realEstates = require('./real-estates'),
        locations = require('./locations');

    module.exports = {
        users: users,
        realEstates: realEstates,
        locations: locations
    };
}());