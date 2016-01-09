(function() {
    'use strict';

    let users = require('./users-controller');
    let admin = require('./admin-controller');

    module.exports = {
        users: users,
        admin: admin
    }
}());