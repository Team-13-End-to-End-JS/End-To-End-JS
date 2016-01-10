(function() {
    'use strict';

    let data = require('../data/data');

    module.exports = {
        getAll: function(req, res) {
            data.constructionTypes
                .getAll()
                .then(function(dbResponse) {
                    res.render('real-estates/construction-types');
                    res.json(dbResponse);
                }, function(err) {
                    res.json(err);
                });
        },
        create: function(req, res) {
            data.constructionTypes
                .create(req.body)
                .then(function(dbResponse) {
                    res.redirect('/constructions');
                }, function(err) {
                    res.session.error = "Cannot create contstuction type!";
                    res.render('real-estates/construction-types', {errors: 'Create Construction Type Failed'});
                });
        }
    }
}());