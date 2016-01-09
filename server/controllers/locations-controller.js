(function() {
    'use strict';

    let data = require('../data/data');

    module.exports = {
        all: function(req, res) {
            data.locations
                .getAll()
                .then(function(dbResponse) {
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        }
    }
}());