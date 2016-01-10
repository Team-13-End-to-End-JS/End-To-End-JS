(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let constructionTypesSchema = new Schema({
            types: {
                type: [String]
            }
        });

        let  ConstructionTypes = mongoose.model('ConstructionType', constructionTypesSchema);

        ConstructionTypes.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find locations: ' + err);
                return;
            }

            if (collection.length === 0) {
                ConstructionTypes.create({types: ['Brick', 'Panel', 'Other']});
            }
        });
    };
}());
