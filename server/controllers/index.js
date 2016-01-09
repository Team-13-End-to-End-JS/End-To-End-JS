(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');
    let realEstates = require('./real-estates-controller');

    module.exports = {
        users: users,
        realEstates: realEstates,
        admin: admin
    }
}());