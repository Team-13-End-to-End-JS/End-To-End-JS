(function () {
    'use strict';

    var RealEstateModel = require('../models/RealEstate'),
        UsersModel = require('../models/User'),
        LocationModel = require('../models/Location');

    module.exports.init = function () {
        // sort by appropriate order of invoke
        LocationModel.init();
        RealEstateModel.init();
        UsersModel.init();
    };
}());