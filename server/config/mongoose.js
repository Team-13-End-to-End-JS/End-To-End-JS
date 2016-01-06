(function() {
    "use strict";

    let mongoose = require('mongoose');
    let fs = require('fs');

    var modelsPath = __dirname + '/../models';
    fs.readdirSync(modelsPath).forEach(function (file) {
        if (file.indexOf('.js') >= 0) {
            require(modelsPath + '/' + file);
        }
    });

    module.exports = function(config) {
        mongoose.connect(config.db);
        let db = mongoose.connection;

        db.once('open', function(err) {
            if (err) {
                console.log('Database could not be opened: ' + err);
                return;
            }

            console.log('Database up and running...')
        });

        db.on('error', function(err){
            console.log('Database error: ' + err);
        });

        // Call potential seed methods from model objects
    };
}());