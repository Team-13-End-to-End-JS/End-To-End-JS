(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let locationSchema = new Schema({
            name: {
                type: String,
                validate: function (input) {
                    return (input.length > 0 && input.length < 20);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} location should be between 1 and 20 symbols'
            },
            realEstates: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RealEstate'
            }]
        });

        let Location = mongoose.model('Location', locationSchema);

        Location.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find locations: ' + err);
                return;
            }

            if (collection.length === 0) {
                Location.create({name: 'Mladost'});
                Location.create({name: 'Centar'});
                Location.create({name: 'Lulin'});
                Location.create({name: 'Bankya'});
                Location.create({name: 'Lozenets'});
            }
        });
    };
}());
