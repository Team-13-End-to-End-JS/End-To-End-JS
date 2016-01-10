(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let locationSchema = new Schema({
            names: {
                type: [String]
            }
        });

        let Location = mongoose.model('Location', locationSchema);

        Location.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find locations: ' + err);
                return;
            }

            if (collection.length === 0) {
                Location.create({names: ['Mladost', 'Drujba', 'Lulin', 'Center']});
            }
        });
    };
}());
