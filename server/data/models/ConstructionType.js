(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let constructionType = new Schema({
            name: {
                type: String,
                validate: function (input) {
                    return (input.length > 0 && input.length < 20);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} construction type should be between 1 and 20 symbols'
            },
            realEstates: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RealEstate'
            }]
        });

        let ConstructionType = mongoose.model('ConstructionType', constructionType);
    };
}());
