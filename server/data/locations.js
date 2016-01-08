(function () {
    'use strict';

    let Location = require('mongoose').model('Location');

    module.exports = {
        create: function (location, callback) {
            Location.create(location, callback);
        }
    };
}());