(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');
    let realEstates = require('./real-estates-controller');
    let locations = require('./locations-controller');
    let constructionTypes = require('./construction-type-controller');

    module.exports = {
        users: users,
        realEstates: realEstates,
        admin: admin,
        locations: locations,
        constructionTypes: constructionTypes
    }
}());