(function () {
    'use strict';

    var RealEstateModel = require('../models/RealEstate'),
        UsersModel = require('../models/User');

    module.exports.init = function () {
        // order
        UsersModel.init();
        RealEstateModel.init();
    };
}());