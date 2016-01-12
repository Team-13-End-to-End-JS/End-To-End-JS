(function() {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('../../helpers/encryption');

    let Schema = mongoose.Schema;

    module.exports.init = function() {
        let userSchema = new Schema({
            username: {
                unique: true,
                type: String,
                validate: function (input) {
                    return /[0-9A-z]{6,}/.test(input);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} is not a valid username'
            },
            firstName: {
                type: String,
                validate: function (input) {
                    return /[A-z]/.test(input);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} your name contains illegal characters'
            },
            lastName: {
                type: String,
                validate: function (input) {
                    return /[A-z]/.test(input);
                },
                required: true,
                require: '{PATH} is required',
                message: '{PATH} your name contains illegal characters'
            },
            salt: String,
            hashPass: String,
            roles: [String],
            phoneNumber: {
                type: String,
                validate: function (input) {
                    return /[A-z\+0-9\-]{6,}/.test(input);
                },
                required: true
            },
            posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RealEstate' }]
        });

        userSchema.method({
            authenticate: function(password) {
                if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });

        let User = mongoose.model('User', userSchema);
    };
}());