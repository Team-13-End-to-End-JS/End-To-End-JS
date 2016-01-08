(function () {
    'use strict';

    let users = require('./users'),
        realEstates = require('./real-estates'),
        locations = require('./locations'),
        realEstateTypes = require('./real-estate-types'),
        constructionTypes = require('./construction-types');

    module.exports = {
        users: users,
        realEstates: realEstates,
        locations: locations,
        realEstateTypes: realEstateTypes,
        constructionTypes: constructionTypes
    };
}());