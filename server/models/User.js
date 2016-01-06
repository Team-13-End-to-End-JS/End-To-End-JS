(function() {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('..');

    let Schema = mongoose.Schema;

    let userSchema = new Schema({
        username: {
            type: String,
            validate: function (input) {
                return /[0-9A-z]/.test(input);
            },
            require: '{PATH} is required',
            message: '{PATH} is not a valid username'
        },
        firstName: {
            type: String,
            validate: function (input) {
                return /[A-z]/.test(input);
            },
            require: '{PATH} is required',
            message: '{PATH} your name contains illegal characters'
        },
        lastName: {
            type: String,
            validate: function (input) {
                return /[A-z]/.test(input);
            },
            require: '{PATH} is required',
            message: '{PATH} your name contains illegal characters'
        },
        salt: String,
        hashPass: String,
        roles: [String],
        posts: [String] // post Ids
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
}());