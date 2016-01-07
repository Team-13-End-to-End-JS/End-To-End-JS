(function () {
    'use strict';

    var RealEstateModel = require('../models/RealEstate'),
        UsersModel = require('../models/User'),
        LocationModel = require('../models/Location'),
        RealEstateTypeModel = require('../models/RealEstateType'),
        ConstructionTypeModel = require('../models/ConstructionType');

    module.exports.init = function () {
        // sort by appropriate order of invoke
        UsersModel.init();
        RealEstateModel.init();
        RealEstateTypeModel.init();
        LocationModel.init();
        ConstructionTypeModel.init();
    };
}());