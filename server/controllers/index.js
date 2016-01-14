(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');
    let realEstates = require('./real-estates-controller');
    let statistics = require('./statistics-controller');
    let pages = require('./pages-controller');

    module.exports = function(data) {
        return {
            users: users(data),
            realEstates: realEstates,
            statistics: statistics,
            admin: admin(data),
            pages: pages
        }
    }
}());