(function() {
    'use strict';

    let data = require('../data/data');

    function getAboutUsPage(req, res) {
        data.aboutUsPage.getPage()
            .then(function(dbResult) {
                console.log(dbResult.content);
                res.render('pages/about', {data: dbResult.content});
            }, function(err) {
                res.status(403);
                console.log(err);
                res.end();
            });
    }

    module.exports = {
        getAboutUsPage: getAboutUsPage
    }
}());