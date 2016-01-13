(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');
    let realEstates = require('./real-estates-controller');
    let locations = require('./locations-controller');
    let constructionTypes = require('./construction-type-controller');
    let realEstateTypes = require('./real-estate-type-controller');
    let statistics = require('./statistics-controller');
    let pages = require('./pages-controller');

    module.exports = {
        users: users,
        realEstates: realEstates,
        statistics: statistics,
        admin: admin,
        locations: locations,
        constructionTypes: constructionTypes,
        realEstateTypes: realEstateTypes,
        pages: pages
    }
}());