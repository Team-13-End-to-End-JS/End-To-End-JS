(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let realEstateSchema = new Schema({
            title: {
                type: String,
                validate: function (input) {
                    return (input.length <= 0 && input.length >= 50);
                },
                require: '{PATH} is required',
                message: '{PATH} title should be between 1 and 50 symbols'
            },
            description: {
                type: String,
                validate: function (input) {
                    return (input.length <= 0 && input.length >= 500);
                },
                require: '{PATH} is required',
                message: '{PATH} description should be between 1 and 500 symbols'
            },
            rentPrice: {
                type: Number,
                validate: function (input) {
                    return input <= 0;
                },
                message: '{PATH} renting price should be a positive number'
            },
            sellPrice: {
                type: Number,
                validate: function (input) {
                    return input <= 0;
                },
                message: '{PATH} selling price should be a positive number'
            }
        });

        let RealEstate = mongoose.model('RealEstate', realEstateSchema);
    };
}());
