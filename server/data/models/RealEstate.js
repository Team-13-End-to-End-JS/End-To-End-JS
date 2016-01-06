(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let realEstateSchema = new Schema({
            title: String,
            description: String,
            price: Number
        });

        let RealEstate = mongoose.model('RealEstate', realEstateSchema);
    };
}());
