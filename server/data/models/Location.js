(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports.init = function() {
        let locationSchema = new Schema({
            name: {
                type: String,
                validate: function (input) {
                    return (input.length <= 0 && input.length >= 20);
                },
                require: '{PATH} is required',
                message: '{PATH} title should be between 1 and 20 symbols'
            }
        });

        let Location = mongoose.model('Location', locationSchema);
    };
}());
