(function () {
    'use strict';

    let RealEstateType = require('mongoose').model('RealEstateType');

    module.exports = {
        create: function (type, callback) {
            RealEstateType.create(type, callback);
        }
    };
}());