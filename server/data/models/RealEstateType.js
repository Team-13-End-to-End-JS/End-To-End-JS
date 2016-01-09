(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let realEstateType = new Schema({
            name: {
                type: String,
                validate: function (input) {
                    return (input.length > 0 && input.length < 20);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} real estate type should be between 1 and 20 symbols'
            },
            realEstates: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RealEstate'
            }]
        });

        let RealEstateType = mongoose.model('RealEstateType', realEstateType);

        RealEstateType.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find real estate types: ' + err);
                return;
            }

            if (collection.length === 0) {
                RealEstateType.create({name: '2-rooms'});
                RealEstateType.create({name: '3-rooms'});
                RealEstateType.create({name: 'n-rooms'});
                RealEstateType.create({name: 'Office'});
                RealEstateType.create({name: 'House'});
            }
        });
    };
}());
