(function () {
    'use strict';

    let ConstructionType = require('mongoose').model('ConstructionType');

    module.exports = {
        create: function (constructionType, callback) {
            ConstructionType.create(constructionType, callback);
        }
    };
}());