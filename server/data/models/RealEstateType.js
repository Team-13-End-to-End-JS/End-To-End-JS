(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let realEstateTypeSchema = new Schema({
            types: {
                type: [String]
            }
        });

        let  RealEstateType = mongoose.model('RealEstateType', realEstateTypeSchema);

        RealEstateType.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find locations: ' + err);
                return;
            }


            if (collection.length === 0) {
                RealEstateType.create({types: ['2-rooms', '3-rooms', 'n-rooms', 'Office', 'House', 'Other']});
            }
        });
    };
}());
