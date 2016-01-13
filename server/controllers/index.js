(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');
    let realEstates = require('./real-estates-controller');
    let statistics = require('./statistics-controller');
    let pages = require('./pages-controller');

    module.exports = {
        users: users,
        realEstates: realEstates,
        statistics: statistics,
        admin: admin,
        pages: pages
    }
}());