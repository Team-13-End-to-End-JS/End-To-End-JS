(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let realEstateSchema = new Schema({
            title: {
                type: String,
                validate: function (input) {
                    return (input.length >= 5 && input.length <= 50);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} title should be between 1 and 50 symbols'
            },
            description: {
                type: String,
                validate: function (input) {
                    return (input.length >= 5 && input.length <= 500);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} description should be between 1 and 500 symbols'
            },
            rentPrice: {
                type: Number,
                validate: function (input) {
                    return input > 0;
                },
                message: '{PATH} renting price should be a positive number'
            },
            salePrice: {
                type: Number,
                validate: function (input) {
                    return input > 0;
                },
                message: '{PATH} selling price should be a positive number'
            },
            quadrature: {
                type: Number,
                validate: function (input) {
                    return input > 0;
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} quadrature should be a positive number'
            },
            year: {
                type: Number,
                validate: function (input) {
                    return input > 1800 && input < 2500;
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} year should be between 188 and 2500'
            },
            location: {
                type: String,
                required: true
            },
            constructionType: {
                type: String,
                required: true
            },
            realEstateType: {
                type: String,
                required: true
            },
            isApproved: {
                type: Boolean,
                default: false
            },
            _user: { type: Schema.Types.ObjectId, ref: 'User' }
        });

        let RealEstate = mongoose.model('RealEstate', realEstateSchema);
    };
}());
