(function() {
    'use strict';
    var path = require('path');

    var rootPath = path.normalize(__dirname + '/../../');

    module.exports = {
        development: {
            rootPath: rootPath,
            db: 'mongodb://127.0.0.1/Imotikar',
            port: process.env.PORT || 6969
        },
        production: {
            rootPath: rootPath,
            port: process.env.PORT || 3030
        }
    }
}());