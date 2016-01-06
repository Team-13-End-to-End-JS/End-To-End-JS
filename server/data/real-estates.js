(function () {
    'use strict';

    let RealEstate = require('mongoose').model('RealEstate');

    module.exports = {
        create: function (realEstate, callback) {
            RealEstate.create(realEstate, callback);
        }
    };
}());